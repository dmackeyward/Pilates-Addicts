// src/stores.js
import { writable } from 'svelte/store';

export const articles = writable([
  {
    id: 1,
    title: 'Pilates for Beginners',
    description: 'Welcome to Pilates for Beginners! This guide will help you understand the basics of Pilates...',
    author: 'John Doe'
  },
  // Add more articles
]);

export const searchResults = writable([]);
export const article = writable({});

function fetchArticles() {
  // Fetch articles from API or local data
}

function searchArticles(query) {
  // Search articles based on query and update searchResults store
}

function fetchArticle(id) {
  // Fetch specific article by id and update article store
}