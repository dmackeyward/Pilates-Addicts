import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    extensions: ['.svelte', '.md', '.svx'],
    preprocess: [mdsvex({ extensions: ['.md', '.svx'] })],
    kit: {
        adapter: adapter()
    }
};

export default config;