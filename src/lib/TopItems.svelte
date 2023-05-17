<script lang="ts">
  import Item from "$lib/Item.svelte";

  export let data = {items: [{artists: [], album: {images: []}}]}
  export let entity = "artists";
</script>
<div class="container">
    {#if entity === "recent-tracks" && Array.isArray(data.items)}
        {#each data.items as item, index}
            <Item entity="recently-played" {item} {index}/>
        {/each}
    {/if}
    {#if entity === "tracks" && Array.isArray(data.items)}
        {#each data.items as track, index}
            <Item entity="track" item={track} {index}/>
        {/each}
    {/if}
    {#if entity === "artists" && Array.isArray(data.items)}
        {#each data.items as artist, index}
            <Item entity="artist" item={artist} {index}/>
        {/each}
    {/if}
</div>

<style lang="scss">
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    @media (min-width: 1300px) {
      grid-template-columns: repeat(auto-fit, minmax(calc(100% / 5), 1fr));
    }
  }
</style>