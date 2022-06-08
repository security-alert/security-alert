import * as fs from "fs";
import * as path from "path";
import * as assert from "assert";
// transform function
import { postComment } from "../src/index";

const sarifDir = path.join(__dirname);
const xssFilePath = path.join(sarifDir, "xss.sarif");

describe("Pull request", () => {
    it(`Testing failure comment to a pull request due to fail-on`, async function () {
        const actualOptions = {
            sarifContent: fs.readFileSync(xssFilePath, "utf-8"),
            postingURL: "https://github.com/azu/security-alert/pull/1/fail-on",
            sarifContentOwner: "aa",
            sarifContentRepo: "aa",
            sarifContentBranch: "aa",
            token: "aa",
            dryRun: true,
            failon: ["error"]
        };
        const result = await postComment(actualOptions);

        assert.deepStrictEqual(result, {
            posted: false, //  error type
            reason: "This is a dry run",
            shouldFail: true
        });
    });
});
