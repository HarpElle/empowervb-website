// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://empowervb.com',
  integrations: [
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
      cssMinify: 'esbuild',
    },
  },
});