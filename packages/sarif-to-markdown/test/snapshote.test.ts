import * as fs from "fs";
import * as path from "path";
import * as assert from "assert";
// transform function
import { sarifToMarkdown } from "../src/sarif-to-markdown";

const fixturesDir = path.join(__dirname, "snapshots");
describe("Snapshot testing", () => {
    fs.readdirSync(fixturesDir)
        .map(caseName => {
            const normalizedTestName = caseName.replace(/-/g, " ");
            it(`Test ${normalizedTestName}`, async function () {
                const fixtureDir = path.join(fixturesDir, caseName);
                const actualFilePath = path.join(fixtureDir, "input.json");
                const actualContent = JSON.parse(fs.readFileSync(actualFilePath, "utf-8"));
                const actualOptionFilePath = path.join(fixtureDir, "options.json");
                const actualOptions = fs.existsSync(actualOptionFilePath)
                    ? JSON.parse(fs.readFileSync(actualOptionFilePath, "utf-8"))
                    : {
                        "owner": "owner",
                        "repo": "repo",
                        "branch": "master",
                        "sourceRoot": "base"
                    };
                const actualResults = sarifToMarkdown(actualOptions)(actualContent);
                const actualResultsMd = actualResults.map(result => result.body).join("\n\n---\n\n");
                const expectedFilePath = path.join(fixtureDir, "output.md");
                // Usage: update snapshots
                // UPDATE_SNAPSHOT=1 npm test
                if (!fs.existsSync(expectedFilePath) || process.env.UPDATE_SNAPSHOT) {
                    fs.writeFileSync(expectedFilePath, actualResultsMd);
                    this.skip(); // skip when updating snapshots
                    return;
                }
                // compare input and output
                const expectedContent = fs.readFileSync(expectedFilePath, "utf-8");
                assert.strictEqual(
                    actualResultsMd,
                    expectedContent);
            });
        });
});
