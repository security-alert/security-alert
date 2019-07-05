import meow from "meow";
import { listSecurityAlerts } from "./list";

export async function run() {
    const cli = meow(`
    Usage
      $ list-security-alert-issue [option]
 
    Options
      --repo   Repository to get details for
               <owner>/<name>
      --token  GitHub Token, or support environment variables - GITHUB_TOKEN=xxx
      --format  json, text
  
    Examples
      $ GITHUB_TOKEN=xxx list-security-alert-issue --repo github/desktop
      $ GITHUB_TOKEN=xxx list-security-alert-issue --repo github/desktop --format json

`, {
        flags: {
            token: {
                type: "string"
            },
            repo: {
                type: "string"
            },
            format: {
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
    const [owner, repo] = cli.flags.repo.split("/");
    if (!owner) {
        throw new Error("owner is missing: --repo <owner>/<repo>");
    }
    if (!repo) {
        throw new Error("repo is missing: --repo <owner>/<repo>");
    }

    const format = cli.flags.format ? cli.flags.format : "text";
    const vulnerabilityAlerts = await listSecurityAlerts({
        owner,
        repo,
        token
    });
    if(format === "json"){
        return JSON.stringify(vulnerabilityAlerts);
    }else{
        return vulnerabilityAlerts.map(alert => {
            return `
- Title: ${alert.title} 
- PackageName: ${alert.packageName} 
- PackageUrl: ${alert.packageUrl} 
- PackageVersion: ${alert.packageVersion} 
- DependenciesType: ${alert.dependenciesType}
- PackageManifestUrl: ${alert.packageManifestUrl} 
- VulnerableVersionRange: ${alert.vulnerableVersionRange} 
- GitHubAlertUrl: ${alert.gitHubAlertUrl} 
`
        })
    }
}
