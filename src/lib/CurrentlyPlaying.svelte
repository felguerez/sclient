<script lang="ts">
  import {createQuery} from '@tanstack/svelte-query'
  import Item from "./Item.svelte";

  type Response = { name: string; artists: { name: string }[] }[]
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const url = `${baseUrl}/api/spotify/currently-playing`;
  export let query = createQuery<Response>({
    queryKey: ['currently-playing'],
    queryFn: async () => (await fetch(url)).json()
  });
</script>
{#if !$query.data}
    <p>...</p>
{:else if $query.data.is_playing === false}
    <div>
        <p>Nothing! Check back later to see what I'm listening to in real-time.</p>
        <p>Or you can click <a href="/recently-played">here</a> to see what I've listened to recently.</p>
    </div>
{:else if $query.data.type === "episode"}
    <p>a podcast episode (sorry, no data available)</p>
{:else if $query.data && $query.data.is_playing && $query.data.type !== "episode"}
    {@const item = $query.data.item}
    <Item entity="current-track" {item} index={0}/>
{/if}