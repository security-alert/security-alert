# create-security-alert-issue

[GitHub] Create an issue from security alert's url.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install create-security-alert-issue --global

## Usage

  Usage
    $ create-security-alert-issue <github-security-alert-url>

  Inputs
    <github-security-alert-url> GitHub Security Alert URL(open|closed)

  Options
    --dryRun Dry-Run when it is enabled
    --token  GitHub Token, or support enviroment variables - GITHUB_TOKEN=xxx

  Examples
    $ create-security-alert-issue "https://github.com/azu/github-webhook-SecurityVulnerability-test/network/alert/package-lock.json/axios/open"


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
