#!/usr/bin/env node
const cli = require("../lib/cli");
cli.run().then(result => {
    console.log(result);
}).catch(error => {
    console.error(error.stack || error);
});
