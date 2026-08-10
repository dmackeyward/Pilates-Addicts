import { mdsvex } from 'mdsvex';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    svelte(),
    sveltekit({
      preprocess: [mdsvex({ extensions: ['.svx', '.md'] })],
      extensions: ['.svelte', '.svx', '.md']
    })
  ],
  resolve: {
    alias: { $lib: fileURLToPath(new URL('./src/lib', import.meta.url)) }
  }
});
