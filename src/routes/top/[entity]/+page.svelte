<script lang="ts">
  import TopItems from "$lib/TopItems.svelte";
  import {get} from "svelte/store";
  import {page} from "$app/stores";

  export let data: any; // Ideally you should replace `any` with the actual type of your data

  let error: Error | null = null;

  $: {
    if (!data) {
      error = new Error('Data not loaded');
    }
  }
  const { url } = get(page);
  export let timeRange = url.searchParams.get('time_range') || 'medium_term';

</script>

<h1>Antonio Felguerez's top {data.entity}</h1>
<p>for <strong>{timeRange.replace('_', ' ')}</strong> period.</p>

{#if error}
    <p>Error: {error.message}</p>
{:else if !data.data.items?.length}
    <p>Loading...</p>
{:else}
    <div class="menu-container">
        <p>
            <a href="?time_range=short_term">short term</a> |
            <a href="?time_range=medium_term">medium term</a> |
            <a href="?time_range=long_term">long term</a>
        </p>
        <p><a href="/">go back</a></p>
    </div>
    <TopItems entity={data.entity} data={data.data}/>
{/if}

<style>
    .menu-container {
        padding-bottom: 1rem;
    }
</style>