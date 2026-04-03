import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

import partytown from '@astrojs/partytown';

// ... tus otros imports

export default defineConfig({
  site: 'https://carteraia.com',
  integrations: [
    mdx(), 
    sitemap(), 
    react(), 
    partytown({
      // 1. Esto es vital para que Google Analytics funcione
      config: {
        forward: ["dataLayer.push"],
      },
    })
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
});