<script lang="ts">
  import CurrentlyPlaying from "$lib/CurrentlyPlaying.svelte";
  import {createQuery} from '@tanstack/svelte-query'

  type Response = { name: string; artists: { name: string }[] }[]
  const url = "http://localhost:8080/api/spotify/currently-playing";
  export let query = createQuery<Response>({
    queryKey: ['currently-playing'],
    queryFn: async () => (await fetch(url)).json()
  });

</script>
<div class="hero">

</div>
<div>
    <p>Thanks for checking out my home on the web. Get to know me better by reading more below.</p>
</div>
<div class="content-container">
    <div>
        <h2>Tony's life story <span class="spin">🌎</span></h2>
        <ul>
            <li>I built my first website using Notepad in 1997</li>
            <li>I've been writing software professionally since 2014</li>
            <li>I moved to NYC in 2015 to the <a href="https://en.wikipedia.org/wiki/Tom%27s_Restaurant"
                                                 target="_blank">Morningside Heights neighborhood</a></li>
            <li>I've been working at Spotify since 2019</li>
            <li>I moved from the East Village to Downtown Brooklyn in 2021</li>
            <li>I used to work on a podcast creator tool, <a href="https://anchor.fm" target="_blank">anchor.fm</a>, and
                now I'm building the audiobooks experience in Spotify
            </li>
            <li>I write Java and TypeScript at work but I'm messing around with Go and Svelte at home</li>
            <li>I like spending time off the computer (rock climbing, cycling, hanging out)</li>
            <li>I listen to a lot of <a href="https://wnyc.org" target="_blank">public radio</a></li>
            {#if $query.data && $query.data.is_playing}
                {@const {item} = $query.data}
                {#if $query.data.currently_playing_type !== "episode"}
                    <li>I'm currently listening to {item.name} by {item.album.artists[0].name}</li>
                {/if}
            {/if}
        </ul>
    </div>
    {#if $query.isFetched && $query.data.is_playing && $query.data.currently_playing_type !== "episode"}
        <CurrentlyPlaying/>
    {/if}
</div>


<style lang="scss">
  .hero {
    display: flex;
    justify-content: space-between;
    max-width: 960px;
    align-items: center;
  }

  .content-container {
    display: flex;
    gap: 4rem;
    justify-content: space-between;
  }

  .spin {
    display: inline-block;
    animation: spin 60s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg)
    }

    100% {
      transform: rotate(360deg)
    }

  }
</style>