# getlovebirds.app

The Love Birds website: plain files, no server.

- `/` home page
- `/invite#c=CODE&n=NAME` the invite page your partner sees when they tap your link. The code and name sit after the `#`, so they stay in the browser and never reach the site.
- `/privacy/` the privacy policy (updated Oct 20 for RevenueCat; contact gustifferbuilds@gmail.com)
- `/support/` the help page (App Store Connect's support URL)
- `/.well-known/apple-app-site-association` tells iPhones that `/invite` links belong to the app
- `_headers` makes that file load as JSON; `404.html` for missing pages

The art is the app's own sprites (`design/tools/web_art.py` rebuilds the flying dove and the link-preview image). Text uses the device's rounded system font, like the app.

## Put it online (GitHub Pages)

The site lives at **https://getlovebirds.app**, served by GitHub Pages. The domain was bought Nov 5, 2026 at Porkbun (auto-renew on). Its DNS has four A records for the bare domain (`185.199.108.153` through `185.199.111.153`, GitHub Pages) and a `www` CNAME to `gtiffer.github.io`. The `CNAME` file in this folder tells GitHub Pages the domain; don't delete it. The old address, https://gtiffer.github.io/lovebirds-site/, forwards here.

This folder is its own git repo: **https://github.com/gtiffer/lovebirds-site** (published Oct 20, 2026; Pages deploys from `main`, root). To update the live site, commit and push from here:

```bash
git -C web add -A && git -C web commit -m "Update site" && git -C web push
```

GitHub rebuilds in a minute or two. These should load:
   - https://getlovebirds.app/privacy/
   - https://getlovebirds.app/support/

Every page links to its assets with relative paths. The one exception is `404.html`, which GitHub serves at any depth, so it uses root paths (`/assets/...`). GitHub Pages ignores `_headers` (it's for hosts like Cloudflare Pages), so `.well-known/apple-app-site-association` is served as `application/octet-stream`; check it with Apple's validator when turning on universal links.

## Before launch

- [x] Team ID (Q9697F9J5Q) is in `.well-known/apple-app-site-association`.
- [x] The app's `Links.site` (`LoveBirds/Settings/SettingsView.swift`) is `https://getlovebirds.app` (Nov 5; ships in the next build).
- [ ] App Store Connect's privacy and support URLs: change them to `https://getlovebirds.app/privacy/` and `/support/` (the old address forwards until then).
- [ ] In Xcode, add the Associated Domains capability with `applinks:getlovebirds.app`, so invite links open the app when it's installed.
- [ ] In `Shared/Pairing.swift`, set `InviteLink.useWebLink = true` so invites share the web link.
- [ ] Once the app is listed, put its App Store ID in `assets/site.js` (and, if you like, the Safari banner tag noted in `invite/index.html`).
- [ ] Review the privacy policy, set its date, and add its URL in App Store Connect.
