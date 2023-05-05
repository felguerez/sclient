<script lang="ts">
  import {createQuery} from '@tanstack/svelte-query'

  type Response = { name: string; artists: { name: string }[] }[]
  const url = "http://localhost:8080/api/spotify/currently-playing";
  // This data is cached by prefetchQuery in +page.ts so no fetch actually happens here
  export let item = createQuery<Response>({
    queryKey: ['currently-playing'],
    queryFn: async () => (await fetch(url)).json()
  });
  $: image = "https://placekitten.com/240/240"; // todo: use a real image when I get a response from the API
  const handleMouseMove = (event) => {
    const {target, pageX, pageY} = event;
    const x = pageX - target.offsetLeft;
    const y = pageY - target.offsetTop;
    target.style.backgroundPosition = `${x}px ${y}px`;
  };
</script>
<h1>Antonio Felguerez is currently playing</h1>
<div class="menu-container">
    <a href="/">back</a>
</div>
{#if !$item.data}
    <p>...</p>
{:else if $item.data.is_playing === false}
    <p>Nothing!</p>
{:else if $item.data.type === "episode"}
    <p>a podcast episode (sorry, no data available)</p>
{:else if $item.data && $item.data.is_playing && $item.data.type !== "episode"}
    <div class="item" style="background-image: url({image})" on:mousemove={handleMouseMove}>
        <p><span class="name">{$item.track.name}</span> by
            {#each $item.track.artists as artist}
                <strong class="artist">{artist?.name}</strong>
            {/each}
        </p>
    </div>
{/if}


<style>
    .menu-container {
        padding-bottom: 1rem;
    }
</style>