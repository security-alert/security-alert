import { Octokit, RestEndpointMethodTypes } from "@octokit/rest";
const { createActionAuth } = require("@octokit/auth-action");

export type createIssueOptions = {
    token: string;
    ghActionAuthentication?: boolean;
} & RestEndpointMethodTypes["issues"]["createComment"]["parameters"];

export async function issueComment(
    options: createIssueOptions
): Promise<RestEndpointMethodTypes["issues"]["createComment"]["response"]["data"]> {
    const { token, ghActionAuthentication, ...commentParameters } = options;
    let octokit;
    if (ghActionAuthentication) {
        // handle Github action authentication method by passing --action in cli
        octokit = new Octokit({
            auth: token,
            authStrategy: createActionAuth
        });
    } else {
        octokit = new Octokit({
            auth: token
        });
    }

    return octokit.issues.createComment(commentParameters).then((result) => {
        return result.data;
    });
}
