import meow from "meow";
import { createFromURL } from "./index";

export function run() {
    const cli = meow(`
    Usage
      $ create-security-alert-issue <github-security-alert-url>
 
    Inputs
      <github-security-alert-url> GitHub Security Alert URL(open|closed)
 
    Options
      --dryRun Dry-Run when it is enabled
      --token  GitHub Token, or support enviroment variables - GITHUB_TOKEN=xxx
 
    Examples
      $ GITHUB_TOKEN=xxx create-security-alert-issue "https://github.com/azu/github-webhook-SecurityVulnerability-test/network/alert/package-lock.json/axios/open"
`, {
        flags: {
            dryRune: {
                type: "boolean"
            }
        },
        autoHelp: true,
        autoVersion: true
    });

    const token = process.env.GH_TOKEN || cli.flags.token;
    if (!token) {
        cli.showHelp(1);
        return;
    }
    const promises = cli.input.map(url => {
        return createFromURL(url, {
            token: token,
            dryRun: true
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
