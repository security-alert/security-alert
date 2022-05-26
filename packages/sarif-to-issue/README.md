# @security-alert/sarif-to-issue

Create an issue from SARIF file

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @security-alert/sarif-to-issue

## Usage

    Usage
      $ npx @security-alert/sarif-to-issue <sarif-file-path>
 
    Inputs
      <sarif-file-path> Path to sarif file path
 
    Options
      --dryRun                      Dry-Run when it is enabled
      --token                       [Required] GitHub Token, or support environment variables - GITHUB_TOKEN=xxx
      --owner                       [Required] Github repository owner for creating issue. e.g.) "azu"
      --repo                        [Required] Github repository name for creating issue. e.g.) "security-alert"
      --title                       [Required] GitHub issue title. e.g.) "Security Notice"
      --assignees                   Assignee user name of the issue. names are separated by ,(comma)
      --labels                      Label names of the issue. labels are separated by ,(comma) 
      --sarifContentOwner           [Required] GitHub Owner name of sarif content result.  e.g. "owner"
      --sarifContentRepo            [Required] GitHub Repository name of sarif content result. e.g. "repo"
      --sarifContentBranch          [Required] GitHub Repository branch name of sarif content result. e.g. "master"
      --sarifContentSourceRoot      Base path to sarif scanned source. You can set CodeQL's sourceLocationPrefix as relative value if necessary
      
    Examples
      # Create an issue to security-alert/codeql-scan-example from "./test/fixtures/xss.sarif" file
      $ GITHUB_TOKEN=xxx npx @security-alert/sarif-to-issue --title "Example Issue" --owner azu --repo codeql-scan-example --sarifContentOwner azu --sarifContentRepo codeql-scan-example --sarifContentBranch master ./test/fixtures/xss.sarif
      # Create an issue to security-alert/example-repo with "security" labels
      $ GITHUB_TOKEN=xxx npx @security-alert/sarif-to-issue output.sarif --title "Example Issue" --owner azu --repo codeql-scan-example --sarifContentOwner azu --sarifContentRepo codeql-scan-example --sarifContentBranch master ./test/fixtures/xss.sarif  --labels "security" 

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
