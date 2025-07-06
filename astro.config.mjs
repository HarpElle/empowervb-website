// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://empowervb.com',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => {
        // Exclude news-future page from sitemap
        return !page.includes('news-future');
      }
    })
  ],
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssCodeSplit: false,
    },
  },
});