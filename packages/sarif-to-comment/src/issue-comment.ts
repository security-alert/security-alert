import { Octokit, RestEndpointMethodTypes } from "@octokit/rest";

export type createIssueOptions = {
    token: string;
} & RestEndpointMethodTypes["issues"]["createComment"]["parameters"]

export async function issueComment(options: createIssueOptions): Promise<RestEndpointMethodTypes["issues"]["createComment"]["response"]["data"]> {
    const {token, ...commentParameters} = options;
    const octokit = new Octokit({
        auth: token
    });
    return octokit.issues.createComment(commentParameters).then(result => {
        return result.data;
    });
}
