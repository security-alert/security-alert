import Octokit from "@octokit/rest";
import {isPackage, lookupPackageDetails} from "./parser/package.json";
import {isPackageLock, lookupPackageLockDetails} from "./parser/package-lock.json";
import {PackageDetails} from "./parser/Details";
import {isYarnLock, lookupYarnLockDetails} from "./parser/yarn-lock";

const lockfile = require("@yarnpkg/lockfile");

export type fetchPackageOptions = {
    token: string;
    owner: string;
    repo: string;
    packageName: string;
    packageFilePath: string;
};

const cacheMap = new Map<string, {
    html_url: string,
    content: string,
}>();

export type fetchPackageDetails = PackageDetails & {
    packageManifestUrl: string;
}

export async function fetchPackageDetails(options: fetchPackageOptions): Promise<fetchPackageDetails> {
    const {token} = options;
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
                    const content = Buffer.from(res.data.content, "base64").toString();
                    cacheMap.set(cacheKey, {
                        html_url: res.data.html_url,
                        content: content
                    });
                    return {
                        html_url: res.data.html_url,
                        content: content
                    };
                }
                throw new Error("Unknown file type" + res.data.type + ":" + res.data.encoding);
            });
    if (isPackageLock(options.packageFilePath)) {
        return {
            ...lookupPackageLockDetails({
                packageName: options.packageName,
                packageFilePath: options.packageFilePath,
                pkg: JSON.parse(pkg.content)
            }),
            packageManifestUrl: pkg.html_url
        };
    } else if (isPackage(options.packageFilePath)) {
        return {
            ...lookupPackageDetails({
                packageName: options.packageName,
                packageFilePath: options.packageFilePath,
                pkg: JSON.parse(pkg.content)
            }),
            packageManifestUrl: pkg.html_url
        };
    } else if (isYarnLock(options.packageFilePath)) {
        return {
            ...lookupYarnLockDetails({
                packageName: options.packageName,
                packageFilePath: options.packageFilePath,
                pkg: lockfile.parse(pkg.content)
            }),
            packageManifestUrl: pkg.html_url
        };
    }
    // unknown
    return Promise.resolve({
        name: options.packageName,
        version: "0.0.0",
        packageFilePath: options.packageFilePath,
        dependenciesType: "unknown",
        packageManifestUrl: pkg.html_url
    });
}
