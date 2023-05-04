<script lang="ts">
  import TopItems from "$lib/TopItems.svelte";

  export let data: any; // Ideally you should replace `any` with the actual type of your data

  let error: Error | null = null;

  $: {
    if (!data) {
      error = new Error('Data not loaded');
    }
  }

</script>

<h2>top {data.entity}</h2>

{#if error}
    <p>Error: {error.message}</p>
{:else if !data.data.items?.length}
    <p>Loading...</p>
{:else}
    <a href="?time_range=short_term">short term</a>
    <a href="?time_range=medium_term">medium term</a>
    <a href="?time_range=long_term">long term</a>
    <TopItems entity={data.entity} data={data.data}  />
{/if}
