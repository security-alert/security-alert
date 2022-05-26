# @security-alert/sarif-to-markdown

Convert SARIF format to Markdown text.

> Supported safari version: v2.1.0

- [SARIF output — CodeQL](https://help.semmle.com/codeql/codeql-cli/reference/sarif-overview.html)
- [OASIS Static Analysis sarifToMarkdownResult Interchange Format (SARIF) TC | OASIS](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=sarif)

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @security-alert/sarif-to-markdown

## Example

**input.sarif:**

```json
{
  "$schema": "https://raw.githubusercontent.com/oasis-tcs/sarif-spec/master/Schemata/sarif-schema-2.1.0.json",
  "version": "2.1.0",
  "runs": [
    {
      "tool": {
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
      },
      "artifacts": [
        {
          "location": {
            "uri": "examples/Xss.js",
            "uriBaseId": "%SRCROOT%",
            "index": 0
          }
        }
      ],
      "results": [
        {
          "ruleId": "js/xss",
          "ruleIndex": 0,
          "message": {
            "text": "Cross-site scripting vulnerability due to [user-provided value](1)."
          },
          "locations": [
            {
              "physicalLocation": {
                "artifactLocation": {
                  "uri": "examples/Xss.js",
                  "uriBaseId": "%SRCROOT%",
                  "index": 0
                },
                "region": {
                  "startLine": 4,
                  "startColumn": 20,
                  "endColumn": 56
                }
              }
            }
          ],
          "partialFingerprints": {
            "primaryLocationLineHash": "f10617abe5e779f0:1",
            "primaryLocationStartColumnFingerprint": "15"
          },
          "codeFlows": [
            {
              "threadFlows": [
                {
                  "locations": [
                    {
                      "location": {
                        "physicalLocation": {
                          "artifactLocation": {
                            "uri": "examples/Xss.js",
                            "uriBaseId": "%SRCROOT%",
                            "index": 0
                          },
                          "region": {
                            "startLine": 2,
                            "startColumn": 16,
                            "endColumn": 33
                          }
                        },
                        "message": {
                          "text": "document.location"
                        }
                      }
                    },
                    {
                      "location": {
                        "physicalLocation": {
                          "artifactLocation": {
                            "uri": "examples/Xss.js",
                            "uriBaseId": "%SRCROOT%",
                            "index": 0
                          },
                          "region": {
                            "startLine": 2,
                            "startColumn": 16,
                            "endColumn": 38
                          }
                        },
                        "message": {
                          "text": "documen ... on.href"
                        }
                      }
                    },
                    {
                      "location": {
                        "physicalLocation": {
                          "artifactLocation": {
                            "uri": "examples/Xss.js",
                            "uriBaseId": "%SRCROOT%",
                            "index": 0
                          },
                          "region": {
                            "startLine": 2,
                            "startColumn": 9,
                            "endColumn": 38
                          }
                        },
                        "message": {
                          "text": "href"
                        }
                      }
                    },
                    {
                      "location": {
                        "physicalLocation": {
                          "artifactLocation": {
                            "uri": "examples/Xss.js",
                            "uriBaseId": "%SRCROOT%",
                            "index": 0
                          },
                          "region": {
                            "startLine": 3,
                            "startColumn": 17,
                            "endColumn": 21
                          }
                        },
                        "message": {
                          "text": "href"
                        }
                      }
                    },
                    {
                      "location": {
                        "physicalLocation": {
                          "artifactLocation": {
                            "uri": "examples/Xss.js",
                            "uriBaseId": "%SRCROOT%",
                            "index": 0
                          },
                          "region": {
                            "startLine": 3,
                            "startColumn": 17,
                            "endColumn": 59
                          }
                        },
                        "message": {
                          "text": "href.su ... t=\")+8)"
                        }
                      }
                    },
                    {
                      "location": {
                        "physicalLocation": {
                          "artifactLocation": {
                            "uri": "examples/Xss.js",
                            "uriBaseId": "%SRCROOT%",
                            "index": 0
                          },
                          "region": {
                            "startLine": 3,
                            "startColumn": 9,
                            "endColumn": 59
                          }
                        },
                        "message": {
                          "text": "deflt"
                        }
                      }
                    },
                    {
                      "location": {
                        "physicalLocation": {
                          "artifactLocation": {
                            "uri": "examples/Xss.js",
                            "uriBaseId": "%SRCROOT%",
                            "index": 0
                          },
                          "region": {
                            "startLine": 4,
                            "startColumn": 39,
                            "endColumn": 44
                          }
                        },
                        "message": {
                          "text": "deflt"
                        }
                      }
                    },
                    {
                      "location": {
                        "physicalLocation": {
                          "artifactLocation": {
                            "uri": "examples/Xss.js",
                            "uriBaseId": "%SRCROOT%",
                            "index": 0
                          },
                          "region": {
                            "startLine": 4,
                            "startColumn": 20,
                            "endColumn": 56
                          }
                        },
                        "message": {
                          "text": "\"<OPTIO ... PTION>\""
                        }
                      }
                    }
                  ]
                }
              ]
            }
          ],
          "relatedLocations": [
            {
              "id": 1,
              "physicalLocation": {
                "artifactLocation": {
                  "uri": "examples/Xss.js",
                  "uriBaseId": "%SRCROOT%",
                  "index": 0
                },
                "region": {
                  "startLine": 2,
                  "startColumn": 16,
                  "endColumn": 33
                }
              },
              "message": {
                "text": "user-provided value"
              }
            }
          ]
        }
      ],
      "newlineSequences": [
        "\r\n",
        "\n",
        " ",
        " "
      ],
      "columnKind": "utf16CodeUnits",
      "properties": {
        "semmle.formatSpecifier": "sarifv2.1.0"
      }
    }
  ]
}
```

**output.md**

---


## Rules
<!-- Rule Info -->
**js/xss** (severity: **error**)

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

## Results

- **js/xss**: Cross-site scripting vulnerability due to \[user-provided value\]\(1\).

https://github.com/owner/repo/blob/master/base/examples/Xss.js#L4

---

## Changelog

See [Releases page](https://github.com/security-alert/security-alert/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/security-alert/security-alert/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
