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

Until a domain is bought, the site lives at **https://gtiffer.github.io/lovebirds-site/** (the app's `Links.site` points there), the same way the Froggy site is hosted.

This folder is its own git repo: **https://github.com/gtiffer/lovebirds-site** (published Oct 20, 2026; Pages deploys from `main`, root). To update the live site, commit and push from here:

```bash
git -C web add -A && git -C web commit -m "Update site" && git -C web push
```

GitHub rebuilds in a minute or two. These should load:
   - https://gtiffer.github.io/lovebirds-site/privacy/
   - https://gtiffer.github.io/lovebirds-site/support/

Every page links to its assets with relative paths, so the site works under `/lovebirds-site/` and later at a domain root. The one exception is `404.html`, which GitHub serves at any depth, so it uses `/lovebirds-site/...` paths; change those if the site moves to its own domain. `_headers` and `.well-known/apple-app-site-association` only matter on a custom domain (universal invite links need the file at the domain root), so they're ignored on GitHub Pages.

### Later: getlovebirds.app

Buy the domain, point it at GitHub Pages (or Cloudflare Pages), update `Links.site` in the app and the og: URLs in `index.html` and `invite/index.html`, then follow "Before launch" below for universal links.

## Before launch

- [x] Team ID (Q9697F9J5Q) is in `.well-known/apple-app-site-association`.
- [ ] In Xcode, add the Associated Domains capability with `applinks:getlovebirds.app`, so invite links open the app when it's installed.
- [ ] In `Shared/Pairing.swift`, set `InviteLink.useWebLink = true` so invites share the web link.
- [ ] Once the app is listed, put its App Store ID in `assets/site.js` (and, if you like, the Safari banner tag noted in `invite/index.html`).
- [ ] Review the privacy policy, set its date, and add its URL in App Store Connect.
