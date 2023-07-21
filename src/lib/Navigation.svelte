<script lang="ts">
  import { page } from "$app/stores";
  import { createQuery } from "@tanstack/svelte-query";
  import { writable } from "svelte/store";

  type Response = { name: string; artists: { name: string }[] }[]
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const url = `${baseUrl}/api/spotify/currently-playing`;
  export let query = createQuery<Response>({
    queryKey: ["currently-playing"],
    queryFn: async () => (await fetch(url)).json()
  });
  export let isListening = false;
  export let isShow;
  export let color = writable("#1DB954");
  $: {
    isShow = $query.data?.currently_playing_type === "episode";
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
         href="/listening">listening <span class="spotify-indicator" /></a>
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
  @use '$lib/styles/functions';
  .home {
    color: #ffffff;
    display: inline-block;
  }

  // create a gradient
  $gradient-stops: ();
  $gradient-index: 0;
  $gradient-colors: 'crimson', 'orange', 'chartreuse', 'green', 'mint', 'purple', 'crimson';
  $full-gradient-colors: functions.join($gradient-colors, $gradient-colors);

  @each $color in $full-gradient-colors {
    $gradient-stops: append($gradient-stops, var(--#{$color}) #{calc($gradient-index * 100% / length($full-gradient-colors))}, comma);
    $gradient-index: $gradient-index + 1;
  }
  $gradient: linear-gradient(to right, $gradient-stops);

  .title {
    font-size: 1.6rem;
    color: #fff;
    overflow: hidden;
    position: relative;
    &:before {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      -webkit-text-fill-color: transparent;
      background: $gradient 0% 0% / 200% 100%;
      animation: rainbow-text 5s linear infinite;
      opacity: 0;
      transition: opacity 0.5s;
    }

    &:hover:before {
      -webkit-background-clip: text;
      background-clip: text;
      opacity: 1;
    }
    &:hover {
      animation: rainbow-in 0.5s forwards, rainbow-text 5s linear infinite;
    }
    &:not(:hover) {
      animation: rainbow-out 0.5s forwards;
      &:before {
        background: none;
      }
    }
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
    $colors: 'chartreuse', 'rose-light', 'rose', 'crimson', 'orange', 'mint', 'green', 'purple-lighter', 'purple-light', 'purple';
    $i: 0;
    @each $color in $colors {
      #{calc($i * 100% / length($colors))} {
        color: var(--#{$color});
      }
      $i: $i + 1;
    }
  }

  @keyframes rainbow-text {
    to {
      background-position: -100%;
    }
  }

  @keyframes rainbow-in {
    from {
      color: white;
      background: none;
    }

    to {
      color: transparent;
      background: $gradient 0% 0% / 200% 100%;
      -webkit-background-clip: text;
      background-clip: text;
    }
  }
  @keyframes rainbow-out {
    0% {
      color: transparent;
      background: $gradient 0% 0% / 200% 100%;
      -webkit-background-clip: text;
      background-clip: text;
    }

    50% {
      color: rgba(255, 255, 255, 0.5); // You might need to adjust this
      background: $gradient 50% 0% / 100% 100%;
      -webkit-background-clip: text;
      background-clip: text;
    }

    100% {
      color: white;
      background: none;
    }
  }

</style>