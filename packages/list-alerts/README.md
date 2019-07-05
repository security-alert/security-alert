# @security-alert/list-alerts

Show list of GitHub Security Alerts.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install @security-alert/list-alerts

## Usage

```
    Usage
      $ npx @security-alert/list-alerts [option]
 
    Options
      --repo   Repository to get details for
               <owner>/<name>
      --token  GitHub Token, or support environment variables - GITHUB_TOKEN=xxx
      --format  json, text
  
    Examples
      $ GITHUB_TOKEN=xxx npx @security-alert/list-alerts --repo github/desktop
      $ GITHUB_TOKEN=xxx npx @security-alert/list-alerts --repo github/desktop --format json
```

## Example


```shell
$ GITHUB_TOKEN="$GITHUB_TOKEN" npx @security-alert/list-alerts --repo azu/github-webhook-SecurityVulnerability-test

# lodash

- PackageName: lodash
- PackageUrl: https://www.npmjs.com/package/lodash
- PackageVersion: 2.4.2
- DependenciesType: dependencies
- PackageManifestUrl: https://github.com/azu/github-webhook-SecurityVulnerability-test/blob/master/package-lock.json
- VulnerableVersionRange: < 4.17.5
- GitHubAlertUrl: https://github.com/azu/github-webhook-SecurityVulnerability-test/network/alert/package-lock.json/lodash/open


# lodash

- PackageName: lodash
- PackageUrl: https://www.npmjs.com/package/lodash
- PackageVersion: 2.4.2
- DependenciesType: dependencies
- PackageManifestUrl: https://github.com/azu/github-webhook-SecurityVulnerability-test/blob/master/package-lock.json
- VulnerableVersionRange: < 4.17.11
- GitHubAlertUrl: https://github.com/azu/github-webhook-SecurityVulnerability-test/network/alert/package-lock.json/lodash/open


# minimatch

- PackageName: minimatch
- PackageUrl: https://www.npmjs.com/package/minimatch
- PackageVersion: 3.0.0
- DependenciesType: dependencies
- PackageManifestUrl: https://github.com/azu/github-webhook-SecurityVulnerability-test/blob/master/package-lock.json
- VulnerableVersionRange: < 3.0.2
- GitHubAlertUrl: https://github.com/azu/github-webhook-SecurityVulnerability-test/network/alert/package-lock.json/minimatch/open

...(snip)...

```

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
