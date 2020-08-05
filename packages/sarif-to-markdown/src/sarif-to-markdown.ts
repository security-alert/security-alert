import type { Log, Result } from "sarif";
// @ts-ignore
import escape from 'markdown-escape'
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
    return result.locations?.flatMap(location => {
        if (!location.physicalLocation) {
            return [];
        }
        const physicalLocation = location.physicalLocation
        if (!physicalLocation.artifactLocation) {
            return [];
        }
        if (!physicalLocation.region) {
            return [];
        }
        const lineNumber = physicalLocation.region.endLine !== undefined ? `L${physicalLocation.region.startLine}-${physicalLocation.region.endLine}` : `L${physicalLocation.region.startLine}`;
        return urlJoin(githubHost, options.owner, options.repo, `blob/${options.branch}`, options.sourceRoot, `${physicalLocation.artifactLocation.uri}#${lineNumber}`);
    });

}


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

}
type sarifToMarkdownResult = {
    title?: string;
    body: string;
    /**
     * If the body has not results, `hasMessages` will be `false`
     */
    hasMessages: boolean
};
export const sarifToMarkdown = (options: sarifFormatterOptions): (sarifLog: Log) => sarifToMarkdownResult[] => {
    return (sarifLog: Log) => {
        return sarifLog.runs.map(run => {
            const title = options.title ? `# ${options.title}\n` : "";

            // # tool section
            // Rule info
            // Vulnerability info
            // ## Results
            // Result(s)
            /**
             * # Rule Info
             */
            const ruleInfo = escapeMarkdown`\
## Rules
<!-- Rule Info -->
${run.tool.driver?.rules?.map(rule => {
                    const severity = rule.properties ? rule.properties?.["problem.severity"] : ""
                    // rule description
                    return `**${rule.id}** (severity: **${severity}**)

> ${rule.shortDescription?.text}`
                }
            )}
 `;
            const ruleDetails = `<details><summary>Details</summary>
<pre>${JSON.stringify(run.tool, null, 4)}</pre></details>`;
            /* Results
            - rule id
            - message
            - vulnerability source location

            If pass the scan, results is empty array
            */
            const results = run.results && run.results.length > 0 ? `
## Results

${run.results?.map(result => {
                    return `- **${result.ruleId}**: ${escape(result.message.text)}`
                        + "\n\n"
                        + createCodeURL(result, options).join("\n")
                        + "\n"
                }).join("\n")}
`
                : `
## Results

No Error

`
            return {
                body: title + ruleInfo + "\n" + ruleDetails + "\n" + results,
                hasMessages: run.results?.length !== 0
            };
        });
    }

}
