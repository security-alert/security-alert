# @security-alert/create-issue

[GitHub] Create an issue from security alert's url.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @security-alert/create-issue --global
    # Install `security-alert-create-issue` command

Using with [npx](https://www.npmjs.com/package/npx):

    npx @security-alert/create-issue

## Usage

```
    Usage
      $ npx @security-alert/create-issue <github-security-alert-url>
 
    Inputs
      <github-security-alert-url> GitHub Security Alert URL(open|closed)
 
    Options
      --dryRun Dry-Run when it is enabled
      --token  GitHub Token, or support environment variables - GITHUB_TOKEN=xxx
      --assignees assignee user name. names are separated ,
      --labels    label name. labels are separated , 
      
    Examples
      $ GITHUB_TOKEN=xxx npx @security-alert/create-issue "https://github.com/azu/github-webhook-SecurityVulnerability-test/network/alert/package-lock.json/axios/open"
      $ GITHUB_TOKEN=xxx npx @security-alert/create-issue "https://github.com/azu/github-webhook-SecurityVulnerability-test/network/alert/package-lock.json/axios/open" --labels "security,package"
```

## Example Issue

- <https://github.com/azu/github-webhook-SecurityVulnerability-test/issues/8>

## Changelog

See [Releases page](https://github.com/azu/create-security-alert-issue/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

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
