import { createIssue } from "./issue";
import { sarifToMarkdown } from "@security-alert/sarif-to-markdown";

export type CreatedOptions = {
    // issue
    issue: {
        title: string;
        owner: string;
        repo: string;
        assignees?: string[];
        labels?: string[];
    };
    token: string;
    dryRun?: boolean;
    // SARIF v2.1.0
    sarifContent: string;
    sarifContentOwner: string;
    sarifContentRepo: string;
    sarifContentBranch: string;
    sarifContentSourceRoot?: string;
};

export async function createIssueFromSarif(options: CreatedOptions) {
    const dryRun = options.dryRun !== undefined ? options.dryRun : false;
    const issueTitle = options.issue.title;
    const issueOwner = options.issue.owner;
    const issueRepo = options.issue.repo;
    const assignees = options.issue.assignees ? options.issue.assignees : [];
    const labels = options.issue.labels ? options.issue.labels : [];
    const results = sarifToMarkdown({
        owner: options.sarifContentOwner,
        repo: options.sarifContentRepo,
        branch: options.sarifContentBranch,
        sourceRoot: options.sarifContentSourceRoot ?? ""
    })(JSON.parse(options.sarifContent));
    const resultsHasMessage = results.filter((result) => result.hasMessages);
    const body = resultsHasMessage
        .map((result) => {
            return result.body;
        })
        .join("\n\n");

    if (dryRun) {
        console.log(`Create Issue
owner: ${issueOwner}
repo: ${issueRepo}
labels: ${labels.length > 0 ? labels.join(",") : ""}
assignees: ${assignees.length > 0 ? assignees.join(",") : ""}
title: ${issueTitle}
body: ${body}
`);
        return;
    } else {
        return createIssue({
            owner: issueOwner,
            repo: issueRepo,
            title: issueTitle,
            body,
            token: options.token,
            assignees,
            labels
        });
    }
}
