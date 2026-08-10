<!-- src/components/CardItem.svelte -->
<script>
  export let title = '';
  export let description = '';

  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      // Trigger a click or dispatch event on Enter/Space
      event.preventDefault();
      event.target.click();
    }
  }
</script>

<div 
  class="card-item" 
  role="button" 
  tabindex="0" 
  on:click 
  on:keydown={handleKeyDown}
>
  <h2>{title}</h2>
  <p>{description}</p>
</div>

<style>
  .card-item {
    border: 1px solid #ccc;
    padding: 1rem;
    margin: 0.5rem;
    width: calc(33% - 1rem);
    cursor: pointer;
  }
  
  .card-item:hover {
    background-color: #f0f0f0;
  }
</style>