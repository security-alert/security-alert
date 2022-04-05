# @security-alert monorepo [![Actions Status: test](https://github.com/azu/security-alert/workflows/test/badge.svg)](https://github.com/azu/security-alert/actions?query=workflow%3A"test")

A Command Line ToolKit for GitHub Security Alert.

## Tools

- [@security-alert/create-issue](packages/create-issue)
    - Create an issue form GitHub Security Alert URL
- [@security-alert/list-alerts](packages/list-alerts)
    - Show list of GitHub Security Alerts.

### SARIF to GitHub Issue/Comment

These tools aim to integration [CodeQL](https://securitylab.github.com/tools/codeql) and GitHub.
[CodeQL](https://securitylab.github.com/tools/codeql) output the scanned results as [SARIF format](https://help.semmle.com/codeql/codeql-cli/reference/sarif-overview.html).

- [@security-alert/sarif-to-issue](packages/sarif-to-issue)
    - Create an issue form SARIF file
- [@security-alert/sarif-to-comment](packages/sarif-to-comment)
    - Comment to issue from SARIF file
- [@security-alert/sarif-to-markdown](packages/sarif-to-markdown)
    - Convert SARIF to Markdown format
    - Good work with GitHub's CodeQL results

## Changelog

See [Releases page](https://github.com/azu/create-security-alert-issue/releases).

## Development

    yarn install
    yarn run build
    yarn test
    
## Release Workflow

    git checkout -b release-branch
    git push -u
    GH_TOKEN=xxx npm run versionup
    npm run release # use npm instead of yarn

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/create-security-alert-issue/issues).

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
