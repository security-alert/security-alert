# Report
## Results

- **js/xss**: Cross-site scripting vulnerability due to \[user-provided value\]\(1\).

https://github.com/owner/repo/blob/master/base/examples/Xss.js#L4

- **js/xss**: Cross-site scripting vulnerability due to \[user-provided value\]\(1\).

https://github.com/owner/repo/blob/master/base/examples/Xss2.js#L4



## Rules information
<!-- Rule Info -->
<details><summary>Rules details</summary>

- js/xss [error]

> Client-side cross-site scripting
 
<details><summary>Details</summary>
<pre>{
    "driver": {
        "name": "CodeQL command-line toolchain",
        "organization": "GitHub",
        "semanticVersion": "2.2.4",
        "rules": [
            {
                "id": "js/xss",
                "name": "js/xss",
                "shortDescription": {
                    "text": "Client-side cross-site scripting"
                },
                "fullDescription": {
                    "text": "Writing user input directly to the DOM allows for a cross-site scripting vulnerability."
                },
                "defaultConfiguration": {
                    "level": "error"
                },
                "properties": {
                    "tags": [
                        "security",
                        "external/cwe/cwe-079",
                        "external/cwe/cwe-116"
                    ],
                    "kind": "path-problem",
                    "precision": "high",
                    "name": "Client-side cross-site scripting",
                    "description": "Writing user input directly to the DOM allows for\n              a cross-site scripting vulnerability.",
                    "id": "js/xss",
                    "problem.severity": "error"
                }
            }
        ]
    }
}</pre></details>

## Tool information
- Name: CodeQL command-line toolchain
- Organization: GitHub
- Version: 2.2.4
