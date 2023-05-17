<script lang="ts">
  import TopItems from "$lib/TopItems.svelte";
  import {get} from "svelte/store";
  import {page} from "$app/stores";
  import ListeningNavigation from "$lib/ListeningNavigation.svelte";

  export let data: any;

  let error: Error | null = null;

  $: {
    if (!data) {
      error = new Error('Data not loaded');
    }
    console.log('data:', data)
  }
  export let timeRange = '';
  $: {
    const {url} = get(page);
    timeRange = url.searchParams.get('time_range') || 'medium_term';
  }

</script>
<div class="menu-container">
    <ListeningNavigation/>

</div>
<h2>top {data.entity}</h2>

{#if error}
    <p>Error: {error.message}</p>
{:else if !data || !data?.data || !data?.data?.items?.length }
    <p>Loading...</p>
{:else}
    {@const timeRange = $page.url.searchParams.get("time_range")}
    <div class="menu-container">
        <p>
            <a class:active="{timeRange === 'short_term'}"
               href={`/top/${data.entity}?time_range=short_term`}>short term</a> |
            <a class:active="{timeRange === 'medium_term' || timeRange === null}"
               href={`/top/${data.entity}?time_range=medium_term`}>medium term</a> |
            <a class:active="{timeRange === 'long_term'}"
               href={`/top/${data.entity}?time_range=long_term`}>long term</a>
        </p>
    </div>
    <TopItems entity={data.entity} data={data.data}/>
{/if}

<style>
    .menu-container {
        padding-bottom: 1rem;
    }

    a {
        padding-bottom: 0.5rem;
        border-bottom: 2px solid #242424;
    }

    .active {
        border-color: inherit;
    }
</style>