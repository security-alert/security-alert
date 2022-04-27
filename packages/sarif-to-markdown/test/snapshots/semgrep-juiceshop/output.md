# Report
## Results

- **[ERROR]** **[generic.secrets.security.detected-private-key.detected-private-key]** [[HELP LINK](undefined)] `Private Key detected. This is a sensitive credential and should not be hardcoded here. Instead, store this in a separate, private file.`
- **[ERROR]** **[generic.secrets.security.detected-generic-secret.detected-generic-secret]** [[HELP LINK](undefined)] `Generic Secret detected`
    - https://github.com/juice-shop/juice-shop/blob/master/data/static/users.yml#L150-150
- **[WARNING]** **[javascript.lang.security.audit.path-traversal.path-join-resolve-traversal.path-join-resolve-traversal]** [[HELP LINK](undefined)] `Possible writing outside of the destination, make sure that the target path is nested in the intended destination`
    - https://github.com/juice-shop/juice-shop/blob/master/data/datacreator.ts#L26-26
    - https://github.com/juice-shop/juice-shop/blob/master/lib/startup/validatePreconditions.ts#L95-95
    - https://github.com/juice-shop/juice-shop/blob/master/models/index.ts#L31-31
    - https://github.com/juice-shop/juice-shop/blob/master/routes/fileUpload.ts#L47-48
    - https://github.com/juice-shop/juice-shop/blob/master/routes/vulnCodeSnippet.ts#L32-32
- **[WARNING]** **[javascript.lang.security.audit.detect-bracket-object-injection.detect-bracket-object-injection]** [[HELP LINK](undefined)] `Detected user input used in bracket notation accessor. This could lead to object injection through property, which could grant access to every property available in the object and therefore sensitive information. Instead, avoid the use of user input in property name fields or create a whitelist of allowed input.`
    - https://github.com/juice-shop/juice-shop/blob/master/frontend/src/hacking-instructor/helpers/helpers.ts#L29-29
    - https://github.com/juice-shop/juice-shop/blob/master/lib/utils.ts#L276-276
    - https://github.com/juice-shop/juice-shop/blob/master/lib/utils.ts#L287-287
    - https://github.com/juice-shop/juice-shop/blob/master/routes/captcha.ts#L19-19
    - https://github.com/juice-shop/juice-shop/blob/master/routes/captcha.ts#L20-20
    - https://github.com/juice-shop/juice-shop/blob/master/routes/userProfile.ts#L40-40
    - https://github.com/juice-shop/juice-shop/blob/master/routes/videoHandler.ts#L58-58
    - https://github.com/juice-shop/juice-shop/blob/master/routes/vulnCodeSnippet.ts#L99-99
    - https://github.com/juice-shop/juice-shop/blob/master/routes/vulnCodeSnippet.ts#L203-203
    - https://github.com/juice-shop/juice-shop/blob/master/server.ts#L594-594
    - https://github.com/juice-shop/juice-shop/blob/master/server.ts#L606-606
- **[WARNING]** **[javascript.lang.security.audit.code-string-concat.code-string-concat]** [[HELP LINK](undefined)] `User controlled data in eval\(\) or similar functions may result in Code Injection`
    - https://github.com/juice-shop/juice-shop/blob/master/data/static/codefixes/adminSectionChallenge_3.ts#L3-3
    - https://github.com/juice-shop/juice-shop/blob/master/data/static/codefixes/adminSectionChallenge_3.ts#L3-3
    - https://github.com/juice-shop/juice-shop/blob/master/lib/startup/validateChatBot.ts#L37-37
    - https://github.com/juice-shop/juice-shop/blob/master/lib/startup/validateConfig.ts#L109-109
    - https://github.com/juice-shop/juice-shop/blob/master/lib/startup/validateConfig.ts#L160-160
    - https://github.com/juice-shop/juice-shop/blob/master/routes/userProfile.ts#L52-52
    - https://github.com/juice-shop/juice-shop/blob/master/server.ts#L175-175
- **[WARNING]** **[javascript.lang.security.audit.detect-non-literal-fs-filename.detect-non-literal-fs-filename]** [[HELP LINK](undefined)] `A variable is present in the filename argument of fs calls, this might allow an attacker to access anything on your system.`
    - https://github.com/juice-shop/juice-shop/blob/master/Gruntfile.js#L72-72
    - https://github.com/juice-shop/juice-shop/blob/master/routes/order.ts#L32-32
    - https://github.com/juice-shop/juice-shop/blob/master/routes/vulnCodeFixes.ts#L30-30
    - https://github.com/juice-shop/juice-shop/blob/master/routes/vulnCodeFixes.ts#L81-81
    - https://github.com/juice-shop/juice-shop/blob/master/routes/vulnCodeFixes.ts#L82-82
    - https://github.com/juice-shop/juice-shop/blob/master/rsn/rsnUtil.ts#L50-50
    - https://github.com/juice-shop/juice-shop/blob/master/rsn/rsnUtil.ts#L105-105
- **[WARNING]** **[javascript.lang.security.audit.detect-non-literal-regexp.detect-non-literal-regexp]** [[HELP LINK](undefined)] `RegExp\(\) called with a variable, this might allow an attacker to DOS your application with a long-running regular expression.`
    - https://github.com/juice-shop/juice-shop/blob/master/routes/vulnCodeSnippet.ts#L103-103
    - https://github.com/juice-shop/juice-shop/blob/master/routes/vulnCodeSnippet.ts#L122-122
    - https://github.com/juice-shop/juice-shop/blob/master/routes/vulnCodeSnippet.ts#L124-124
- **[WARNING]** **[javascript.lang.security.audit.prototype-pollution.prototype-pollution-loop.prototype-pollution-loop]** [[HELP LINK](undefined)] `Possibility of prototype polluting function detected. By adding or modifying attributes of an object prototype, it is possible to create attributes that exist on every object, or replace critical attributes with malicious ones. This can be problematic if the software depends on existence or non-existence of certain attributes, or uses pre-defined attributes of object prototype \(such as hasOwnProperty, toString or valueOf\). Possible mitigations might be: freezing the object prototype, using an object without prototypes \(via Object.create\(null\) \), blocking modifications of attributes that resolve to object prototype, using Map instead of object.`
    - https://github.com/juice-shop/juice-shop/blob/master/frontend/src/hacking-instructor/helpers/helpers.ts#L29-29
- **[WARNING]** **[javascript.lang.correctness.no-replaceall.no-replaceall]** [[HELP LINK](undefined)] `The string method replaceAll is not supported in all versions of javascript, and is not supported by older browser versions. Consider using replace\(\) with a regex as the first argument instead like mystring.replace\(\/bad\/g, "good"\) instead of mystring.replaceAll\("bad", "good"\) \(https:\/\/discourse.threejs.org\/t\/replaceall-is-not-a-function\/14585\)`
    - https://github.com/juice-shop/juice-shop/blob/master/data/static/codefixes/restfulXssChallenge_2.ts#L59-59
    - https://github.com/juice-shop/juice-shop/blob/master/data/static/codefixes/restfulXssChallenge_2.ts#L59-59
- **[NOTE]** **[javascript.lang.security.audit.non-constant-sql-query.non-constant-sql-query]** [[HELP LINK](undefined)] `Non-constant SQL query detected. Ensure this is not controlled by external data, otherwise this is a SQL injection.`
    - https://github.com/juice-shop/juice-shop/blob/master/data/static/codefixes/dbSchemaChallenge_1.ts#L5-5
    - https://github.com/juice-shop/juice-shop/blob/master/data/static/codefixes/dbSchemaChallenge_2_correct.ts#L5-8
    - https://github.com/juice-shop/juice-shop/blob/master/data/static/codefixes/dbSchemaChallenge_3.ts#L11-11
    - https://github.com/juice-shop/juice-shop/blob/master/data/static/codefixes/unionSqlInjectionChallenge_1.ts#L6-6
    - https://github.com/juice-shop/juice-shop/blob/master/data/static/codefixes/unionSqlInjectionChallenge_2_correct.ts#L5-8
    - https://github.com/juice-shop/juice-shop/blob/master/data/static/codefixes/unionSqlInjectionChallenge_3.ts#L10-10
    - https://github.com/juice-shop/juice-shop/blob/master/routes/login.ts#L33-33
    - https://github.com/juice-shop/juice-shop/blob/master/routes/search.ts#L17-17
- **[WARNING]** **[javascript.lang.security.audit.unknown-value-with-script-tag.unknown-value-with-script-tag]** [[HELP LINK](undefined)] `Cannot determine what 'subs' is and it is used with a '&lt;script&gt;' tag. This could be susceptible to cross-site scripting \(XSS\). Ensure 'subs' is not externally controlled, or sanitize this data.`
    - https://github.com/juice-shop/juice-shop/blob/master/routes/videoHandler.ts#L68-68
- **[WARNING]** **[javascript.lang.security.detect-eval-with-expression.detect-eval-with-expression]** [[HELP LINK](undefined)] `Detected eval\(variable\), which could allow a malicious actor to run arbitrary code.`
    - https://github.com/juice-shop/juice-shop/blob/master/routes/captcha.ts#L23-23
    - https://github.com/juice-shop/juice-shop/blob/master/routes/userProfile.ts#L33-33
- **[WARNING]** **[javascript.lang.security.detect-non-literal-require.detect-non-literal-require]** [[HELP LINK](undefined)] `Detected the use of require\(variable\). Calling require with a non-literal argument might allow an attacker to load an run arbitrary code, or access arbitrary files.`
    - https://github.com/juice-shop/juice-shop/blob/master/models/index.ts#L31-31
- **[WARNING]** **[typescript.angular.security.audit.angular-domsanitizer.angular-bypasssecuritytrust]** [[HELP LINK](undefined)] `Bypassing the built-in sanitization could expose the application to cross-site scripting \(XSS\).`
    - https://github.com/juice-shop/juice-shop/blob/master/data/static/codefixes/localXssChallenge_1.ts#L6-6
    - https://github.com/juice-shop/juice-shop/blob/master/data/static/codefixes/localXssChallenge_3.ts#L6-6
    - https://github.com/juice-shop/juice-shop/blob/master/data/static/codefixes/localXssChallenge_4.ts#L6-6
    - https://github.com/juice-shop/juice-shop/blob/master/data/static/codefixes/restfulXssChallenge_3.ts#L45-45
    - https://github.com/juice-shop/juice-shop/blob/master/data/static/codefixes/restfulXssChallenge_4.ts#L59-59
    - https://github.com/juice-shop/juice-shop/blob/master/data/static/codefixes/xssBonusChallenge_2.ts#L6-6
- **[ERROR]** **[contrib.nodejsscan.jwt_hardcoded.hardcoded_jwt_secret]** [[HELP LINK](undefined)] `Hardcoded JWT secret was found. Store it properly in an environment variable.`
    - https://github.com/juice-shop/juice-shop/blob/master/lib/insecurity.js#L9-34
- **[WARNING]** **[contrib.nodejsscan.jwt_not_revoked.jwt_not_revoked]** [[HELP LINK](undefined)] `No token revoking configured for `express-jwt`. A leaked token could still be used and unable to be revoked. Consider using function as the `isRevoked` option.`
    - https://github.com/juice-shop/juice-shop/blob/master/lib/insecurity.js#L32-32
    - https://github.com/juice-shop/juice-shop/blob/master/lib/insecurity.js#L33-33
- **[ERROR]** **[javascript.jsonwebtoken.security.jwt-hardcode.hardcoded-jwt-secret]** [[HELP LINK](undefined)] `Hardcoded JWT secret or private key is used. This is a Insufficiently Protected Credentials weakness: https:\/\/cwe.mitre.org\/data\/definitions\/522.html Consider using an appropriate security mechanism to protect the credentials \(e.g. keeping secrets in environment variables: process.env.SECRET\)`
    - https://github.com/juice-shop/juice-shop/blob/master/lib/insecurity.js#L34-34
    - https://github.com/juice-shop/juice-shop/blob/master/lib/insecurity.js#L34-34
- **[WARNING]** **[javascript.lang.security.audit.unsafe-dynamic-method.unsafe-dynamic-method]** [[HELP LINK](undefined)] `Using non-static data to retrieve and run functions from the object is dangerous. If the data is user-controlled, it may allow executing arbitrary code.`
    - https://github.com/juice-shop/juice-shop/blob/master/routes/chatbot.ts#L82-82
- **[NOTE]** **[generic.ci.security.use-frozen-lockfile.use-frozen-lockfile-npm]** [[HELP LINK](undefined)] `To ensure reproducable and deterministic builds, use `npm ci` rather than `npm install` in scripts. This will use the lockfile rather than updating it.`
    - https://github.com/juice-shop/juice-shop/blob/master/.github/workflows/ci.yml#L31-31
    - https://github.com/juice-shop/juice-shop/blob/master/.github/workflows/ci.yml#L34-34
    - https://github.com/juice-shop/juice-shop/blob/master/.github/workflows/ci.yml#L36-36
    - https://github.com/juice-shop/juice-shop/blob/master/.github/workflows/ci.yml#L63-63
    - https://github.com/juice-shop/juice-shop/blob/master/.github/workflows/ci.yml#L65-66
    - https://github.com/juice-shop/juice-shop/blob/master/.github/workflows/ci.yml#L94-94
    - https://github.com/juice-shop/juice-shop/blob/master/.github/workflows/ci.yml#L97-98
    - https://github.com/juice-shop/juice-shop/blob/master/.github/workflows/ci.yml#L143-143
    - https://github.com/juice-shop/juice-shop/blob/master/.github/workflows/ci.yml#L145-146
    - https://github.com/juice-shop/juice-shop/blob/master/.github/workflows/ci.yml#L174-174
    - https://github.com/juice-shop/juice-shop/blob/master/.github/workflows/ci.yml#L176-177
    - https://github.com/juice-shop/juice-shop/blob/master/.github/workflows/ci.yml#L200-200
    - https://github.com/juice-shop/juice-shop/blob/master/.github/workflows/ci.yml#L202-203
    - https://github.com/juice-shop/juice-shop/blob/master/.github/workflows/ci.yml#L223-223
    - https://github.com/juice-shop/juice-shop/blob/master/.github/workflows/ci.yml#L224-224
    - https://github.com/juice-shop/juice-shop/blob/master/.github/workflows/ci.yml#L232-232
    - https://github.com/juice-shop/juice-shop/blob/master/.github/workflows/ci.yml#L233-233
    - https://github.com/juice-shop/juice-shop/blob/master/.github/workflows/lint-fixer.yml#L16-16
    - https://github.com/juice-shop/juice-shop/blob/master/.github/workflows/lint-fixer.yml#L19-19
    - https://github.com/juice-shop/juice-shop/blob/master/.github/workflows/lint-fixer.yml#L21-21
    - https://github.com/juice-shop/juice-shop/blob/master/.github/workflows/release.yml#L30-30
    - https://github.com/juice-shop/juice-shop/blob/master/.github/workflows/release.yml#L31-31
    - https://github.com/juice-shop/juice-shop/blob/master/.github/workflows/release.yml#L46-46
    - https://github.com/juice-shop/juice-shop/blob/master/.github/workflows/release.yml#L47-47
    - https://github.com/juice-shop/juice-shop/blob/master/Dockerfile#L5-5
    - https://github.com/juice-shop/juice-shop/blob/master/Dockerfile.arm#L5-5
    - https://github.com/juice-shop/juice-shop/blob/master/package.json#L55-55



## Suppressed results

- **[ERROR]** **[generic.secrets.security.detected-private-key.detected-private-key]** [[HELP LINK](undefined)] `Private Key detected. This is a sensitive credential and should not be hardcoded here. Instead, store this in a separate, private file.`
    - https://github.com/juice-shop/juice-shop/blob/master/lib/insecurity.js#L19-19



## Rules information
<!-- Rule Info -->
<details><summary>Rules details</summary>


    - contrib.nodejsscan.jwt_not_revoked.jwt_not_revoked [undefined] 

    > No token revoking configured for `express-jwt`. A leaked token could still be used and unable to be revoked. Consider using function as the `isRevoked` option.
,

    - javascript.angular.security.detect-third-party-angular-translate.detect-angular-translateprovider-useStrategy-method [undefined] 

    > If the $translateSanitization.useStrategy is set to null or blank this can be dangerous.
,

    - yaml.semgrep.duplicate-pattern.duplicate-pattern [undefined] 

    > Two identical pattern clauses were detected. This will cause Semgrep to run the same pattern twice. Remove one of the duplicate pattern clauses.
,

    - javascript.lang.security.audit.detect-bracket-object-injection.detect-bracket-object-injection [undefined] 

    > Detected user input used in bracket notation accessor. This could lead to object injection through $FIELD, which could grant access to every property available in the object and therefore sensitive information. Instead, avoid the use of user input in property name fields or create a whitelist of allowed input.
,

    - generic.secrets.security.detected-outlook-team.detected-outlook-team [undefined] 

    > Outlook Team detected
,

    - generic.secrets.security.detected-picatic-api-key.detected-picatic-api-key [undefined] 

    > Picatic API Key detected
,

    - generic.secrets.security.detected-sauce-token.detected-sauce-token [undefined] 

    > Sauce Token detected
,

    - generic.secrets.security.detected-twitter-access-token.detected-twitter-access-token [undefined] 

    > Twitter Access Token detected
,

    - yaml.semgrep.unsatisfiable.unsatisfiable-rule [undefined] 

    > You can not use 'pattern' $A and 'pattern-not' $A together; this will always be empty.
,

    - javascript.lang.security.audit.vm-injection.vm-sourcetextmodule-code-injection [undefined] 

    > Make sure that unverified user data can not reach vm.SourceTextModule.
,

    - html.security.missing-noreferrer.missing-noreferrer [undefined] 

    > This anchor tag with 'target="_blank"' is missing 'noreferrer'. A page opened with 'target="_blank"' can access the window object of the origin page. This means it can manipulate the 'window.opener' property, which could redirect the origin page to a malicious URL. This is called reverse tabnabbing. To prevent this, include 'rel=noreferrer' on this tag.
,

    - generic.secrets.security.detected-google-oauth.detected-google-oauth-url [undefined] 

    > Google OAuth url detected
,

    - generic.secrets.security.detected-google-api-key.detected-google-api-key [undefined] 

    > Google API Key Detected
,

    - javascript.lang.security.insecure-object-assign.insecure-object-assign [undefined] 

    > Depending on the context, user control data in `Object.assign` can cause web response to include data that it should not have or can lead to a mass assignment vulnerability.
,

    - javascript.passport-jwt.security.passport-hardcode.hardcoded-passport-secret [undefined] 

    > Hardcoded secret used for Passport Strategy. This is a Insufficiently Protected Credentials weakness: https://cwe.mitre.org/data/definitions/522.html Consider using an appropriate security mechanism to protect the credentials (e.g. keeping secrets in environment variables: process.env.SECRET)
,

    - contrib.nodejsscan.jwt_exposed_credentials.jwt_exposed_credentials [undefined] 

    > Password is exposed through JWT token payload. This is not encrypted and  the password could be compromised. Do not store passwords in JWT tokens.
,

    - generic.secrets.security.detected-google-oauth-access-token.detected-google-oauth-access-token [undefined] 

    > Google OAuth Access Token detected
,

    - yaml.semgrep.slow-pattern-single-metavariable.slow-pattern-single-metavariable [undefined] 

    > Using a single metavariable as a pattern drastically slows down the rule performance because it will match every expression in a file. Instead, try to match something specific such as a function name, or anchor on a statement that may occur above or below the pattern. The more specific you can be, the faster the pattern will run.
,

    - generic.secrets.security.detected-etc-shadow.detected-etc-shadow [undefined] 

    > linux shadow file detected
,

    - contrib.nodejsscan.jwt_exposed_data.jwt_exposed_data [undefined] 

    > The object is passed strictly to jose.JWT.sign(...). Make sure  that sensitive information is not exposed through JWT token payload.
,

    - java.java-jwt.security.jwt-hardcode.java-jwt-hardcoded-secret [undefined] 

    > Hardcoded JWT secret or private key is used. This is a Insufficiently Protected Credentials weakness: https://cwe.mitre.org/data/definitions/522.html Consider using an appropriate security mechanism to protect the credentials (e.g. keeping secrets in environment variables)
,

    - javascript.lang.security.detect-disable-mustache-escape.detect-disable-mustache-escape [undefined] 

    > Markup escaping disabled. This can be used with some template engines to escape disabling of HTML entities, which can lead to XSS attacks.
,

    - javascript.lang.correctness.useless-eqeq.eqeq-is-bad [undefined] 

    > Detected a useless comparison operation `$X == $X` or `$X != $X`. This operation is always true. If testing for floating point NaN, use `math.isnan`, or `cmath.isnan` if the number is complex.
,

    - java.java-jwt.security.jwt-none-alg.java-jwt-none-alg [undefined] 

    > Detected use of the 'none' algorithm in a JWT token. The 'none' algorithm assumes the integrity of the token has already been verified. This would allow a malicious actor to forge a JWT token that will automatically be verified. Do not explicitly use the 'none' algorithm. Instead, use an algorithm such as 'HS256'.
,

    - javascript.lang.security.detect-non-literal-require.detect-non-literal-require [undefined] 

    > Detected the use of require(variable). Calling require with a non-literal argument might allow an attacker to load an run arbitrary code, or access arbitrary files.
,

    - ruby.jwt.security.jwt-none-alg.ruby-jwt-none-alg [undefined] 

    > Detected use of the 'none' algorithm in a JWT token. The 'none' algorithm assumes the integrity of the token has already been verified. This would allow a malicious actor to forge a JWT token that will automatically be verified. Do not explicitly use the 'none' algorithm. Instead, use an algorithm such as 'HS256'.
,

    - yaml.semgrep.slow-pattern-general-function.slow-pattern-general-func [undefined] 

    > Using patterns like `function (...) {...}` is too general it will probably slow down the rule performance.
,

    - javascript.lang.correctness.useless-assign.useless-assignment [undefined] 

    > `$X` is assigned twice; the first assignment is useless
,

    - yaml.semgrep.consistency.lang-consistency-hcl.lang-consistency-hcl [undefined] 

    > Found '$X' in language config which diverges from semgrep.dev normalization. Please use 'hcl' instead.
,

    - yaml.gitlab.correctness.changes-with-when-never.changes-with-when-never [undefined] 

    > This Gitlab CI YAML will never run on default branches due to a `changes` rule with `when:never`. To fix this, make sure the triggering event is a push event. You can do this with `if: '$CI_PIPELINE_SOURCE == "push"'`. See https://docs.gitlab.com/ee/ci/yaml/index.html#ruleschanges
,

    - scala.scala-jwt.security.jwt-hardcode.scala-jwt-hardcoded-secret [undefined] 

    > Hardcoded JWT secret or private key is used. This is a Insufficiently Protected Credentials weakness: https://cwe.mitre.org/data/definitions/522.html Consider using an appropriate security mechanism to protect the credentials (e.g. keeping secrets in environment variables)
,

    - generic.secrets.security.detected-artifactory-password.detected-artifactory-password [undefined] 

    > Artifactory token detected
,

    - generic.secrets.security.detected-ssh-password.detected-ssh-password [undefined] 

    > SSH Password detected
,

    - javascript.jsonwebtoken.security.jwt-exposed-credentials.jwt-exposed-credentials [undefined] 

    > Password is exposed through JWT token payload. This is not encrypted and the password could be compromised. Do not store passwords in JWT tokens.
,

    - python.jwt.security.unverified-jwt-decode.unverified-jwt-decode [undefined] 

    > Detected JWT token decoded with 'verify=False'. This bypasses any integrity checks for the token which means the token could be tampered with by malicious actors. Ensure that the JWT token is verified.
,

    - ruby.jwt.security.audit.jwt-decode-without-verify.ruby-jwt-decode-without-verify [undefined] 

    > Detected the decoding of a JWT token without a verify step. JWT tokens must be verified before use, otherwise the token's integrity is unknown. This means a malicious actor could forge a JWT token with any claims.
,

    - generic.secrets.security.detected-pgp-private-key-block.detected-pgp-private-key-block [undefined] 

    > PGP private key block detected
,

    - generic.secrets.security.detected-mailchimp-api-key.detected-mailchimp-api-key [undefined] 

    > MailChimp API Key detected
,

    - javascript.lang.security.audit.detect-non-literal-regexp.detect-non-literal-regexp [undefined] 

    > RegExp() called with a variable, this might allow an attacker to DOS your application with a long-running regular expression.
,

    - bash.lang.correctness.unquoted-expansion.unquoted-command-substitution-in-command [undefined] 

    > The result of command substitution $(...) or `...`, if unquoted, is split on whitespace or other separators specified by the IFS variable. You should surround it with double quotes to avoid splitting the result.
,

    - javascript.lang.security.audit.vm-injection.vm-runincontext-context-injection [undefined] 

    > Make sure that unverified user data can not reach vm.runInContext.
,

    - generic.secrets.security.detected-sonarqube-docs-api-key.detected-sonarqube-docs-api-key [undefined] 

    > SonarQube Docs API Key detected
,

    - generic.secrets.security.detected-heroku-api-key.detected-heroku-api-key [undefined] 

    > Heroku API Key detected
,

    - generic.secrets.security.detected-square-access-token.detected-square-access-token [undefined] 

    > Square Access Token detected
,

    - generic.secrets.security.detected-google-gcm-service-account.detected-google-gcm-service-account [undefined] 

    > Google (GCM) Service account detected
,

    - generic.secrets.security.detected-amazon-mws-auth-token.detected-amazon-mws-auth-token [undefined] 

    > Amazon MWS Auth Token detected
,

    - generic.secrets.security.detected-snyk-api-key.detected-snyk-api-key [undefined] 

    > Snyk API Key detected
,

    - python.jwt.security.jwt-hardcode.jwt-python-hardcoded-secret [undefined] 

    > Hardcoded JWT secret or private key is used. This is a Insufficiently Protected Credentials weakness: https://cwe.mitre.org/data/definitions/522.html Consider using an appropriate security mechanism to protect the credentials (e.g. keeping secrets in environment variables)
,

    - yaml.semgrep.duplicate-id.duplicate-id [undefined] 

    > The 'id' field $X was used multiple times. The 'id' field needs to be unique.
,

    - javascript.aws-lambda.security.vm-runincontext-injection.vm-runincontext-injection [undefined] 

    > The `vm` module enables compiling and running code within V8 Virtual Machine contexts. The `vm` module is not a security mechanism. Do not use it to run untrusted code. If code passed to `vm` functions is controlled by user input it could result in command injection. Do not let user input in `vm` functions.
,

    - yaml.semgrep.consistency.lang-consistency-cpp.lang-consistency-cpp [undefined] 

    > Found '$X' in language config which diverges from semgrep.dev normalization. Please use 'cpp' instead.
,

    - bash.curl.security.curl-pipe-bash.curl-pipe-bash [undefined] 

    > Data is being piped into `bash` from a `curl` command. An attacker with control of the server in the `curl` command could inject malicious code into the pipe, resulting in a system comrpomise. Avoid piping untrusted data into `bash` or any other shell if you can. If you must do this, consider checking the SHA sum of the content returned by the server to verify its integrity.
,

    - javascript.lang.security.audit.code-string-concat.code-string-concat [undefined] 

    > User controlled data in eval() or similar functions may result in Code Injection
,

    - python.jwt.security.jwt-none-alg.jwt-python-none-alg [undefined] 

    > Detected use of the 'none' algorithm in a JWT token. The 'none' algorithm assumes the integrity of the token has already been verified. This would allow a malicious actor to forge a JWT token that will automatically be verified. Do not explicitly use the 'none' algorithm. Instead, use an algorithm such as 'HS256'.
,

    - javascript.angular.security.detect-angular-trust-as-js-method.detect-angular-trust-as-js-method [undefined] 

    > The use of $sce.trustAsJs can be dangerous if unsanitized user input flows through this API.
,

    - javascript.jsonwebtoken.security.audit.jwt-decode-without-verify.jwt-decode-without-verify [undefined] 

    > Detected the decoding of a JWT token without a verify step. JWT tokens must be verified before use, otherwise the token's integrity is unknown. This means a malicious actor could forge a JWT token with any claims. Call '.verify()' before using the token.
,

    - generic.secrets.security.detected-github-token.detected-github-token [undefined] 

    > GitHub Token detected
,

    - yaml.semgrep.consistency.lang-consistency-ts.lang-consistency-ts [undefined] 

    > Found '$X' in language config which diverges from semgrep.dev normalization. Please use 'ts' instead.
,

    - javascript.jose.security.audit.jose-exposed-data.jose-exposed-data [undefined] 

    > The object is passed strictly to jose.JWT.sign(...) Make sure that sensitive information is not exposed through JWT token payload.
,

    - javascript.lang.security.audit.detect-non-literal-fs-filename.detect-non-literal-fs-filename [undefined] 

    > A variable is present in the filename argument of fs calls, this might allow an attacker to access anything on your system.
,

    - yaml.semgrep.metadata-references.metadata-references [undefined] 

    > The references in rule metadata should always be a list, even if there's only one.
,

    - generic.secrets.security.detected-mailgun-api-key.detected-mailgun-api-key [undefined] 

    > Mailgun API Key detected
,

    - typescript.angular.security.audit.angular-domsanitizer.angular-sanitize-none-context [undefined] 

    > The output is not sanitized when calling with SecurityContext.NONE.
,

    - go.jwt-go.security.jwt-none-alg.jwt-go-none-algorithm [undefined] 

    > Detected use of the 'none' algorithm in a JWT token. The 'none' algorithm assumes the integrity of the token has already been verified. This would allow a malicious actor to forge a JWT token that will automatically be verified. Do not explicitly use the 'none' algorithm. Instead, use an algorithm such as 'HS256'.
,

    - generic.secrets.security.detected-aws-session-token.detected-aws-session-token [undefined] 

    > AWS Session Token detected
,

    - javascript.lang.security.audit.sqli.node-postgres-sqli.node-postgres-sqli [undefined] 

    > Detected string concatenation with a non-literal variable in a node-postgres JS SQL statement. This could lead to SQL injection if the variable is user-controlled and not properly sanitized. In order to prevent SQL injection, used parameterized queries or prepared statements instead. You can use parameterized statements like so: `client.query('SELECT $1 from table', [userinput])`
,

    - javascript.lang.security.audit.spawn-shell-true.spawn-shell-true [undefined] 

    > Found '$SPAWN' with '{shell: $SHELL}'. This is dangerous because this call will spawn the command using a shell process. Doing so propagates current shell settings and variables, which makes it much easier for a malicious actor to execute commands. Use '{shell: false}' instead.
,

    - python.jwt.security.audit.jwt-exposed-data.jwt-python-exposed-data [undefined] 

    > The object is passed strictly to jwt.encode(...) Make sure that sensitive information is not exposed through JWT token payload.
,

    - yaml.semgrep.missing-language-field.missing-language-field [undefined] 

    > Please include a 'languages' field for your rule!
,

    - ruby.jwt.security.jwt-exposed-credentials.ruby-jwt-exposed-credentials [undefined] 

    > Password is exposed through JWT token payload. This is not encrypted and the password could be compromised. Do not store passwords in JWT tokens.
,

    - javascript.aws-lambda.security.detect-child-process.detect-child-process [undefined] 

    > Allowing spawning arbitrary programs or running shell processes with arbitrary arguments may end up in a command injection vulnerability. Try to avoid non-literal values for the command string. If it is not possible, then do not let running arbitrary commands, use a white list for inputs.
,

    - javascript.lang.security.detect-buffer-noassert.detect-buffer-noassert [undefined] 

    > Detected usage of noassert in Buffer API, which allows the offset the be beyond the end of the buffer. This could result in writing or reading beyond the end of the buffer.
,

    - javascript.angular.security.detect-third-party-angular-translate.detect-angular-translateprovider-translations-method [undefined] 

    > The use of $translateProvider.translations method can be dangerous if user input is provided to this API.
,

    - yaml.semgrep.missing-message-field.missing-message-field [undefined] 

    > This rule does not have a message. Semgrep requires that rules have a message. Include a message to explain what the rule does. Consider writing a message that explains why this is an issue and how to fix it.
,

    - generic.secrets.security.detected-stripe-restricted-api-key.detected-stripe-restricted-api-key [undefined] 

    > Stripe Restricted API Key detected
,

    - javascript.lang.security.audit.vm-injection.vm-compilefunction-context-injection [undefined] 

    > Make sure that unverified user data can not reach vm.compileFunction.
,

    - generic.ci.security.use-frozen-lockfile.use-frozen-lockfile-npm [undefined] 

    > To ensure reproducable and deterministic builds, use `npm ci` rather than `npm install` in scripts. This will use the lockfile rather than updating it.
,

    - javascript.lang.security.audit.non-constant-sql-query.non-constant-sql-query [undefined] 

    > Non-constant SQL query detected. Ensure this is not controlled by external data, otherwise this is a SQL injection.
,

    - generic.secrets.security.detected-generic-secret.detected-generic-secret [undefined] 

    > Generic Secret detected
,

    - javascript.angular.security.detect-angular-open-redirect.detect-angular-open-redirect [undefined] 

    > Use of $window.location.href can lead to open-redirect if user input is used for redirection.
,

    - go.lang.security.audit.xss.no-interpolation-in-tag.no-interpolation-in-tag [undefined] 

    > Detected template variable interpolation in an HTML tag. This is potentially vulnerable to cross-site scripting (XSS) attacks because a malicious actor has control over HTML but without the need to use escaped characters. Use explicit tags instead.
,

    - javascript.jsonwebtoken.security.jwt-hardcode.hardcoded-jwt-secret [undefined] 

    > Hardcoded JWT secret or private key is used. This is a Insufficiently Protected Credentials weakness: https://cwe.mitre.org/data/definitions/522.html Consider using an appropriate security mechanism to protect the credentials (e.g. keeping secrets in environment variables: process.env.SECRET)
,

    - javascript.lang.security.detect-pseudorandombytes.detect-pseudoRandomBytes [undefined] 

    > Detected usage of crypto.pseudoRandomBytes, which does not produce secure random numbers.
,

    - java.java-jwt.security.audit.jwt-decode-without-verify.java-jwt-decode-without-verify [undefined] 

    > Detected the decoding of a JWT token without a verify step. JWT tokens must be verified before use, otherwise the token's integrity is unknown. This means a malicious actor could forge a JWT token with any claims. Call '.verify()' before using the token.
,

    - generic.secrets.security.detected-sendgrid-api-key.detected-sendgrid-api-key [undefined] 

    > SendGrid API Key detected
,

    - javascript.angular.security.detect-angular-trust-as-url-method.detect-angular-trust-as-url-method [undefined] 

    > The use of $sce.trustAsUrl can be dangerous if unsanitized user input flows through this API.
,

    - javascript.lang.security.detect-no-csrf-before-method-override.detect-no-csrf-before-method-override [undefined] 

    > Detected use of express.csrf() middleware before express.methodOverride(). This can allow GET requests (which are not checked by csrf) to turn into POST requests later.
,

    - javascript.angular.security.detect-angular-trust-as-resourceurl-method.detect-angular-trust-as-resourceurl-method [undefined] 

    > The use of $sce.trustAsResourceUrl can be dangerous if unsanitized user input flows through this API.
,

    - go.jwt-go.security.audit.jwt-parse-unverified.jwt-go-parse-unverified [undefined] 

    > Detected the decoding of a JWT token without a verify step. Don't use `ParseUnverified` unless you know what you're doing This method parses the token but doesn't validate the signature. It's only ever useful in cases where you know the signature is valid (because it has been checked previously in the stack) and you want to extract values from it.
,

    - java.jjwt.security.jwt-none-alg.jjwt-none-alg [undefined] 

    > Detected use of the 'none' algorithm in a JWT token. The 'none' algorithm assumes the integrity of the token has already been verified. This would allow a malicious actor to forge a JWT token that will automatically be verified. Do not explicitly use the 'none' algorithm. Instead, use an algorithm such as 'HS256'.
,

    - javascript.lang.security.audit.unknown-value-with-script-tag.unknown-value-with-script-tag [undefined] 

    > Cannot determine what '$UNK' is and it is used with a '<script>' tag. This could be susceptible to cross-site scripting (XSS). Ensure '$UNK' is not externally controlled, or sanitize this data.
,

    - bash.lang.correctness.unquoted-expansion.unquoted-variable-expansion-in-command [undefined] 

    > Variable expansions must be double-quoted so as to prevent being split into multiple pieces according to whitespace or whichever separator is specified by the IFS variable. If you really wish to split the variable's contents, you may use a variable that starts with an underscore e.g. $_X instead of $X, and semgrep will ignore it. If what you need is an array, consider using a proper bash array.
,

    - generic.secrets.security.detected-telegram-bot-api-key.detected-telegram-bot-api-key [undefined] 

    > Telegram Bot API Key detected
,

    - typescript.angular.security.audit.angular-domsanitizer.angular-bypasssecuritytrust [undefined] 

    > Bypassing the built-in sanitization could expose the application to cross-site scripting (XSS).
,

    - javascript.lang.security.audit.vm-injection.vm-runinnewcontext-context-injection [undefined] 

    > Make sure that unverified user data can not reach vm.runInNewContext.
,

    - ruby.jwt.security.audit.jwt-exposed-data.ruby-jwt-exposed-data [undefined] 

    > The object is passed strictly to jsonwebtoken.sign(...) Make sure that sensitive information is not exposed through JWT token payload.
,

    - generic.secrets.security.detected-jwt-token.detected-jwt-token [undefined] 

    > JWT token detected
,

    - generic.secrets.security.detected-npm-token.detected-npm-token [undefined] 

    > NPM token
,

    - generic.secrets.security.detected-aws-appsync-graphql-key.detected-aws-appsync-graphql-key [undefined] 

    > AWS AppSync GraphQL Key detected
,

    - javascript.lang.correctness.no-replaceall.no-replaceall [undefined] 

    > The string method replaceAll is not supported in all versions of javascript, and is not supported by older browser versions. Consider using replace() with a regex as the first argument instead like mystring.replace(/bad/g, "good") instead of mystring.replaceAll("bad", "good") (https://discourse.threejs.org/t/replaceall-is-not-a-function/14585)
,

    - javascript.lang.security.audit.sqli.node-mssql-sqli.node-mssql-sqli [undefined] 

    > Detected string concatenation with a non-literal variable in a `mssql` JS SQL statement. This could lead to SQL injection if the variable is user-controlled and not properly sanitized. In order to prevent SQL injection, used parameterized queries or prepared statements instead. You can use parameterized statements like so: `$REQ.input('USER_ID', mssql.Int, id);`
,

    - javascript.lang.security.audit.prototype-pollution.prototype-pollution-function.prototype-pollution-function [undefined] 

    > Possibility of prototype polluting function detected. By adding or modifying attributes of an object prototype, it is possible to create attributes that exist on every object, or replace critical attributes with malicious ones. This can be problematic if the software depends on existence or non-existence of certain attributes, or uses pre-defined attributes of object prototype (such as hasOwnProperty, toString or valueOf). Possible mitigations might be: freezing the object prototype, using an object without prototypes (via Object.create(null) ), blocking modifications of attributes that resolve to object prototype, using Map instead of object.
,

    - yaml.semgrep.consistency.lang-consistency-solidity.lang-consistency-solidity [undefined] 

    > Found '$X' in language config which diverges from semgrep.dev normalization. Please use 'solidity' instead.
,

    - generic.secrets.security.detected-artifactory-token.detected-artifactory-token [undefined] 

    > Artifactory token detected
,

    - generic.ci.security.use-frozen-lockfile.use-frozen-lockfile-yarn [undefined] 

    > To ensure reproducable and deterministic builds, when performing yarn install, make sure to use the lockfile. Without `--frozen-lockfile`, yarn will update the lockfile rather than using the pinned versions.
,

    - contrib.nodejsscan.jwt_express_hardcoded.jwt_express_hardcoded [undefined] 

    > Hardcoded JWT secret or private key was found. Store it properly in  an environment variable.
,

    - javascript.angular.security.detect-angular-trust-as-method.detect-angular-trust-as-method [undefined] 

    > The use of $sce.trustAs can be dangerous if unsanitized user input flows through this API.
,

    - generic.secrets.security.detected-facebook-access-token.detected-facebook-access-token [undefined] 

    > Facebook Access Token detected
,

    - yaml.semgrep.consistency.lang-consistency-js.lang-consistency-js [undefined] 

    > Found '$X' in language config which diverges from semgrep.dev normalization. Please use 'js' instead.
,

    - javascript.lang.security.audit.incomplete-sanitization.incomplete-sanitization [undefined] 

    > `$STR.replace` method will only replace the first occurence when used with a string argument ($CHAR). If this method is used for escaping of dangerous data then there is a possibility for a bypass. Try to use sanitization library instead or use a Regex with a global flag.
,

    - generic.secrets.security.detected-bcrypt-hash.detected-bcrypt-hash [undefined] 

    > bcrypt hash detected
,

    - generic.secrets.security.detected-generic-api-key.detected-generic-api-key [undefined] 

    > Generic API Key detected
,

    - javascript.lang.security.audit.sqli.node-knex-sqli.node-knex-sqli [undefined] 

    > Detected tainted SQL statement. This could lead to SQL injection if the variable is user-controlled and not properly sanitized. In order to prevent SQL injection, used parameterized queries or prepared statements instead. You can use parameterized statements like so: `knex.raw('SELECT $1 from table', [userinput])`
,

    - javascript.lang.security.audit.path-traversal.path-join-resolve-traversal.path-join-resolve-traversal [undefined] 

    > Possible writing outside of the destination, make sure that the target path is nested in the intended destination
,

    - yaml.semgrep.consistency.lang-consistency-csharp.lang-consistency-csharp [undefined] 

    > Found '$X' in language config which diverges from semgrep.dev normalization. Please use 'csharp' instead.
,

    - generic.secrets.security.detected-slack-token.detected-slack-token [undefined] 

    > Slack Token detected
,

    - contrib.nodejsscan.jwt_none_algorithm.node_jwt_none_algorithm [undefined] 

    > Algorithm is set to none for JWT token. This can nullify the integrity of JWT signature.
,

    - javascript.lang.security.audit.vm-injection.vm-runincontext-code-injection [undefined] 

    > Make sure that unverified user data can not reach vm.runInContext.
,

    - generic.ci.security.use-frozen-lockfile.use-frozen-lockfile-pip [undefined] 

    > To ensure reproducable and deterministic builds, use `pip install --ignore-pipfile` rather than `pip install` in scripts. This will use the lockfile rather than updating it.
,

    - python.jwt.security.jwt-exposed-credentials.jwt-python-exposed-credentials [undefined] 

    > Password is exposed through JWT token payload. This is not encrypted and the password could be compromised. Do not store passwords in JWT tokens.
,

    - bash.curl.security.curl-eval.curl-eval [undefined] 

    > Data is being eval'd from a `curl` command. An attacker with control of the server in the `curl` command could inject malicious code into the `eval`, resulting in a system comrpomise. Avoid eval'ing untrusted data if you can. If you must do this, consider checking the SHA sum of the content returned by the server to verify its integrity.
,

    - javascript.jsonwebtoken.security.audit.jwt-exposed-data.jwt-exposed-data [undefined] 

    > The object is passed strictly to jsonwebtoken.sign(...) Make sure that sensitive information is not exposed through JWT token payload.
,

    - generic.secrets.security.detected-slack-webhook.detected-slack-webhook [undefined] 

    > Slack Webhook detected
,

    - go.jwt-go.security.jwt.hardcoded-jwt-key [undefined] 

    > JWT token is hardcoded
,

    - javascript.lang.security.audit.sqli.node-mysql-sqli.node-mysql-sqli [undefined] 

    > Detected tainted SQL statement. This could lead to SQL injection if the variable is user-controlled and not properly sanitized. In order to prevent SQL injection, used parameterized queries or prepared statements instead. You can use parameterized statements like so: `connection.query('SELECT $1 from table', [userinput])`
,

    - javascript.jose.security.jwt-none-alg.jwt-none-alg [undefined] 

    > Detected use of the 'none' algorithm in a JWT token. The 'none' algorithm assumes the integrity of the token has already been verified. This would allow a malicious actor to forge a JWT token that will automatically be verified. Do not explicitly use the 'none' algorithm. Instead, use an algorithm such as 'HS256'.
,

    - yaml.github-actions.security.curl-eval.curl-eval [undefined] 

    > Data is being eval'd from a `curl` command. An attacker with control of the server in the `curl` command could inject malicious code into the `eval`, resulting in a system comrpomise. Avoid eval'ing untrusted data if you can. If you must do this, consider checking the SHA sum of the content returned by the server to verify its integrity.
,

    - yaml.semgrep.consistency.lang-consistency-elixir.lang-consistency-elixir [undefined] 

    > Found '$X' in language config which diverges from semgrep.dev normalization. Please use 'elixir' instead.
,

    - generic.secrets.security.detected-google-cloud-api-key.detected-google-cloud-api-key [undefined] 

    > Google Cloud API Key detected
,

    - python.sh.security.string-concat.string-concat [undefined] 

    > Detected string concatenation or formatting in a call to a command via 'sh'. This could be a command injection vulnerability if the data is user-controlled. Instead, use a list and append the argument.
,

    - javascript.lang.security.audit.unsafe-dynamic-method.unsafe-dynamic-method [undefined] 

    > Using non-static data to retrieve and run functions from the object is dangerous. If the data is user-controlled, it may allow executing arbitrary code.
,

    - javascript.lang.security.detect-child-process.detect-child-process [undefined] 

    > Detected non-literal calls to $EXEC(). This could lead to a command injection vulnerability.
,

    - yaml.semgrep.consistency.lang-consistency-bash.lang-consistency-bash [undefined] 

    > Found '$X' in language config which diverges from semgrep.dev normalization. Please use 'bash' instead.
,

    - yaml.semgrep.consistency.lang-consistency-python.lang-consistency-python [undefined] 

    > Found '$X' in language config which diverges from semgrep.dev normalization. Please use 'python' instead.
,

    - go.lang.security.audit.xss.no-interpolation-js-template-string.no-interpolation-js-template-string [undefined] 

    > Detected template variable interpolation in a JavaScript template string. This is potentially vulnerable to cross-site scripting (XSS) attacks because a malicious actor has control over JavaScript but without the need to use escaped characters. Instead, obtain this variable outside of the template string and ensure your template is properly escaped.
,

    - javascript.dompurify.harden-dompurify-usage [undefined] 

    > DOMPurify.sanitize() was called without using RETURN_DOM or RETURN_DOM_FRAGMENT. This is prone to mutation XSS, which could possibly bypass existing XSS filters. Adding one of these options will harden against potential future DOMPurify exploits.
,

    - yaml.semgrep.consistency.lang-consistency-go.lang-consistency-go [undefined] 

    > Found '$X' in language config which diverges from semgrep.dev normalization. Please use 'go' instead.
,

    - javascript.jose.security.jwt-hardcode.hardcoded-jwt-secret [undefined] 

    > Hardcoded JWT secret or private key is used. This is a Insufficiently Protected Credentials weakness: https://cwe.mitre.org/data/definitions/522.html Consider using an appropriate security mechanism to protect the credentials (e.g. keeping secrets in environment variables: process.env.SECRET)
,

    - yaml.semgrep.slow-pattern-general-property.slow-pattern-general-property [undefined] 

    > Using patterns like `$X.$Y` may be too general and may slow down the rule performance.
,

    - html.security.missing-noopener.missing-noopener [undefined] 

    > This anchor tag with 'target="_blank"' is missing 'noopener'. A page opened with 'target="_blank"' can access the window object of the origin page. This means it can manipulate the 'window.opener' property, which could redirect the origin page to a malicious URL. This is called reverse tabnabbing. To prevent this, include 'rel=noopener' on this tag
,

    - generic.secrets.security.detected-private-key.detected-private-key [undefined] 

    > Private Key detected. This is a sensitive credential and should not be hardcoded here. Instead, store this in a separate, private file.
,

    - generic.secrets.security.detected-npm-registry-auth-token.detected-npm-registry-auth-token [undefined] 

    > NPM registry authentication token detected
,

    - yaml.semgrep.consistency.lang-consistency-dockerfile.lang-consistency-dockerfile [undefined] 

    > Found '$X' in language config which diverges from semgrep.dev normalization. Please use 'dockerfile' instead.
,

    - javascript.angular.security.detect-angular-sce-disabled.detect-angular-sce-disabled [undefined] 

    > $sceProvider is set to false. Disabling Strict Contextual escaping (SCE) in an AngularJS application could provide additional attack surface for XSS vulnerabilities.
,

    - javascript.lang.security.spawn-git-clone.spawn-git-clone [undefined] 

    > Git allows shell commands to be specified in ext URLs for remote repositories. For example, git clone 'ext::sh -c whoami% >&2' will execute the whoami command to try to connect to a remote repository. Make sure that the URL is not controlled by external input.
,

    - javascript.lang.security.audit.prototype-pollution.prototype-pollution-assignment.prototype-pollution-assignment [undefined] 

    > Possibility of prototype polluting assignment detected. By adding or modifying attributes of an object prototype, it is possible to create attributes that exist on every object, or replace critical attributes with malicious ones. This can be problematic if the software depends on existence or non-existence of certain attributes, or uses pre-defined attributes of object prototype (such as hasOwnProperty, toString or valueOf). Possible mitigations might be: freezing the object prototype, using an object without prototypes (via Object.create(null) ), blocking modifications of attributes that resolve to object prototype, using Map instead of object.
,

    - generic.secrets.security.detected-facebook-oauth.detected-facebook-oauth [undefined] 

    > Facebook OAuth detected
,

    - javascript.angular.security.detect-angular-trust-as-html-method.detect-angular-trust-as-html-method [undefined] 

    > The use of $sce.trustAsHtml can be dangerous if unsanitized user input flows through this API.
,

    - generic.secrets.security.detected-codeclimate.detected-codeclimate [undefined] 

    > CodeClimate detected
,

    - javascript.angular.security.detect-angular-trust-as-css.detect-angular-trust-as-css-method [undefined] 

    > The use of $sce.trustAsCss can be dangerous if unsanitized user input flows through this API.
,

    - javascript.jose.security.jwt-exposed-credentials.jwt-exposed-credentials [undefined] 

    > Password is exposed through JWT token payload. This is not encrypted and the password could be compromised. Do not store passwords in JWT tokens.
,

    - generic.secrets.security.detected-kolide-api-key.detected-kolide-api-key [undefined] 

    > Kolide API Key detected
,

    - generic.secrets.security.detected-stripe-api-key.detected-stripe-api-key [undefined] 

    > Stripe API Key detected
,

    - javascript.angular.security.detect-angular-element-methods.detect-angular-element-methods [undefined] 

    > Use of angular.element can lead to XSS if after,append,html,prepend,replaceWith,wrap are used with user-input.
,

    - generic.ci.security.use-frozen-lockfile.use-frozen-lockfile-pipenv [undefined] 

    > To ensure reproducable and deterministic builds, use `pipenv install --ignore-pipfile` rather than `pipenv install` in scripts. This will use the lockfile rather than updating it.
,

    - contrib.nodejsscan.jwt_hardcoded.hardcoded_jwt_secret [undefined] 

    > Hardcoded JWT secret was found. Store it properly in an environment variable.
,

    - javascript.lang.security.audit.vm-injection.vm-script-code-injection [undefined] 

    > Make sure that unverified user data can not reach vm.Script.
,

    - generic.secrets.security.detected-aws-secret-access-key.detected-aws-secret-access-key [undefined] 

    > AWS Secret Access Key detected
,

    - javascript.aws-lambda.security.tainted-eval.tainted-eval [undefined] 

    > The `eval()` function evaluates JavaScript code represented as a string. Executing JavaScript from a string is an enormous security risk. It is far too easy for a bad actor to run arbitrary code when you use `eval()`. Ensure evaluated content is not definable by external sources.
,

    - generic.secrets.security.detected-aws-account-id.detected-aws-account-id [undefined] 

    > AWS Account ID detected. This is a sensitive credential and should not be hardcoded here. Instead, read the value from an environment variable or keep the value in a separate, private file.
,

    - generic.secrets.security.detected-aws-access-key-id-value.detected-aws-access-key-id-value [undefined] 

    > AWS Access Key ID Value detected. This is a sensitive credential and should not be hardcoded here. Instead, read this value from an environment variable or keep it in a separate, private file.
,

    - javascript.jsonwebtoken.security.jwt-none-alg.jwt-none-alg [undefined] 

    > Detected use of the 'none' algorithm in a JWT token. The 'none' algorithm assumes the integrity of the token has already been verified. This would allow a malicious actor to forge a JWT token that will automatically be verified. Do not explicitly use the 'none' algorithm. Instead, use an algorithm such as 'HS256'.
,

    - javascript.lang.security.audit.dangerous-spawn-shell.dangerous-spawn-shell [undefined] 

    > Detected non-literal calls to $EXEC(). This could lead to a command injection vulnerability.
,

    - yaml.semgrep.consistency.lang-consistency-kotlin.lang-consistency-kotlin [undefined] 

    > Found '$X' in language config which diverges from semgrep.dev normalization. Please use 'kotlin' instead.
,

    - javascript.lang.security.audit.md5-used-as-password.md5-used-as-password [undefined] 

    > It looks like MD5 is used as a password hash. MD5 is not considered a secure password hash because it can be cracked by an attacker in a short amount of time. Use a suitable password hashing function such as bcrypt. You can use the `bcrypt` node.js package.
,

    - html.security.audit.missing-integrity.missing-integrity [undefined] 

    > This tag is missing an 'integrity' subresource integrity attribute. The 'integrity' attribute allows for the browser to verify that externally hosted files (for example from a CDN) are delivered without unexpected manipulation. Without this attribute, if an attacker can modify the externally hosted resource, this could lead to XSS and other types of attacks. To prevent this, include the base64-encoded cryptographic hash of the resource (file) you’re telling the browser to fetch in the 'integrity' attribute for all externally hosted files.
,

    - javascript.lang.security.audit.vm-injection.vm-compilefunction-code-injection [undefined] 

    > Make sure that unverified user data can not reach vm.compileFunction.
,

    - generic.secrets.security.detected-twitter-oauth.detected-twitter-oauth [undefined] 

    > Twitter OAuth detected
,

    - yaml.semgrep.multi-line-message.multi-line-message [undefined] 

    > This rule has a multi-line message field, which may display poorly in a terminal. Consider ensuring it is on one line. For example, use `message: >-`, not `message: |`.
,

    - generic.secrets.security.detected-paypal-braintree-access-token.detected-paypal-braintree-access-token [undefined] 

    > PayPal Braintree Access Token detected
,

    - generic.secrets.security.detected-square-oauth-secret.detected-square-oauth-secret [undefined] 

    > Square OAuth Secret detected
,

    - javascript.lang.security.audit.vm-injection.vm-runinthiscontext-code-injection [undefined] 

    > Make sure that unverified user data can not reach vm.runInThisContext.
,

    - ruby.jwt.security.jwt-hardcode.ruby-jwt-hardcoded-secret [undefined] 

    > Hardcoded JWT secret or private key is used. This is a Insufficiently Protected Credentials weakness: https://cwe.mitre.org/data/definitions/522.html Consider using an appropriate security mechanism to protect the credentials (e.g. keeping secrets in environment variables)
,

    - generic.secrets.security.detected-username-and-password-in-uri.detected-username-and-password-in-uri [undefined] 

    > Username and password in URI detected
,

    - generic.secrets.security.detected-twilio-api-key.detected-twilio-api-key [undefined] 

    > Twilio API Key detected
,

    - generic.secrets.security.detected-sql-dump.detected-sql-dump [undefined] 

    > SQL dump detected
,

    - javascript.lang.security.audit.unsafe-formatstring.unsafe-formatstring [undefined] 

    > Detected string concatenation with a non-literal variable in a util.format / console.log function. If an attacker injects a format specifier in the string, it will forge the log message. Try to use constant values for the format string.
,

    - generic.secrets.security.detected-hockeyapp.detected-hockeyapp [undefined] 

    > HockeyApp detected
,

    - yaml.semgrep.consistency.lang-consistency-regex.lang-consistency-regex [undefined] 

    > Found '$X' in language config which diverges from semgrep.dev normalization. Please use 'regex' instead.
,

    - bash.lang.security.ifs-tampering.ifs-tampering [undefined] 

    > The special variable IFS affects how splitting takes place when expanding unquoted variables. Don't set it globally. Prefer a dedicated utility such as 'cut' or 'awk' if you need to split input data. If you must use 'read', set IFS locally using e.g. 'IFS="," read -a my_array'.
,

    - javascript.lang.security.detect-eval-with-expression.detect-eval-with-expression [undefined] 

    > Detected eval(variable), which could allow a malicious actor to run arbitrary code.
,

    - yaml.semgrep.empty-message.empty-message [undefined] 

    > This rule has an empty message field. Consider adding a message field that communicates why this rule is an issue and how to fix it. This will increase the chance that the finding gets addressed.
,

    - javascript.lang.security.audit.vm-injection.vm-runinnewcontext-code-injection [undefined] 

    > Make sure that unverified user data can not reach vm.runInNewContext.
,

    - yaml.semgrep.slow-pattern-top-ellipsis.slow-pattern-top-ellipsis [undefined] 

    > Using the ellipsis operator `...` at the top of the pattern drastically slows down the rule performance.
,

    - javascript.angular.security.detect-angular-resource-loading.detect-angular-resource-loading [undefined] 

    > $sceDelegateProvider allowlisting can introduce security issues if wildcards are used.
,

    - javascript.lang.security.audit.prototype-pollution.prototype-pollution-loop.prototype-pollution-loop [undefined] 

    > Possibility of prototype polluting function detected. By adding or modifying attributes of an object prototype, it is possible to create attributes that exist on every object, or replace critical attributes with malicious ones. This can be problematic if the software depends on existence or non-existence of certain attributes, or uses pre-defined attributes of object prototype (such as hasOwnProperty, toString or valueOf). Possible mitigations might be: freezing the object prototype, using an object without prototypes (via Object.create(null) ), blocking modifications of attributes that resolve to object prototype, using Map instead of object.
,

    - generic.secrets.security.detected-softlayer-api-key.detected-softlayer-api-key [undefined] 

    > SoftLayer API Key detected
,

    - python.docker.security.audit.docker-arbitrary-container-run.docker-arbitrary-container-run [undefined] 

    > If unverified user data can reach the `run` or `create` method it can result in running arbitrary container.


## Tool information
- Name: semgrep
- Organization: undefined
- Version: 0.87.0
