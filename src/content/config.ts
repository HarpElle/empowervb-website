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
    date: z.date(),
    author: z.string().default('Empower VB Staff'),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
  }),
});

export const collections = { teams, news }; 