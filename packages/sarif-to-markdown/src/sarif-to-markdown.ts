import type { Log, Result, Run, ReportingDescriptor } from "sarif";
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

function createRuleInfo(run: Run) {
    return escapeMarkdown`
## Rules information
<!-- Rule Info -->
<details><summary>Rules details</summary>
${run.tool.driver?.rules?.map((rule: any) => {
    const severity = rule.properties ? rule.properties?.["problem.severity"] : "";
    // rule description
    return `\n
    - ${rule.id} [${severity}] \n
    > ${rule.shortDescription?.text}\n`;
})}`;
}

function createToolInfo(run: Run) {
    return `
## Tool information
- Name: ${run.tool.driver?.name}
- Organization: ${run.tool.driver?.organization}
- Version: ${run.tool.driver?.semanticVersion}
`;
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
    /**
     * Should the markdown include suppressed findings, defaults to true
     */
    suppressedResults?: boolean;
    /**
     * Should the markdown include rule details or tool details at all
     */
    simple?: boolean;
    /**
     * Which severities should be included ?
     */
    severities?: readonly string[];
};

function groupBy(arr: Result[], criteria: any) {
    const newObj = arr.reduce(function (acc: any, currentValue: any) {
        if (!acc[currentValue[criteria]]) {
            acc[currentValue[criteria]] = [];
        }
        acc[currentValue[criteria]].push(currentValue);
        return acc;
    }, {});
    return newObj;
}

function createGroupedResultsMarkdown(groupedResults: any, run: any, options: sarifFormatterOptions) {
    let groupedResultsMarkdown = "";
    for (const rule in groupedResults) {
        const ruleMatch = run.tool.driver.rules.filter((r: any) => {
            return r.id == rule;
        });
        const severityLevel = ruleMatch[0].defaultConfiguration?.level?.toUpperCase() ?? "";
        const helpUri = ruleMatch[0].helpUri !== undefined ? "[[HELP LINK](" + ruleMatch[0].helpUri + ")]" ?? "" : "";
        groupedResultsMarkdown +=
            `- **${"[" + severityLevel + "]** **[" + rule + "]** " + helpUri} \`${
                groupedResults[rule][0] ? escape(groupedResults[rule][0].message.text) : ""
            }\`` + "\n";
        for (const result of groupedResults[rule]) {
            const properResult = result as unknown as Result;
            if (properResult.suppressions === undefined) {
                groupedResultsMarkdown += "    - " + createCodeURL(result, options) + "\n";
            }
        }
    }
    return groupedResultsMarkdown;
}

function createGroupedSuppressedResultsMarkdown(groupedResults: any, run: any, options: sarifFormatterOptions) {
    let groupedSuppressedResultsMD = "";
    let suppressedCounter = 0;
    for (const rule in groupedResults) {
        const groupContainsSuppressed =
            groupedResults[rule].filter((r: Result) => r.suppressions !== undefined).length > 0;
        if (groupContainsSuppressed) {
            const ruleMatch = run.tool.driver.rules.filter((r: any) => {
                return r.id == rule;
            });
            const helpUri =
                ruleMatch[0].helpUri !== undefined ? "[[HELP LINK](" + ruleMatch[0].helpUri + ")]" ?? "" : "";
            const severityLevel = ruleMatch[0].defaultConfiguration?.level?.toUpperCase() ?? "";

            groupedSuppressedResultsMD +=
                `- **${"[" + severityLevel + "]** **[" + rule + "]** " + helpUri} \`${
                    groupedResults[rule][0] ? escape(groupedResults[rule][0].message.text) : ""
                }\`` + "\n";
            for (const result of groupedResults[rule]) {
                const properResult = result as unknown as Result;
                if (properResult.suppressions !== undefined) {
                    suppressedCounter += 1;
                    groupedSuppressedResultsMD += "    - " + createCodeURL(result, options) + "\n";
                }
            }
        }
    }
    return { groupedSuppressedResultsMD, suppressedCounter };
}

function filterGroupedResultsBySeverity(groupedResults: any, severities: readonly string[], run: Run) {
    // 1st step, go through run and find rule severities
    // 2nd step, filter groupedResults and remove rulegroups that don't match the severities filter
    const ruleSeverityMapping = new Map<string, string>();
    run.tool.driver?.rules?.forEach((rule: ReportingDescriptor) => {
        const severity = rule.defaultConfiguration?.level ?? "";
        ruleSeverityMapping.set(rule.id, severity);
    });

    const filteredResults = Object.keys(groupedResults)
        .filter((rule: any) => {
            return severities.includes(ruleSeverityMapping.get(rule) ?? "unknownseverity");
        })
        .reduce((obj: any, key: any) => {
            obj[key] = groupedResults[key];
            return obj;
        }, {});
    return filteredResults;
}

type sarifToMarkdownResult = {
    title?: string;
    body: string;
    /**
     * If the body has not results, `hasMessages` will be `false`
     */
    hasMessages: boolean;
};

export const sarifToMarkdown = (options: sarifFormatterOptions): ((sarifLog: Log) => sarifToMarkdownResult[]) => {
    const suppressedResultsFlag = options.suppressedResults !== undefined ? options.suppressedResults : true;
    const simpleMode = options.simple !== undefined ? options.simple : false;
    const severities = options.severities ?? ["warning", "error", "note", "none"];

    return (sarifLog: Log) => {
        return sarifLog.runs.map((run: any) => {
            const title = options.title ? `# ${options.title}\n` : "# Report";
            const toolInfo = simpleMode ? "" : createToolInfo(run);
            const ruleInfo = simpleMode ? "" : createRuleInfo(run);
            const ruleDetails = `<details><summary>Details</summary>
<pre>${JSON.stringify(run.tool, null, 4)}</pre></details>
`;
            const groupedResults = groupBy(run.results, "ruleId");
            const filteredResults = filterGroupedResultsBySeverity(groupedResults, severities, run);
            const groupedResultsMarkdown = createGroupedResultsMarkdown(filteredResults, run, options);

            /* Results
            - rule id
            - message
            - vulnerability source location

            If pass the scan, results is empty array
            */
            const results =
                run.results && run.results.length > 0 && Object.keys(filteredResults).length > 0
                    ? `
## Results

${groupedResultsMarkdown}
`
                    : `
## Results

Nothing here.

`;

            const { groupedSuppressedResultsMD, suppressedCounter } = createGroupedSuppressedResultsMarkdown(
                filteredResults,
                run,
                options
            );

            // careful, double ternary... first check if we should include suppressedresults (return empty string)
            // then check if there are results, if none, return default string
            const suppressedResultsText = suppressedResultsFlag
                ? run.results && suppressedCounter > 0
                    ? `
## Suppressed results

${groupedSuppressedResultsMD}
`
                    : `
## Suppressed Results

Nothing here.

`
                : "";
            if (options.details) {
                return {
                    body:
                        title +
                        results +
                        "\n" +
                        suppressedResultsText +
                        "\n" +
                        ruleInfo +
                        "\n" +
                        ruleDetails +
                        toolInfo,
                    hasMessages: run.results?.length !== 0 && Object.keys(filteredResults).length !== 0
                };
            }
            return {
                body: title + results + "\n" + suppressedResultsText + "\n" + ruleInfo + "\n" + toolInfo,
                hasMessages: run.results?.length !== 0 && Object.keys(filteredResults).length !== 0
            };
        });
    };
};
