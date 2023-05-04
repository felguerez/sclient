<script lang="ts">
  export let data = {items: [{artists: [], album: {images: []}}]}
  export let entity = "artists";
  const handleMouseMove = (event) => {
    const {target, pageX, pageY} = event;
    const x = pageX - target.offsetLeft;
    const y = pageY - target.offsetTop;
    target.style.backgroundPosition = `${x}px ${y}px`;
    // target.style.transform = 'skew(1deg)'
  };
</script>
<div style="
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
">
    {#if entity === "recent-tracks" && data.items.length > 0}
        {#each data.items as item}
            {@const image = item.track.album ? item.track.album.images[0]?.url : "https://placekitten.com/240/240"}
            <div class="item" style="background-image: url({image})" on:mousemove={handleMouseMove}>
                <p><span class="name">{item.track.name}</span> by
                    {#each item.track.artists as artist}
                        <strong class="artist">{artist?.name}</strong>
                    {/each}
                </p>
            </div>
        {/each}
    {/if}
    {#if entity === "tracks" && Array.isArray(data.items)}
        {#each data.items as track}
            {@const image = track.album?.images[0]?.url}
            <div class="item" style="background-image: url({image})" on:mousemove={handleMouseMove}>
                <p><span class="name">{track.name}</span> by
                    {#each track.album?.artists as artist}
                        <strong class="artist">{artist?.name}</strong>
                    {/each}
                </p>
            </div>
        {/each}
    {/if}
    {#if entity === "artists"}
        {#each data.items as artist}
            {@const image = artist?.images?.length ? artist.images[0]?.url : "" }
            <div class="item" style="background-image: url({image})" on:mousemove={handleMouseMove}>
                <p class="name">{artist.name}</p>
            </div>
        {/each}
    {/if}
</div>
{#if data.next}
    <a href="/">Go back</a>
{/if}

<style lang="scss">
  .item {
    border-radius: 3%;
    transform: skew(-1deg);
    position: relative;
    height: 120px;
    display: inline-block;
    width: 12.5%;
    padding: 1rem;
    border: 1px solid gold;
    background-position: 100% 100%;
    background-size: cover;
    transition: background-position 2s ease-out;

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

    @media (max-width: 480px) {
      width: 50%;
    }
  }

  p {
    position: relative;
    opacity: 1;
    z-index: 999;
  }

  .artist {
    color: goldenrod;
  }

  .name {
    color: aqua;
    opacity: 1;
    z-index: 999;
  }
</style>