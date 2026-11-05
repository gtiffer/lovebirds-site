// The Love Birds website. `npm run build` writes the site to dist/; GitHub Actions
// builds and deploys it on every push to main (.github/workflows/deploy.yml).
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// The blog index joins the sitemap once at least one post is live.
const livePosts = readdirSync('./src/content/blog')
  .filter((f) => f.endsWith('.md'))
  .filter((f) => !/^draft:\s*true\s*$/m.test(readFileSync(`./src/content/blog/${f}`, 'utf8')));

export default defineConfig({
  site: 'https://getlovebirds.app',
  // Every address ends in a slash, matching how GitHub Pages serves folders,
  // so the sitemap, canonical tags and served URLs always agree.
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/invite/') &&
        !page.includes('/404') &&
        (livePosts.length > 0 || !page.endsWith('/blog/')),
    }),
  ],
});
