import { z, defineCollection } from 'astro:content';

const teams = defineCollection({
  type: 'content',
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
  type: 'content',
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
  type: 'content',
  schema: z.object({
    name: z.string(),
    tier: z.enum(['platinum', 'gold', 'silver', 'bronze']),
    logo: z.string(),
    website: z.string().url().optional(),
    description: z.string().optional(),
    startDate: z.string(),
    endDate: z.string().optional(),
    active: z.boolean().default(true),
    featured: z.boolean().default(false),
    testimonial: z.string().optional(),
  }),
});

export const collections = { teams, news, sponsors }; 