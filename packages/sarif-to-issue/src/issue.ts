import { Octokit, RestEndpointMethodTypes } from "@octokit/rest";

export type createIssueOptions = {
    token: string;
} & RestEndpointMethodTypes["issues"]["create"]["parameters"];

export async function createIssue(
    options: createIssueOptions
): Promise<RestEndpointMethodTypes["issues"]["create"]["response"]["data"]> {
    const { token, ...issueOption } = options;

    const octokit = new Octokit({
        auth: token
    });
    return octokit.issues.create(issueOption).then((result) => {
        return result.data;
    });
}
