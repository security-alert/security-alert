# Report
## Results

- **[ERROR]** **[generic.secrets.security.detected-bcrypt-hash.detected-bcrypt-hash]** [[HELP LINK](https://semgrep.dev/r/generic.secrets.security.detected-bcrypt-hash.detected-bcrypt-hash)] `bcrypt hash detected`
    - https://github.com/juice-shop/juice-shop/blob/master/src/main/java/com/fake/fakeapp/Application.java#L26-L26
- **[WARNING]** **[mobsf.mobsfscan.command_injection_formated.command_injection_warning]** [[HELP LINK](https://semgrep.dev/r/mobsf.mobsfscan.command_injection_formated.command_injection_warning)] `A formatted or concatenated string was detected as input to a java.lang.Runtime call. This is dangerous if a variable is controlled by user input and could result in a command injection. Ensure your variables are not controlled by users or sufficiently sanitized.
`
    - https://github.com/juice-shop/juice-shop/blob/master/src/main/java/com/fake/fakeapp/Application.java#L30-L30
    - https://github.com/juice-shop/juice-shop/blob/master/src/main/java/com/fake/fakeapp/Application.java#L31-L31
- **[ERROR]** **[java.lang.security.audit.command-injection-formatted-runtime-call.command-injection-formatted-runtime-call]** [[HELP LINK](https://semgrep.dev/r/java.lang.security.audit.command-injection-formatted-runtime-call.command-injection-formatted-runtime-call)] `A formatted or concatenated string was detected as input to a java.lang.Runtime call. This is dangerous if a variable is controlled by user input and could result in a command injection. Ensure your variables are not controlled by users or sufficiently sanitized.`
    - https://github.com/juice-shop/juice-shop/blob/master/src/main/java/com/fake/fakeapp/Application.java#L30-L30
    - https://github.com/juice-shop/juice-shop/blob/master/src/main/java/com/fake/fakeapp/Application.java#L31-L31



## Suppressed results

- **[ERROR]** **[generic.secrets.security.detected-bcrypt-hash.detected-bcrypt-hash]** [[HELP LINK](https://semgrep.dev/r/generic.secrets.security.detected-bcrypt-hash.detected-bcrypt-hash)] `bcrypt hash detected`
    - https://github.com/juice-shop/juice-shop/blob/master/src/main/java/com/fake/fakeapp/Application.java#L27-L27



