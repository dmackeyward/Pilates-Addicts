// src/main.js
import { mount } from 'svelte';
import App from './App.svelte';

const app = mount(App, {
  target: document.getElementById('app'),
    props: {
    routes: [
      { path: '/', component: Home },
      { path: '/search', component: Search },
      { path: '/article/:id', component: ArticleDetail }
    ]
  }
});

export default app;