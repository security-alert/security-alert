import { postComment } from "./index";
import path from "path";
import * as fs from "fs";

postComment({
    postingURL: "https://github.com/azu/security-alert/issues/4",
    sarifContentOwner: "azu",
    sarifContentRepo: "security-alert",
    sarifContentSourceRoot: "packages/sarif-to-markdown/test/snapshots/xss",
    sarifContentBranch: "master",
    token: process.env.GITHUB_TOKEN!,
    dryRun: false,
    sarifContent: fs.readFileSync(path.join(__dirname, "../../sarif-to-markdown/test/snapshots/xss/input.json"), "utf-8")
}).then((res) => {
    console.log(res?.html_url);
})
