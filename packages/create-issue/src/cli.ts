import meow from "meow";
import { createFromURL } from "./index";

export function run() {
    const cli = meow(`
    Usage
      $ npx @security-alert/create-issue <github-security-alert-url>
 
    Inputs
      <github-security-alert-url> GitHub Security Alert URL(open|closed)
 
    Options
      --dryRun Dry-Run when it is enabled
      --token  GitHub Token, or support environment variables - GITHUB_TOKEN=xxx
      --assignees assignee user name. names are separated ,
      --labels    label name. labels are separated , 
      
    Examples
      $ GITHUB_TOKEN=xxx npx @security-alert/create-issue "https://github.com/azu/github-webhook-SecurityVulnerability-test/network/alert/package-lock.json/axios/open"
      $ GITHUB_TOKEN=xxx npx @security-alert/create-issue "https://github.com/azu/github-webhook-SecurityVulnerability-test/network/alert/package-lock.json/axios/open" --labels "security,package"

`, {
        flags: {
            dryRun: {
                type: "boolean"
            },
            token: {
                type: "string"
            },
            assignees: {
                type: "string"
            },
            labels: {
                type: "string"
            }
        },
        autoHelp: true,
        autoVersion: true
    });

    const token = process.env.GITHUB_TOKEN || cli.flags.token;
    if (!token) {
        cli.showHelp(1);
        return;
    }
    const arrayOption = (flags?: string): string[] => {
        if (!flags) {
            return [];
        }
        return flags.split(",").map(flag => flag.trim());
    };
    const promises = cli.input.map(url => {
        return createFromURL(url, {
            token: token,
            dryRun: cli.flags.dryRun,
            issue: {
                labels: arrayOption(cli.flags.labels),
                assignees: arrayOption(cli.flags.assignees)
            }
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
