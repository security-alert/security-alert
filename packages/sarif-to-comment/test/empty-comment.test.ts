import * as fs from "fs";
import * as path from "path";
import * as assert from "assert";
// transform function
import { postComment } from "../src/index";

const sarifDir = path.join(__dirname);
const actualFilePath = path.join(sarifDir, "sarif.json");

describe("Testing", () => {
    it(`Testing failure due to empty sarif`, async function () {
        const actualOptions = {
            sarifContent: fs.readFileSync(actualFilePath, "utf-8"),
            postingURL: "https://github.com/azu/security-alert/issues/1",
            sarifContentOwner: "aa",
            sarifContentRepo: "aa",
            sarifContentBranch: "aa",
            token: "aa"
        };
        const result = await postComment(actualOptions);

        assert.deepStrictEqual(result, {
            posted: false, //  error type
            reason: "There are no results in this SARIF run 0, exiting without a comment !" // error message
        });
    });
});
