import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const teams = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/teams' }),
  schema: z.object({
    title: z.string(),
    ageGroup: z.string(),
    season: z.string(),
    coach: z.string().optional(),
    status: z.enum(['forming', 'active', 'complete']),
    description: z.string(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    author: z.string().default('Empower VB Staff'),
    excerpt: z.string().optional(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
  }),
});

const sponsors = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/sponsors' }),
  schema: z.object({
    name: z.string(),
    tier: z.enum(['platinum', 'gold', 'silver', 'bronze']),
    logo: z.string(),
    website: z.url().optional(),
    description: z.string().optional(),
    startDate: z.string(),
    endDate: z.string().optional(),
    active: z.boolean().default(true),
    featured: z.boolean().default(false),
    testimonial: z.string().optional(),
  }),
});

export const collections = { teams, news, sponsors };
