import meow from "meow";
import { createIssueFromSarif } from "./index";
import fs from "fs";

export function run() {
    const cli = meow(
        `
    Usage
      $ npx @security-alert/sarif-to-issue <sarif-file-path>
 
    Inputs
      <sarif-file-path> Path to sarif file path
 
    Options
      --dryRun                      Dry-Run when it is enabled
      --token                       [Required] GitHub Token, or support environment variables - GITHUB_TOKEN=xxx
      --owner                       [Required] Github repository owner for creating issue. e.g.) "azu"
      --repo                        [Required] Github repository name for creating issue. e.g.) "security-alert"
      --title                       [Required] GitHub issue title. e.g.) "Security Notice"
      --assignees                   Assignee user name of the issue. names are separated by ,(comma)
      --labels                      Label names of the issue. labels are separated by ,(comma) 
      --sarifContentOwner           [Required] GitHub Owner name of sarif content result.  e.g. "owner"
      --sarifContentRepo            [Required] GitHub Repository name of sarif content result. e.g. "repo"
      --sarifContentBranch          [Required] GitHub Repository branch name of sarif content result. e.g. "master"
      --sarifContentSourceRoot      Base path to sarif scanned source. You can set CodeQL's sourceLocationPrefix as relative value if necessary
      
    Examples
      # Create an issue to azu/codeql-scan-example from "./test/fixtures/xss.sarif" file
      $ GITHUB_TOKEN=xxx npx @security-alert/sarif-to-issue --title "Example Issue" --owner azu --repo codeql-scan-example --sarifContentOwner azu --sarifContentRepo codeql-scan-example --sarifContentBranch master ./test/fixtures/xss.sarif
      # Create an issue to azu/example-repo with "security" labels
      $ GITHUB_TOKEN=xxx npx @security-alert/sarif-to-issue output.sarif --title "Example Issue" --owner azu --repo codeql-scan-example --sarifContentOwner azu --sarifContentRepo codeql-scan-example --sarifContentBranch master ./test/fixtures/xss.sarif  --labels "security" 

`,
        {
            flags: {
                dryRun: {
                    type: "boolean"
                },
                token: {
                    type: "string"
                },
                title: {
                    type: "string",
                    isRequired: true
                },
                owner: {
                    type: "string"
                },
                repo: {
                    type: "string",
                    isRequired: true
                },
                assignees: {
                    type: "string"
                },
                labels: {
                    type: "string"
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
    const arrayOption = (flags?: string): string[] => {
        if (!flags) {
            return [];
        }
        return flags.split(",").map((flag) => flag.trim());
    };
    const promises = cli.input.map((sarifFilePath) => {
        const content = fs.readFileSync(sarifFilePath, "utf-8");
        return createIssueFromSarif({
            token: token,
            dryRun: cli.flags.dryRun,
            issue: {
                title: cli.flags.title,
                owner: cli.flags.owner,
                repo: cli.flags.repo,
                labels: arrayOption(cli.flags.labels),
                assignees: arrayOption(cli.flags.assignees)
            },
            sarifContent: content,
            sarifContentOwner: cli.flags.sarifContentOwner,
            sarifContentBranch: cli.flags.sarifContentBranch,
            sarifContentRepo: cli.flags.sarifContentRepo,
            sarifContentSourceRoot: cli.flags.sarifContentSourceRoot
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
