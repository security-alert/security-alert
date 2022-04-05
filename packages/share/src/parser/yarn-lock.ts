import { PackageDetails } from "./Details";

export function isYarnLock(packageFilePath: string) {
    return /yarn.lock$/.test(packageFilePath);
}

export function lookupYarnLockDetails({
    packageName,
    packageFilePath,
    pkg
}: {
    packageName: string;
    packageFilePath: string;
    pkg: {
        type: string;
        object: { [index: string]: { version: string; resolve: string; integrity: string; dependencies: object } };
    };
}): PackageDetails {
    if (pkg.type !== "success") {
        return {
            name: packageName,
            packageFilePath,
            version: "0.0.0",
            dependenciesType: "unknown"
        };
    }
    const matchKey = Object.keys(pkg.object).find((key) => {
        const keyName = key.slice(0, key.lastIndexOf("@"));
        return keyName === packageName;
    });
    if (!matchKey) {
        return {
            name: packageName,
            packageFilePath,
            version: "0.0.0",
            dependenciesType: "unknown"
        };
    }
    const dep = pkg.object[matchKey];
    return {
        name: packageName,
        packageFilePath,
        version: dep.version,
        dependenciesType: "unknown"
    };
}
