# Steps to Send Email

- Sign out of all Gmail accounts
- Log in to Sender Email
    - Email: `testing.service.1234567@gmail.com`
    - Password: `N3scIANPv2Q4`
- Turn on [Less Secure App Access](https://myaccount.google.com/lesssecureapps)
- [Allow Account Access](https://accounts.google.com/DisplayUnlockCaptcha)
- Run `./mvnw sprint-boot:run`
- Send `{ email, title, body }` as query params to `/send-mail`