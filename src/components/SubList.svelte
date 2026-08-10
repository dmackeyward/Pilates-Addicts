<!-- src/components/Sublist.svelte -->
<script>
  import CardItem from './CardItem.svelte';
  import { sublist as storeSublist } from '../stores';

  // Rename the prop or the store import to avoid a naming conflict
  export let items = [];

  // Use items if passed, otherwise fallback to the store
  $: displayItems = items.length > 0 ? items : $storeSublist;
</script>

<div class="sublist">
  {#each displayItems as item}
    <CardItem {...item} on:click={() => navigate(`/article/${item.id}`)} />
  {/each}
</div>

<style>
  .sublist {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>