# @security-alert/sarif-to-comment

Post comment to GitHub issue/pull requests.

## Purpose

It aims to post [CodeQL](https://securitylab.github.com/tools/codeql) result to GitHub Issue as comment.

It optimizes the formatter of SARIF for [SARIF output — CodeQL](https://help.semmle.com/codeql/codeql-cli/reference/sarif-overview.html).

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @security-alert/sarif-to-comment

## Usage

    Usage
      $ npx @security-alert/sarif-to-comment <sarif-file-path>
 
    Inputs
      <sarif-file-path> Path to sarif file path
 
    Options
      --dryRun                      Dry-Run when it is enabled
      --token                       GitHub Token, or support environment variables - GITHUB_TOKEN=xxx
      --action                      Authentication mode for the token, defaults to PAT, if set, switches to Github Action
      --ruleDetails                 Include full JSON rule details in the markdown, might be too big for Github's API, defaults to false
      --simple                      Simplify the output to only give findings grouped by rule, adds helpURI if present
      --severity                    Filter output issues by their severity level, warning, error, note, none (separated by commas)
      --failon                      Throw an exit error code 1 if an issue with that level was detected, warning, error, note, none, or all, set flag for each, NOT affected by severity filtering
      --commentUrl                  Post to comment URL. e.g. https://github.com/owner/repo/issues/85
      --title                       Specify a comment title for the report, optional
      --no-suppressedResults        Don't include suppressed results, that are in SARIF suppressions
      --sarifContentOwner           GitHub Owner name of sarif content result.  e.g. "owner"
      --sarifContentRepo            GitHub Repository name of sarif content result. e.g. "repo"
      --sarifContentBranch          GitHub Repository branch name of sarif content result. e.g. "master"
      --sarifContentSourceRoot      Base path to sarif scanned source. You can set CodeQL's sourceLocationPrefix as relative value if necessary
    
    Examples
      # DryRun and preview it!
      $ GITHUB_TOKEN=xxx npx @security-alert/sarif-to-comment --commentUrl "https://github.com/owner/repo/issues/1" --sarifContentOwner "owner" --sarifContentRepo "repo" --sarifContentBranch "master" "./codeql_result.sarif"
      # Post It
      $ GITHUB_TOKEN=xxx npx @security-alert/sarif-to-comment --commentUrl "https://github.com/owner/repo/issues/1" --sarifContentOwner "owner" --sarifContentRepo "repo" --sarifContentBranch "master" "./codeql_result.sarif"
      # Set base path
      $ GITHUB_TOKEN=xxx npx @security-alert/sarif-to-comment --commentUrl "https://github.com/owner/another/issues/1" --sarifContentOwner "owner" --sarifContentRepo "repo" --sarifContentBranch "develop" --sarifContentSourceRoot "./basepath" "./codeql_result.sarif"
      # use HEAD sha for link
      $ GITHUB_TOKEN=xxx npx @security-alert/sarif-to-comment --commentUrl "https://github.com/owner/another/issues/1" --sarifContentOwner "owner" --sarifContentRepo "repo" ---sarifContentBranch `git rev-parse HEAD` "./codeql_result.sarif"

## Examples

- <https://github.com/security-alert/codeql-scan-example/issues/1>

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
