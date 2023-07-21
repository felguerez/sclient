<script lang="ts">
  export let entity = "artists";
  const handleMouseMove = (event) => {
    const {target, pageX, pageY} = event;
    const x = pageX - target.offsetLeft;
    const y = pageY - target.offsetTop;
    target.style.backgroundPosition = `${x}px ${y}px`;
  };
  export let item;
  export let index;
</script>

{#if entity === "current-track" && item}
    {@const image = item.album?.images[0]?.url}
    <div class="current item" style="background-image: url({image})" on:mousemove={handleMouseMove}>
        <p class="raised shadowed"><span class="name">{item.name}</span> by
            {#each item.album?.artists as artist}
                <strong class="artist">{artist?.name}{item.album.artists.length > 1 && index < item.items.length - 1 ? ', ' : ''}</strong>
            {/each}
        </p>
    </div>
{/if}
{#if entity === "current-track" && !item}
    <div class="empty item">
        <p class="raised">I'm listening to a podcast or an audiobook but I can't say much about it.</p>
        <p class="raised">You can see what music I've been listening to <a href="/recently-played">here</a>.</p>
    </div>
{/if}
{#if entity === "recently-played"}
    {@const image = item.track.album.images[0]?.url}
    {@const href = item.track.external_urls.spotify}
    <div class="container">
        <div class="item" style="background-image: url({image})" on:mousemove={handleMouseMove}>
            <p class="raised shadowed"><a class="name" {href} target="_blank">{item.track.name}</a> by
                {#each item.track.artists as artist, aIndex}
                    {@const href = artist?.external_urls?.spotify}
                    <a {href} target="_blank" class="raised">
                        <strong class="artist">{artist?.name}{aIndex < item.track.artists.length - 1 ? ', ' : ''}</strong>
                    </a>
                {/each}
            </p>
        </div>
    </div>
{/if}
{#if entity === "artist"}
    {@const image = item?.images?.length ? item.images[0]?.url : "" }
    {@const href = item?.external_urls?.spotify}
    <div class="item" style="background-image: url({image})" on:mousemove={handleMouseMove}>
        <a {href} target="_blank" class="raised shadowed name">{item.name}</a>
    </div>
{/if}
{#if entity === "track"}
    {@const image = item.album?.images[0]?.url}
    {@const href = item.album?.external_urls?.spotify}
    <div class="item" style="background-image: url({image})" on:mousemove={handleMouseMove}>
        <p class="raised">
            <a {href} class="shadowed"><span class="raised name">{item.name}</span></a> by
            {#each item.album?.artists as artist}
                {@const href = artist?.external_urls?.spotify}
                <a {href} target="_blank" class="raised">
                    <strong class="artist">{artist?.name}{item.album.artists.length > 1 && index < item.artists.length - 1 ? ', ' : ''}</strong>
                </a>
            {/each}
        </p>
    </div>
{/if}

<style lang="scss">
  .container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    @media (min-width: 1300px) {
      grid-template-columns: repeat(auto-fit, minmax(calc(100% / 5), 1fr));
    }
  }

  .item {
    border-radius: 3%;
    transform: skew(-1deg);
    position: relative;
    height: 120px;
    display: inline-block;
    padding: 1rem;
    border: 1px solid var(--orange);
    background-position: 100% 100%;
    background-size: cover;
    transition: background-position 2s ease-out, transform 0.125s ease-in-out;

    &:hover {
      transform: skew(1deg);
    }

    &::after {
      border-radius: 3%;
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: 0.5;
    }
  }

  .current {
    height: 420px;
    aspect-ratio: 1;
  }

  .empty {
    max-width: 550px;
    height: auto;
    border-radius: 5px;

    p:last-of-type {
      margin-bottom: 0;
    }
  }

  .raised {
    position: relative;
    opacity: 1;
    z-index: 999;
  }

  .shadowed {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25),
    -1px 1px 2px rgba(0, 0, 0, 0.25),
    1px -1px 2px rgba(0, 0, 0, 0.25),
    -1px -1px 2px rgba(0, 0, 0, 0.25);
  }

  .artist {
    color: var(--chartreuse);

    &:hover {
      color: var(--mint)
    }
  }

  .name {
    color: var(--mint);
    opacity: 1;
    z-index: 999;

    &:hover {
      color: var(--chartreuse)
    }
  }
</style>