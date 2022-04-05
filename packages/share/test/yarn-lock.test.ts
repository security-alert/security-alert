import * as fs from "fs";
import * as assert from "assert";
import * as path from "path";
import { lookupYarnLockDetails } from "../src/parser/yarn-lock";

const lockfile = require("@yarnpkg/lockfile");

describe("yarn-lock", function () {
    it("should parse", () => {
        const filePath = path.join(__dirname, "fixtures/yarn.lock.dump");
        const lock = fs.readFileSync(filePath, "utf-8");
        const lockContent = lockfile.parse(lock);
        const details = lookupYarnLockDetails({
            packageName: "@babel/core",
            packageFilePath: filePath,
            pkg: lockContent
        });
        assert.deepStrictEqual(details, {
            name: "@babel/core",
            packageFilePath: filePath,
            version: "7.5.0",
            dependenciesType: "unknown"
        });
    });
});
