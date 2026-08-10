<!-- src/components/CardList.svelte -->
<script>
  import CardItem from './CardItem.svelte';
  import { goto } from '$app/navigation'; // SvelteKit router

  export let articles = [];
</script>

<div class="card-list">
  {#each articles as article}
    <CardItem {...article} on:click={() => goto(`/article/${article.id}`)} />
  {/each}
</div>

<style>
  .card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>