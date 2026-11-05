# getlovebirds.app

The Love Birds website, built with [Astro](https://astro.build) (static pages, no server) and served by GitHub Pages.

| Address | Source |
|---|---|
| `/` home page | `src/pages/index.astro` |
| `/invite/#c=CODE&n=NAME` the page your partner sees when they tap your link. The code and name sit after the `#`, so they stay in the browser and never reach the site. Not in search results. | `src/pages/invite/index.astro` |
| `/privacy/` the privacy policy (contact gustifferbuilds@gmail.com) | `src/pages/privacy/index.astro` |
| `/support/` the help page (App Store Connect's support URL) | `src/pages/support/index.astro` |
| `/blog/` and `/blog/<slug>/` the blog | `src/pages/blog/`, posts in `src/content/blog/<slug>.md` |
| 404 page | `src/pages/404.astro` |
| `/.well-known/apple-app-site-association` tells iPhones that `/invite` links belong to the app | `public/.well-known/` |
| `/robots.txt`, `/llms.txt`, `/sitemap-index.xml`, the IndexNow key file | `public/`; the sitemap is generated |

Every page shares `src/layouts/Base.astro` (head tags, canonical address, link preview, structured data, footer). Posts use `src/layouts/Post.astro`. Settings that change over time live in **`src/data/site.ts`**:
- `appLive`: set to `true` once Love Birds is on the App Store. The "Get Love Birds" buttons then go to the store instead of saying "coming soon", and Safari shows the app banner.
- `campaignProvider`: the provider token from App Store Connect (App Analytics, Campaigns), so each blog post's button is counted separately.

The art is the app's own sprites (`design/tools/web_art.py` rebuilds the flying dove and the link-preview image), in `public/assets/`. Text uses the device's rounded system font, like the app.

## Blog posts

One markdown file per post: `src/content/blog/<slug>.md`. The frontmatter rules are in `src/content.config.ts` (title up to 60 characters, description up to 155, keyword, dates, author from `src/data/authors.json`, optional FAQ and how-to steps, and the closing line `cta`). A post that breaks them fails the build, so it can't go live. The layout adds the questions section, the closing App Store button, the author note, structured data and the sitemap entry. The blog link appears in the footer once the first post is live.

Posts are written by the SEO commands in the Love Birds project (`seo/README.md`, `/seo-research` → `/seo-pipeline`).

## Work on it

```bash
npm --prefix web install      # once
npm --prefix web run dev      # live preview at http://localhost:4321
npm --prefix web run build    # writes dist/; run before every push
```

## Put it online

Pushing to `main` publishes: GitHub Actions (`.github/workflows/deploy.yml`) builds the site and deploys it to GitHub Pages in a minute or two.

```bash
git -C web add -A && git -C web commit -m "Update site" && git -C web push
```

The domain was bought Nov 5, 2026 at Porkbun (auto-renew on). Its DNS has four A records for the bare domain (`185.199.108.153` through `185.199.111.153`, GitHub Pages) and a `www` CNAME to `gtiffer.github.io`. GitHub Pages' settings hold the custom domain (`public/CNAME` matches it; don't delete it). HTTPS is enforced. The old address, https://gtiffer.github.io/lovebirds-site/, forwards here.

The app-link file is served as `application/octet-stream` (GitHub Pages can't set headers); check it with Apple's validator when turning on universal links.

## Before launch

- [x] Team ID (Q9697F9J5Q) is in `public/.well-known/apple-app-site-association`.
- [x] The app's `Links.site` (`LoveBirds/Settings/SettingsView.swift`) is `https://getlovebirds.app` (Nov 5; ships in the next build).
- [ ] App Store Connect's privacy and support URLs: change them to `https://getlovebirds.app/privacy/` and `/support/` (the old address forwards until then).
- [ ] In Xcode, add the Associated Domains capability with `applinks:getlovebirds.app`, so invite links open the app when it's installed.
- [ ] In `Shared/Pairing.swift`, set `InviteLink.useWebLink = true` so invites share the web link.
- [ ] Once the app is listed, set `appLive: true` in `src/data/site.ts`.
- [ ] Google Search Console (Domain property, TXT record in Porkbun), submit `https://getlovebirds.app/sitemap-index.xml`; then Bing Webmaster Tools (import from Search Console).
