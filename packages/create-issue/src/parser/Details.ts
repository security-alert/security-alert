export type DependenciesType = "dependencies" | "devDependencies" | "unknown";
export type PackageDetails = {
    name: string;
    version: string;
    packageFilePath: string;
    dependenciesType: DependenciesType;
}
