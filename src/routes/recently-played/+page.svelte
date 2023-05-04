<script lang="ts">
  import {createQuery} from '@tanstack/svelte-query'
  import RecentlyPlayed from "$lib/RecentlyPlayed.svelte";
  import TopItems from "../../lib/TopItems.svelte";

  type Response = { name: string; artists: { name: string }[] }[]
  const url = "http://localhost:8080/api/spotify/recently-played";
  // This data is cached by prefetchQuery in +page.ts so no fetch actually happens here
  const items = createQuery<Response>({
    queryKey: ['recently-played'],
    queryFn: async () => (await fetch(url)).json()
  });
</script>
<h1>Recently played</h1>
<a href="/">back</a>
<!--<RecentlyPlayed data={$items.data}/>-->
<TopItems entity="recent-tracks" data={$items.data}  />