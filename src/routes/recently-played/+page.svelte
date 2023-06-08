<script lang="ts">
  import {createQuery} from '@tanstack/svelte-query'
  import TopItems from "../../lib/TopItems.svelte";
  import ListeningNavigation from "$lib/ListeningNavigation.svelte";

  type Response = { name: string; artists: { name: string }[] }[]
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const url = `${baseUrl}/api/spotify/recently-played`;
  // This data is cached by prefetchQuery in +page.ts so no fetch actually happens here
  const items = createQuery<Response>({
    queryKey: ['recently-played'],
    queryFn: async () => (await fetch(url)).json()
  });
</script>
<div class="menu-container">
    <ListeningNavigation />
</div>
<h2>recently played</h2>

{#if $items.isFetched}
    <!--    <div class="groups">-->
    <!--        {#each $items.data as group}-->
    <!--            <div class="group">-->
    <!--                {#each group as item, index}-->
    <!--                    {@const image = item.track.album?.images[0]?.url}-->
    <!--                    <div class="item" style="background-image: url({image})">-->
    <!--                        <p class="shadowed"><span class="name">{item.track.name}</span> by-->
    <!--                            {#each item.track.album?.artists as artist}-->
    <!--                                <strong class="artist">{artist?.name}{item.track.album.artists.length > 1 && index < item.track.artists.length - 1 ? ', ' : ''}</strong>-->
    <!--                            {/each}-->
    <!--                        </p>-->
    <!--                    </div>-->
    <!--                {/each}-->
    <!--            </div>-->
    <!--        {/each}-->
    <!--    </div>-->
    <TopItems entity="recent-tracks" data={$items.data}/>
{/if}

<style lang="scss">
  .menu-container {
    padding-bottom: 1rem;
  }
</style>