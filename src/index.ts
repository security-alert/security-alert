// https://github.com/azu/github-webhook-SecurityVulnerability-test/network/alert/package-lock.json/axios/open
//
import { fetchVulnerabilityAlerts } from "./VulnerabilityAlerts";
import { createIssue } from "./issue";
import { fetchPackageDetails } from "./fetchPackageDetails";

export type CreatedOptions = {
    // issue
    issue: {
        assignees?: string[]
        labels?: string[]
    }
    token: string;
    dryRun?: boolean;
};

export async function createFromURL(url: string, options: CreatedOptions) {
    const dryRun = options.dryRun !== undefined ? options.dryRun : false;
    const assignees = options.issue.assignees ? options.issue.assignees : [];
    const labels = options.issue.labels ? options.issue.labels : [];
    const pattern = /^https:\/\/github.com\/(?<owner>[0-9a-zA-Z-_.]+)\/(?<repo>[0-9a-zA-Z-_.]+)\/network\/alert\/(?<filepath>.+)\/(?<pacakgeName>[0-9a-zA-Z-_.]+)\/(open|closed)/;
    const matchObj = pattern.exec(url);
    if (!matchObj || !matchObj.groups) {
        throw new Error("Should set security alert url.\n" +
            "\n" +
            "Example: https://github.com/owner/reponame/network/alert/package-lock.json/axios/open");
    }
    const owner: string = matchObj.groups.owner;
    const repo: string = matchObj.groups.repo;
    const filepath: string = matchObj.groups.filepath;
    const packageName: string = matchObj.groups.pacakgeName;
    const vulnerabilityAlerts = await fetchVulnerabilityAlerts({
        owner,
        repo,
        token: options.token
    });
    const targetAlert = vulnerabilityAlerts.find(alert => {
        return alert.vulnerableManifestPath === filepath && alert.securityVulnerability.package.name === packageName;
    });
    if (!targetAlert) {
        throw new Error("Not found security vulnerability for " + url);
    }
    const targetDetails = await fetchPackageDetails({
        owner: owner,
        repo: repo,
        token: options.token,
        packageName: targetAlert.securityVulnerability.package.name,
        packageFilePath: targetAlert.vulnerableManifestPath
    });
    const title = `Vulnerability found in ${targetAlert.securityVulnerability.package.name} ${targetAlert.securityVulnerability.vulnerableVersionRange}`;
    const body = `
## Vulnerability Information

- Package name:  [${targetAlert.securityVulnerability.package.name}](https://www.npmjs.com/package/${targetAlert.securityVulnerability.package.name})
- Package version: ${targetDetails.version}
- Package Manifest: ${targetDetails.packageManifestUrl}
- Dependencies type: ${targetDetails.dependenciesType}
- Vulnerable version: ${targetAlert.securityVulnerability.vulnerableVersionRange}
- Patched version: ${targetAlert.securityVulnerability.firstPatchedVersion ? targetAlert.securityVulnerability.firstPatchedVersion.identifier : "none"}
- GitHub Alert: <${url}>
${targetAlert.securityVulnerability.firstPatchedVersion ? `
## How to fix?

Upgrade ${targetAlert.securityVulnerability.package.name} to version ${targetAlert.securityVulnerability.firstPatchedVersion.identifier} or later. For example:

\`\`\`
"dependencies": {
  "${targetAlert.securityVulnerability.package.name}": ">=${targetAlert.securityVulnerability.firstPatchedVersion.identifier}"
}
\`\`\`

or…

\`\`\`
"devDependencies": {
  "${targetAlert.securityVulnerability.package.name}": ">=${targetAlert.securityVulnerability.firstPatchedVersion.identifier}"
}
\`\`\`

` : ""}
## Details

${
        targetAlert.securityAdvisory.references.map(reference => {
                return `- <${reference.url}>`;
            }
        ).join("\n")
        }`;
    if (dryRun) {
        console.log(`Create Issue
owner: ${owner}
repo: ${repo}
labels: ${labels.length > 0 ? labels.join(",") : ""}
assignees: ${assignees.length > 0 ? assignees.join(",") : ""}
repo: ${repo}
title: ${title}
body: ${body}
`);
        return;
    } else {
        return createIssue({
            owner,
            repo,
            title,
            body,
            token: options.token,
            assignees,
            labels
        });
    }
}
