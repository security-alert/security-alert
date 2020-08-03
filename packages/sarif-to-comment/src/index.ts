import { sarifToMarkdown } from "@security-alert/sarif-to-markdown";
import { issueComment } from "./issue-comment";

// SARIF pattern
export type CreatedOptions = {
    /**
     * issue url of pull request url
     */
    postingURL: string;
    // SARIF v2.1.0
    sarifContent: string;
    sarifContentOwner: string;
    sarifContentRepo: string;
    sarifContentBranch: string;
    sarifContentSourceRoot?: string;
    token: string;
    dryRun?: boolean;
};

export async function postComment(options: CreatedOptions) {
    const dryRun = options.dryRun !== undefined ? options.dryRun : false;
    const owner = options.sarifContentOwner;
    const repo = options.sarifContentRepo;
    const branch = options.sarifContentBranch;
    // https://github.com/owner/repo/issues/85
    const issuePattern = /^https:\/\/github.com\/(?<owner>[0-9a-zA-Z-_.]+)\/(?<repo>[0-9a-zA-Z-_.]+)\/issues\/(?<issueNumber>[0-9]+)/;
    const matchObj = issuePattern.exec(options.postingURL);
    if (!matchObj || !matchObj.groups) {
        throw new Error("Should set security alert url.\n" +
            "\n" +
            "Example: https://github.com/owner/reponame/network/alert/package-lock.json/axios/open");
    }
    const postingOwner: string = matchObj.groups.owner;
    const postringRepo: string = matchObj.groups.repo;
    const postringNumber: number = Number(matchObj.groups.issueNumber);
    const results = sarifToMarkdown({
        owner,
        repo,
        branch,
        sourceRoot: options.sarifContentSourceRoot ?? ""
    })(JSON.parse(options.sarifContent))
    const body = results.map(result => {
        return result.body;
    }).join("\n\n");
    if (dryRun) {
        console.log(`Post comment
owner: ${owner}
repo: ${repo}
issue: ${options.postingURL}
body: ${body}
`);
        return;
    } else {
        return issueComment({
            owner: postingOwner,
            repo: postringRepo,
            issue_number: postringNumber,
            body: body,
            token: options.token
        })
    }
}
