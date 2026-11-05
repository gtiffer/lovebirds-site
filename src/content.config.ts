// Blog posts: one markdown file per post in src/content/blog/<slug>.md.
// The build fails if a post's frontmatter breaks these rules, so a bad post
// never goes live. seo/ (the SEO agent's files) writes posts in this shape.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import authors from './data/authors.json';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(10).max(60),          // the H1 and the <title>
    description: z.string().min(50).max(155),   // the meta description
    keyword: z.string(),                        // the search the post is written for
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),    // set when a post is improved; pubDate never changes
    author: z.enum(Object.keys(authors) as [string, ...string[]]),
    hero: z.string().startsWith('/blog/heroes/').optional(),
    heroAlt: z.string().optional(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
    howToSteps: z.array(z.string()).optional(), // only for genuinely step-by-step posts
    cta: z.string(),                            // the closing line above the App Store button
    draft: z.boolean().default(false),
  }).refine((post) => !post.hero || post.heroAlt, { message: 'A post with a hero image needs heroAlt.' }),
});

export const collections = { blog };
