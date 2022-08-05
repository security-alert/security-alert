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
                ? `L${physicalLocation.region.startLine}-L${physicalLocation.region.endLine}`
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
    /**
     * Which severities should throw an error ?
     */
    failOn?: any;
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

// same as filterGroupedResultsBySeverity
function detectFailure(arr: Result[], failOn: readonly string[], run: Run) {
    // 1st step, go through run and find rule severities
    // 2nd step, filter groupedResults and remove rulegroups that don't match the severities filter
    const ruleSeverityMapping = new Map<string, string>();
    run.tool.driver?.rules?.forEach((rule: ReportingDescriptor) => {
        const severity = getRuleSeverity(rule);
        ruleSeverityMapping.set(rule.id, severity);
    });

    // if one of the results uses a rule that has a severity that we should fail on, return true
    return arr.reduce((acc: boolean, r: Result) => {
        const sevrule = ruleSeverityMapping.get(r.ruleId ?? "") ?? "";
        return failOn.includes(sevrule) || acc; // always returns true if there is one of the map values is true
    }, false);
}

function createGroupedResultsMarkdown(groupedResults: any, run: any, options: sarifFormatterOptions) {
    let markdown = "";
    for (const ruleId in groupedResults) {
        const rule = getRuleByRuleId(ruleId, run);
        if (rule) {
            markdown += createRuleMarkdown(rule, groupedResults[ruleId], options, false);
        }
    }
    return markdown;
}

function createGroupedSuppressedResultsMarkdown(groupedResults: any, run: any, options: sarifFormatterOptions) {
    let markdown = "";
    for (const ruleId in groupedResults) {
        const rule = getRuleByRuleId(ruleId, run);
        if (rule) {
            const results = groupedResults[ruleId];
            const containsSupressed = results.filter((r: Result) => r.suppressions !== undefined).length > 0;
            if (containsSupressed) {
                markdown += createRuleMarkdown(rule, groupedResults[ruleId], options, true);
            }
        }
    }
    return markdown;
}

function createRuleMarkdown(
    rule: ReportingDescriptor,
    results: Result[],
    options: sarifFormatterOptions,
    onlySuppressed: boolean
) {
    const result = results[0];
    const resultSeverity = getResultSeverity(result, rule);
    const formattedSeverity = formatSeverity(resultSeverity);
    const helpUri = rule.helpUri ? `[[HELP LINK](${rule.helpUri})]` : "";

    let markdown = `- ${formattedSeverity} **[${rule.id}]** ${helpUri} \`${escape(result.message.text)}\`\n`;
    for (const result of results) {
        if (onlySuppressed === (result.suppressions !== undefined)) {
            markdown += createResultMarkdown(result, options);
        }
    }
    return markdown;
}

function createResultMarkdown(result: Result, options: sarifFormatterOptions) {
    let markdown = "";

    const codeUrls = createCodeURL(result, options);
    codeUrls.forEach((url) => {
        markdown += `    - ${url}\n`;
    });

    return markdown;
}

function formatSeverity(severity: string) {
    return `**[${severity.toUpperCase()}]**`;
}

function filterGroupedResultsBySeverity(groupedResults: any, severities: readonly string[], run: Run) {
    // 1st step, go through run and find rule severities
    // 2nd step, filter groupedResults and remove rulegroups that don't match the severities filter
    const ruleSeverityMapping = new Map<string, string>();
    run.tool.driver?.rules?.forEach((rule: ReportingDescriptor) => {
        const severity = getRuleSeverity(rule);
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
    shouldFail: boolean;
};

export const sarifToMarkdown = (options: sarifFormatterOptions): ((sarifLog: Log) => sarifToMarkdownResult[]) => {
    const suppressedResultsFlag = options.suppressedResults !== undefined ? options.suppressedResults : true;
    const simpleMode = options.simple !== undefined ? options.simple : false;
    const severities = options.severities ?? ["warning", "error", "note", "none"];
    const failOn = options.failOn ?? false; // if not set, don't fail for anything
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
            const hasMessage = run.results && run.results.length > 0 && Object.keys(filteredResults).length > 0;
            const shouldFail = failOn === false ? false : detectFailure(run.results, failOn, run);

            /* Results
            - rule id
            - message
            - vulnerability source location

            If pass the scan, results is empty array
            */
            const results = hasMessage
                ? `
## Results

${groupedResultsMarkdown}
`
                : `
## Results

Nothing here.

`;

            const groupedSuppressedResultsMarkdown = createGroupedSuppressedResultsMarkdown(
                filteredResults,
                run,
                options
            );

            // careful, double ternary... first check if we should include suppressedresults (return empty string)
            // then check if there are results, if none, return default string
            const suppressedResultsText = suppressedResultsFlag
                ? run.results && groupedSuppressedResultsMarkdown
                    ? `
## Suppressed results

${groupedSuppressedResultsMarkdown}
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
                    hasMessages: hasMessage,
                    shouldFail: shouldFail
                };
            }
            return {
                body: title + results + "\n" + suppressedResultsText + "\n" + ruleInfo + "\n" + toolInfo,
                hasMessages: hasMessage,
                shouldFail: shouldFail
            };
        });
    };
};

function getResultSeverity(result: Result, rule?: ReportingDescriptor) {
    // Result severity takes precedence over rule's default severity.
    // See 5.17.4 (https://github.com/sarif-standard/sarif-spec-v1)
    return result.level ?? getRuleSeverity(rule);
}

function getRuleSeverity(rule?: ReportingDescriptor) {
    // according to Sarif spec - if level is absent, assume 'warning' by default.
    // see https://github.com/sarif-standard/sarif-spec-v1
    return rule?.defaultConfiguration?.level ?? "warning";
}

function getRuleByRuleId(ruleId: string, run: Run) {
    return run.tool.driver.rules?.find((r) => r.id == ruleId);
}
