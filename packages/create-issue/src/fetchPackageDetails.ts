import Octokit from "@octokit/rest";
import { lookupPackageDetails } from "./parser/package.json";
import { isPackageLock, lookupPackageLockDetails } from "./parser/package-lock.json";
import { PackageDetails } from "./parser/Details";

export type fetchPackageOptions = {
    token: string;
    owner: string;
    repo: string;
    packageName: string;
    packageFilePath: string;
};

const cacheMap = new Map<string, {
    html_url: string,
    content: object,
}>();

export type fetchPackageDetails = PackageDetails & {
    packageManifestUrl: string;
}

export async function fetchPackageDetails(options: fetchPackageOptions): Promise<fetchPackageDetails> {
    const { token } = options;
    const octokit = new Octokit({
        auth: token
    });
    const cacheKey = `${options.owner}.${options.repo}.${options.packageFilePath}`;
    const cachedValue = cacheMap.get(cacheKey);
    const pkg = cachedValue
        ? cachedValue
        : await octokit.repos
            .getContents({
                repo: options.repo,
                owner: options.owner,
                path: options.packageFilePath
            })
            .then(res => {
                if (res.data.type !== "file") {
                    throw new Error("This is not file:" + options.packageFilePath);
                }
                if (res.data.encoding === "base64") {
                    const content = JSON.parse(Buffer.from(res.data.content, "base64").toString());
                    cacheMap.set(cacheKey, {
                        html_url: res.data.html_url,
                        content
                    });
                    return {
                        html_url: res.data.html_url,
                        content
                    };
                }
                throw new Error("Unknown file type" + res.data.type + ":" + res.data.encoding);
            });
    if (isPackageLock(options.packageFilePath)) {
        return {
            ...lookupPackageLockDetails({
                packageName: options.packageName,
                packageFilePath: options.packageFilePath,
                pkg: pkg.content
            }),
            packageManifestUrl: pkg.html_url
        };
    } else {
        return {
            ...lookupPackageDetails({
                packageName: options.packageName,
                packageFilePath: options.packageFilePath,
                pkg: pkg.content
            }),
            packageManifestUrl: pkg.html_url
        };
    }
}
