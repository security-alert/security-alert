import * as fs from "fs";
import * as path from "path";
import * as assert from "assert";
// transform function
import { postComment } from "../src/index";

console.log(__dirname);
const sarifDir = path.join(__dirname);
const actualFilePath = path.join(sarifDir, "/sarif.json");
describe("Testing", () => {
    it(`Testing failure due to empty sarif`, async function () {
        const actualOptions = {
            sarifContent: JSON.parse(fs.readFileSync(actualFilePath).toString()),
            postingURL: "http://localhost",
            sarifContentOwner: "aa",
            sarifContentRepo: "aa",
            sarifContentBranch: "aa",
            token: "aa"
        };

        assert.throws(async () => {
            await postComment(actualOptions);
        }, "There are no results in this SARIF run 0, exiting without a comment !");
    });
});
