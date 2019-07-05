import { createFromURL } from "./index";

createFromURL("https://github.com/azu/github-webhook-SecurityVulnerability-test/network/alert/package-lock.json/axios/open", {
    token: process.env.GH_TOKEN!,
    dryRun: true,
    issue: {
        labels: ["security"],
        assignees: ["azu"]
    }
});
