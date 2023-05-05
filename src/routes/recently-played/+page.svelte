<script lang="ts">
  import {createQuery} from '@tanstack/svelte-query'
  import TopItems from "../../lib/TopItems.svelte";

  type Response = { name: string; artists: { name: string }[] }[]
  const url = "http://localhost:8080/api/spotify/recently-played";
  // This data is cached by prefetchQuery in +page.ts so no fetch actually happens here
  const items = createQuery<Response>({
    queryKey: ['recently-played'],
    queryFn: async () => (await fetch(url)).json()
  });
</script>
<h1>Antonio Felguerez recently played</h1>
<div class="menu-container">
<a href="/">back</a>
</div>
<TopItems entity="recent-tracks" data={$items.data}  />

<style>
    .menu-container {
        padding-bottom: 1rem;
    }
</style>