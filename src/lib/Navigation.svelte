<script lang="ts">
  import {page} from '$app/stores';
  import {createQuery} from '@tanstack/svelte-query'
  import {writable} from "svelte/store";

  type Response = { name: string; artists: { name: string }[] }[]
  const url = "http://localhost:8080/api/spotify/currently-playing";
  export let query = createQuery<Response>({
    queryKey: ['currently-playing'],
    queryFn: async () => (await fetch(url)).json()
  });
  export let isListening = false;
  export let isShow;
  export let color = writable('#1DB954');
  $: {
    isShow = $query.data?.currently_playing_type === 'episode';
    isListening = $query.data?.is_playing && !isShow; // podcasts/audiobooks don't provide metadata
  }
</script>

<nav style="--pulse-color: {$color}">
    <a class="home" href="/" class:active={$page.url.pathname === '/'}>
        <h1 class="title">Antonio Felguerez</h1>
    </a>
    <ul class="menu-container">
        <li class:active="{$page.url.pathname.includes('/work')}">
            <a href="/work">work</a>
        </li>
        <li class:active="{['/listening', '/top/artists', '/top/tracks', '/recently-played'].includes($page.url.pathname)}">
            <a class="{isListening ? 'listening' : ''}"
               href="/listening">listening <span class="spotify-indicator"/></a>
        </li>
        <li class:active="{$page.url.pathname.includes('/fun')}">
            <a href="/fun">fun</a>
        </li>
        <li class:active="{$page.url.pathname.includes('/contact')}">
            <a href="/contact">contact</a>
        </li>

    </ul>
</nav>

<style lang="scss">
  .home {
    color: #ffffff;
    display: inline-block;

    &:hover {
      animation: rainbow 2s infinite;
    }
  }

  .title {
    font-size: 1.6rem;
  }

  nav {
    padding-top: 2rem;

    li a {
      transition: color 300ms ease, border-bottom-color 500ms ease;
      color: var(--indigo-lighter);
      display: contents;
    }

    li.active a {
      color: var(--chartreuse);
    }

    &:hover {
      li a {
        color: var(--purple-lighter);

        &:hover {
          color: var(--chartreuse);
        }
      }

      li.active a {
        color: var(--chartreuse);
      }
    }
  }

  .menu-container {
    padding-inline-start: 0;
    display: flex;
    list-style: none;
  }

  li {
    margin: 0 0.5rem 0.5rem 0.5rem;
    transition: color 100ms ease-in;

    &:first-of-type {
      margin-left: 0;
    }

    &.active {
      border-bottom: 2px solid var(--chartreuse);
      padding-bottom: 0.5rem;
    }
  }

  .listening {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    /*0% { color: #000; }*/
    50% {
      border-bottom: 2px solid var(--pulse-color);
      color: var(--pulse-color);
    }
    /*100% { color: #000; }*/
  }

  @keyframes rainbow {
    // TODO: choose colors that are equal distance from one another to make the transitions look more natural
    $colors: 'chartreuse', 'rose-light', 'rose', 'crimson', 'orange', 'mint', 'green', 'purple-lighter', 'purple-light', 'purple', 'indigo-lighter', 'indigo-light', 'indigo';
    $i: 0;
    @each $color in $colors {
      #{calc($i * 10% / length(colors))} {
        color: var(--#{$color});
      }
      $i: $i + 1;
    }
  }
</style>