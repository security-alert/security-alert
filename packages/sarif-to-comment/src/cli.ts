import meow from "meow";
import { postComment } from "./index";
import * as fs from "fs";

export function run() {
    const cli = meow(`
    Usage
      $ npx @security-alert/sarif-to-comment <sarif-file-path>
 
    Inputs
      <sarif-file-path> Path to sarif file path
 
    Options
      --dryRun                      Dry-Run when it is enabled
      --token                       GitHub Token, or support environment variables - GITHUB_TOKEN=xxx
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

`, {
        flags: {
            dryRun: {
                type: "boolean"
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
                type: "string",
            },
        },
        autoHelp: true,
        autoVersion: true
    });

    const token = process.env.GITHUB_TOKEN || cli.flags.token;
    if (!token) {
        cli.showHelp(1);
        return;
    }
    const promises = cli.input.map(sarifFilePath => {
        const content = fs.readFileSync(sarifFilePath, "utf-8");
        return postComment({
            token: token,
            dryRun: cli.flags.dryRun,
            postingURL: cli.flags.commentUrl,
            sarifContent: content,
            sarifContentOwner: cli.flags.sarifContentOwner,
            sarifContentBranch: cli.flags.sarifContentBranch,
            sarifContentRepo: cli.flags.sarifContentRepo,
            sarifContentSourceRoot: cli.flags.sarifContentSourceRoot
        }).then(result => {
            if (!result) {
                return "";
            }
            return result.html_url;
        });
    });
    return Promise.all(promises).then(issuesURL => {
        return issuesURL.join("\n");
    });
}
