import meow from "meow";
import { postComment } from "./index";
import * as fs from "fs";
const ALLOWED_SEVERITIES = ["warning", "error", "note", "none"] as const;
const ALLOWED_SEVERITIES_FAILURE = ["warning", "error", "note", "none", "all"] as const;

export function run() {
    const cli = meow(
        `
    Usage
      $ npx @security-alert/sarif-to-comment <sarif-file-path>
 
    Inputs
      <sarif-file-path> Path to sarif file path
 
    Options
      --dryRun                      Dry-Run when it is enabled
      --token                       GitHub Token, or support environment variables - GITHUB_TOKEN=xxx
      --action                      Authentication mode for the token, defaults to PAT, if set, switches to Github Action
      --ruleDetails                 Include rule details in the markdown, might be too big for Github's API, defaults to false
      --simple                      Simplify the output to only give findings grouped by rule, adds helpURI if present
      --severity                    Filter issues by their severity level, warning, error, note, none, set flag for each level      
      --failon                     Throw an exit error code 1 if an issue with that level was detected, warning, error, note, none, or all, set flag for each
      --title                       Specify a comment title for the report, optional
      --no-suppressedResults        Don't include suppressed results, that are in SARIF suppressions
      --commentUrl                  Post to comment URL. e.g. https://github.com/owner/repo/issues/85
      --sarifContentOwner           GitHub Owner name of sarif content result.  e.g. "owner"
      --sarifContentRepo            GitHub Repository name of sarif content result. e.g. "repo"
      --sarifContentBranch          GitHub Repository branch name of sarif content result. e.g. "master"
      --sarifContentSourceRoot      Base path to sarif scanned source. You can set CodeQL's sourceLocationPrefix as relative value if necessary
  
    Examples
      # DryRun and preview it!
      $ GITHUB_TOKEN=xxx npx @security-alert/sarif-to-comment --commentUrl "https://github.com/owner/repo/issues/1" --sarifContentOwner "owner" --sarifContentRepo "repo" --sarifContentBranch "master" "./codeql_result.sarif"
      # Post It
      $ GITHUB_TOKEN=xxx npx @security-alert/sarif-to-comment --commentUrl "https://github.com/owner/repo/issues/1" --sarifContentOwner "owner" --sarifContentRepo "repo" --sarifContentBranch "master" "./codeql_result.sarif"
      # Set base path
      $ GITHUB_TOKEN=xxx npx @security-alert/sarif-to-comment --commentUrl "https://github.com/owner/another/issues/1" --sarifContentOwner "owner" --sarifContentRepo "repo" --sarifContentBranch "develop" --sarifContentSourceRoot "./basepath" "./codeql_result.sarif"
      # use HEAD sha for link
      $ GITHUB_TOKEN=xxx npx @security-alert/sarif-to-comment --commentUrl "https://github.com/owner/another/issues/1" --sarifContentOwner "owner" --sarifContentRepo "repo" ---sarifContentBranch \`git rev-parse HEAD\` "./codeql_result.sarif"

`,
        {
            flags: {
                action: {
                    type: "boolean",
                    default: false
                },
                ruleDetails: {
                    type: "boolean",
                    default: false
                },
                simple: {
                    type: "boolean",
                    default: false
                },
                severity: {
                    type: "string",
                    isMultiple: true
                },
                failon: {
                    type: "string",
                    isMultiple: true
                },
                title: {
                    type: "string"
                },
                dryRun: {
                    type: "boolean"
                },
                suppressedResults: {
                    type: "boolean",
                    default: true
                },
                token: {
                    type: "string"
                },
                commentUrl: {
                    type: "string",
                    isRequired: true
                },
                sarifContentOwner: {
                    type: "string",
                    isRequired: true
                },
                sarifContentRepo: {
                    type: "string",
                    isRequired: true
                },
                sarifContentBranch: {
                    type: "string",
                    isRequired: true
                },
                sarifContentSourceRoot: {
                    type: "string"
                }
            },
            autoHelp: true,
            autoVersion: true
        }
    );

    const token = process.env.GITHUB_TOKEN || cli.flags.token;
    if (!token) {
        cli.showHelp(1);
        return;
    }
    if (cli.flags.severity) {
        const unknownSeverities = cli.flags.severity.filter((s: any) => {
            return !ALLOWED_SEVERITIES.includes(s);
        });
        if (unknownSeverities.length > 0) {
            console.log(`unrecognized severity defined: ${unknownSeverities.join(",")}
        Allowed values are: ${ALLOWED_SEVERITIES.join(",")}`);
            cli.showHelp(1);
        }
    }
    if (cli.flags.failon) {
        const unknownSeverities = cli.flags.failon.filter((s: any) => {
            return !ALLOWED_SEVERITIES_FAILURE.includes(s);
        });
        if (unknownSeverities.length > 0) {
            console.log(`unrecognized severity defined: ${unknownSeverities.join(",")}
        Allowed values are: ${ALLOWED_SEVERITIES_FAILURE.join(",")}`);
            cli.showHelp(1);
        }
    }
    const promises = cli.input.map(async (sarifFilePath) => {
        const content = fs.readFileSync(sarifFilePath, "utf-8");
        return await postComment({
            token: token,
            dryRun: cli.flags.dryRun,
            postingURL: cli.flags.commentUrl,
            sarifContent: content,
            sarifContentOwner: cli.flags.sarifContentOwner,
            sarifContentBranch: cli.flags.sarifContentBranch,
            sarifContentRepo: cli.flags.sarifContentRepo,
            sarifContentSourceRoot: cli.flags.sarifContentSourceRoot,
            ghActionAuthenticationMode: cli.flags.action,
            ruleDetails: cli.flags.ruleDetails,
            simple: cli.flags.simple,
            severity: cli.flags.severity?.length != 0 ? cli.flags.severity : ALLOWED_SEVERITIES,
            failon: cli.flags.failon?.length != 0 ? cli.flags.failon : false,
            suppressedResults: cli.flags.suppressedResults,
            title: cli.flags.title
        }).then((result) => {
            if (!result) {
                return "";
            }
            return result;
        });
    });
    return Promise.all(promises).then((commentsResults: any) => {
        const postedURLS = commentsResults
            .filter((c: any) => c.posted === true)
            .map((c: any) => {
                if (c.posted) return c.commentUrl;
            });
        const emptyURLReasons = commentsResults
            .filter((c: any) => c.posted === false)
            .map((c: any) => {
                if (c.posted === false) return c.reason;
            });
        if (emptyURLReasons.length > 0) {
            console.log("Some comments were not posted, reasons will be included");
        }
        const shouldFailResults = commentsResults.reduce((acc: boolean, result: any) => {
            return result.shouldFail || acc; // always returns true if there is one of the map values is true
        }, false);

        if (shouldFailResults) {
            console.log(
                postedURLS.concat(emptyURLReasons).join("\n") +
                    "\nFailing ! An issue with severity " +
                    cli.flags.failon +
                    " was found."
            );
            process.exit(1);
        }
        return postedURLS.concat(emptyURLReasons).join("\n");
    });
}
