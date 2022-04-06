import type { Log, Result } from "sarif";
// @ts-ignore
import escape from "markdown-escape";
import urlJoin from "url-join";

function escapeMarkdown(strings: TemplateStringsArray, ...values: any[]) {
    return strings.reduce((result, str, i) => {
        const value = values[i - 1];
        if (typeof value === "string") {
            return result + escape(value) + str;
        } else {
            return result + String(value) + str;
        }
    });
}

const createCodeURL = (result: Result, options: sarifFormatterOptions): string[] => {
    const githubHost = options.githubHost ?? "https://github.com";
    if (!Array.isArray(result.locations)) {
        return [];
    }
    return result.locations?.flatMap((location: any) => {
        if (!location.physicalLocation) {
            return [];
        }
        const physicalLocation = location.physicalLocation;
        if (!physicalLocation.artifactLocation) {
            return [];
        }
        if (!physicalLocation.region) {
            return [];
        }
        const lineNumber =
            physicalLocation.region.endLine !== undefined
                ? `L${physicalLocation.region.startLine}-${physicalLocation.region.endLine}`
                : `L${physicalLocation.region.startLine}`;
        return urlJoin(
            githubHost,
            options.owner,
            options.repo,
            `blob/${options.branch}`,
            options.sourceRoot,
            `${physicalLocation.artifactLocation.uri}#${lineNumber}`
        );
    });
};

export type sarifFormatterOptions = {
    /**
     * Title of content
     */
    title?: string;
    /**
     * https://github.com
     */
    githubHost?: string;
    /**
     * GitHub Owner
     */
    owner: string;
    /**
     * GitHub Repo
     */
    repo: string;
    /**
     * Branch name:
     * e.g.) dev
     */
    branch: string;
    /**
     * Base path
     */
    sourceRoot: string;
    /**
     * Details of the rules in the comment or not, this might make the comment too big for Github
     */
    details?: boolean;
};
type sarifToMarkdownResult = {
    title?: string;
    body: string;
    /**
     * If the body has not results, `hasMessages` will be `false`
     */
    hasMessages: boolean;
};
export const sarifToMarkdown = (options: sarifFormatterOptions): ((sarifLog: Log) => sarifToMarkdownResult[]) => {
    return (sarifLog: Log) => {
        return sarifLog.runs.map((run: any) => {
            const title = options.title ? `# ${options.title}\n` : "# Report";

            const toolInfo = `
## Tool information
- Name: ${run.tool.driver?.name}
- Organization: ${run.tool.driver?.organization}
- Version: ${run.tool.driver?.semanticVersion}
`;
            // # tool section
            // Rule info
            // Vulnerability info
            // ## Results
            // Result(s)
            /**
             * # Rule Info
             */
            const ruleInfo = escapeMarkdown`
## Rules information
<!-- Rule Info -->
<details><summary>Rules details</summary>

${run.tool.driver?.rules?.map((rule: any) => {
    const severity = rule.properties ? rule.properties?.["problem.severity"] : "";
    // rule description
    return `- ${rule.id} [${severity}]

> ${rule.shortDescription?.text}`;
})}
 `;
            const ruleDetails = `<details><summary>Details</summary>
<pre>${JSON.stringify(run.tool, null, 4)}</pre></details>
`;

            /* Results
            - rule id
            - message
            - vulnerability source location

            If pass the scan, results is empty array
            */
            const results =
                run.results && run.results.length > 0
                    ? `
## Results

${run.results
    ?.map((result: any) => {
        return result.suppressions
            ? ""
            : `- **${result.ruleId}**: ${escape(result.message.text)}` +
                  "\n\n" +
                  createCodeURL(result, options).join("\n") +
                  "\n";
    })
    .join("\n")}
`
                    : `
## Results

No Error

`;

            const suppressedResults =
                run.results && run.results.length > 0
                    ? `
## Suppressed results

${run.results
    ?.map((result: any) => {
        return result.suppressions
            ? `- **${result.ruleId}**: ${escape(result.message.text)}` +
                  "\n\n" +
                  createCodeURL(result, options).join("\n") +
                  "\n"
            : "";
    })
    .join("\n")}
`
                    : `
## Results

No Error

`;
            console.log("ARE DETAILS INCLUDED ?");
            console.log(options.details);
            if (options.details) {
                return {
                    body: title + results + "\n" + suppressedResults + "\n" + ruleInfo + "\n" + ruleDetails + toolInfo,
                    hasMessages: run.results?.length !== 0
                };
            }
            return {
                body: title + results + "\n" + suppressedResults + "\n" + ruleInfo + "\n" + toolInfo,
                hasMessages: run.results?.length !== 0
            };
        });
    };
};
