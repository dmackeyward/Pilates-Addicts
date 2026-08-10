import { sveltekit } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        sveltekit()
    ],
    // If you want mdsvex globally for processing markdown files:
    // Pass extensions to sveltekit or handle via svelte plugin options if needed.
});