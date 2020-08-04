import type { Log } from "sarif";
// @ts-ignore
import escape from 'markdown-escape'
import { Result } from "sarif";
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
        return urlJoin(githubHost, options.owner, options.repo, `tree/${options.branch}`, options.sourceRoot, `${physicalLocation.artifactLocation.uri}#${lineNumber}`);
    });

}


export type sarifFormatterResult = {
    title: string;
    body: string;
}
export type sarifFormatterOptions = {
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
export const sarifToMarkdown = (options: sarifFormatterOptions): (sarifLog: Log) => { title: string; body: string }[] => {
    return (sarifLog: Log) => {
        return sarifLog.runs.map(run => {
            // # tool section
            // Rule info
            // Vulnerability info
            // ## Results
            // Result(s)
            /**
             * # Rule Info
             */
            const ruleInfo = escapeMarkdown`\
# ${run.tool.driver.name}
<!-- Rule Info -->
${run.tool.driver?.rules?.map(rule => {
                    // rule description
                    return `**${rule.id}**

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
            */
            const results = `
## Results

${run.results?.map(result => {
                return `- **${result.ruleId}**: ${escape(result.message.text)}`
                    + "\n\n"
                    + createCodeURL(result, options).join("\n")
                    + "\n"
            }).join("\n")}
`
            return {
                title: run.tool.driver.name,
                body: ruleInfo + "\n" + ruleDetails + "\n" + results
            };
        });
    }

}
