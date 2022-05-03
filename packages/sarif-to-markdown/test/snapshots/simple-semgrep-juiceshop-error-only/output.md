# Report
## Results

- **[ERROR]** **[generic.secrets.security.detected-private-key.detected-private-key]**  `Private Key detected. This is a sensitive credential and should not be hardcoded here. Instead, store this in a separate, private file.`
- **[ERROR]** **[generic.secrets.security.detected-generic-secret.detected-generic-secret]**  `Generic Secret detected`
    - https://github.com/juice-shop/juice-shop/blob/master/data/static/users.yml#L150-150
- **[ERROR]** **[contrib.nodejsscan.jwt_hardcoded.hardcoded_jwt_secret]**  `Hardcoded JWT secret was found. Store it properly in an environment variable.`
    - https://github.com/juice-shop/juice-shop/blob/master/lib/insecurity.js#L9-34
- **[ERROR]** **[javascript.jsonwebtoken.security.jwt-hardcode.hardcoded-jwt-secret]**  `Hardcoded JWT secret or private key is used. This is a Insufficiently Protected Credentials weakness: https:\/\/cwe.mitre.org\/data\/definitions\/522.html Consider using an appropriate security mechanism to protect the credentials \(e.g. keeping secrets in environment variables: process.env.SECRET\)`
    - https://github.com/juice-shop/juice-shop/blob/master/lib/insecurity.js#L34-34
    - https://github.com/juice-shop/juice-shop/blob/master/lib/insecurity.js#L34-34



## Suppressed results

- **[ERROR]** **[generic.secrets.security.detected-private-key.detected-private-key]**  `Private Key detected. This is a sensitive credential and should not be hardcoded here. Instead, store this in a separate, private file.`
    - https://github.com/juice-shop/juice-shop/blob/master/lib/insecurity.js#L19-19



