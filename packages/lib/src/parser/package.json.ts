import { PackageJson } from "@npm/types";
import { DependenciesType, PackageDetails } from "./Details";

export function isPackage(packageFilePath: string) {
    return /pacakge.json$/.test(packageFilePath);
}

export function lookupPackageDetails({ packageName, packageFilePath, pkg }: {
    packageName: string,
    packageFilePath: string,
    pkg: PackageJson
}): PackageDetails {
    // TODO: https://github.com/npm/types/pull/2
    const dependencies = (pkg as any)["dependencies"] || {};
    const devDependencies = pkg["devDependencies"] || {};
    const target = ((): { dependenciesType: DependenciesType, version: string } => {
        if (dependencies.hasOwnProperty(packageName)) {
            return {
                dependenciesType: "dependencies",
                version: dependencies[packageName]
            };
        }
        if (devDependencies.hasOwnProperty(packageName)) {
            return {
                dependenciesType: "devDependencies",
                version: devDependencies[packageName]
            };
        }
        return {
            dependenciesType: "unknown",
            version: "0.0.0"
        };
    })();
    return {
        name: packageName,
        version: target.version,
        packageFilePath,
        dependenciesType: target.dependenciesType
    };
}
