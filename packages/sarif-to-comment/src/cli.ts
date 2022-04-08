import meow from "meow";
import { postComment } from "./index";
import * as fs from "fs";

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
    const promises = cli.input.map((sarifFilePath) => {
        const content = fs.readFileSync(sarifFilePath, "utf-8");
        return postComment({
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
            suppressedResults: cli.flags.suppressedResults
        }).then((result) => {
            if (!result) {
                return "";
            }
            return result.html_url;
        });
    });
    return Promise.all(promises).then((issuesURL) => {
        return issuesURL.join("\n");
    });
}
