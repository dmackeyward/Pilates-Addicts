<!-- src/lib/components/CardList.svelte -->
<script>
  import CardItem from '$lib/components/CardItem.svelte';

  export let articles = [];

  function handleNavigate(id) {
    // Standard SPA navigation fallback
    window.history.pushState({}, '', `/article/${id}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
</script>

<div class="card-list">
  {#each articles as article}
    <CardItem {...article} on:click={() => handleNavigate(article.id)} />
  {/each}
</div>

<style>
  .card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>