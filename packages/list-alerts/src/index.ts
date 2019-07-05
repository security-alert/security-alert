import {fetchPackageDetails, fetchVulnerabilityAlerts} from "@security-alert/share";

export type listSecurityAlertsOptions = {
    token: string;
    owner: string;
    repo: string;
};

export type listSecurityAlertsResult = {
    title: string;
    packageName: string;
    packageUrl: string;
    packageVersion: string;
    dependenciesType: string;
    vulnerableVersionRange: string;
    gitHubAlertUrl: string;
}

/**
 * listing security alerts with details
 * @param options
 */
export async function listSecurityAlerts(options: listSecurityAlertsOptions) {
    const vulnerabilityAlerts = await fetchVulnerabilityAlerts({
        owner: options.owner,
        repo: options.repo,
        token: options.token
    });
    const promises = vulnerabilityAlerts.map(async alert => {
        const detail = await fetchPackageDetails({
            owner: options.owner,
            repo: options.repo,
            token: options.token,
            packageName: alert.securityVulnerability.package.name,
            packageFilePath: alert.vulnerableManifestPath
        });
        return {
            title: alert.securityVulnerability.package.name,
            packageName: alert.securityVulnerability.package.name,
            packageUrl: `https://www.npmjs.com/package/${alert.securityVulnerability.package.name}`,
            packageVersion: detail.version,
            dependenciesType: detail.dependenciesType,
            packageManifestUrl: detail.packageManifestUrl,
            vulnerableVersionRange: alert.securityVulnerability.vulnerableVersionRange,
            gitHubAlertUrl: `https://github.com/${options.owner}/${options.repo}/network/alert/${alert.vulnerableManifestPath}/${alert.securityVulnerability.package.name}/open`
        };
    });
    return Promise.all(promises);
}

