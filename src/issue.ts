import Octokit, { IssuesCreateParams } from "@octokit/rest";

export type createIssueOptions = {
    token: string;
} & IssuesCreateParams

export async function createIssue(options: createIssueOptions): Promise<Octokit.IssuesCreateResponse> {
    const { token , ...issueOption} = options;

    const octokit = new Octokit({
        auth: token
    });
    return octokit.issues.create(issueOption).then(result => {
        return result.data;
    });
}
