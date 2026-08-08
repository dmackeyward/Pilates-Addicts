// vite.config.js
import { defineConfig } from 'vite';
// CHANGE THE LINE BELOW: Added curly braces around svelte
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 3000, 
  },
});
