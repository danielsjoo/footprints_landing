// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://danielsjoo.github.io',
  base: '/footprints_landing/',
  vite: {
    plugins: [tailwindcss()]
  }
});