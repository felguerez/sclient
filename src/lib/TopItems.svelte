<script lang="ts">
  export let data = {items: [{artists: [], album: {images: []}}]}
  export let entity = "artists";
  const handleMouseMove = (event) => {
    const {target, pageX, pageY} = event;
    const x = pageX - target.offsetLeft;
    const y = pageY - target.offsetTop;
    target.style.backgroundPosition = `${x}px ${y}px`;
  };
</script>
<div class="container">
    {#if entity === "recent-tracks" && Array.isArray(data.items)}
        {#each data.items as item, index}
            {#if item.track}
                {@const image = item.track.album ? item.track.album.images[0]?.url : "https://placekitten.com/240/240"}
                <div class="item" style="background-image: url({image})" on:mousemove={handleMouseMove}>
                    <p><span class="name">{item.track.name}</span> by
                        {#each item.track.artists as artist}
                            <strong class="artist">{artist?.name}{item.track.artists.length > 1 && index < data.items.length - 1 ? ', ' : ''}</strong>
                        {/each}
                    </p>
                </div>
            {/if}
        {/each}
    {/if}
    {#if entity === "tracks" && Array.isArray(data.items)}
        {#each data.items as track, index}
            {@const image = track.album?.images[0]?.url}
            <div class="item" style="background-image: url({image})" on:mousemove={handleMouseMove}>
                <p><span class="name">{track.name}</span> by
                    {#each track.album?.artists as artist}
                        <strong class="artist">{artist?.name}{track.album.artists.length > 1 && index < data.items.length - 1 ? ', ' : ''}</strong>
                    {/each}
                </p>
            </div>
        {/each}
    {/if}
    {#if entity === "artists" && Array.isArray(data.items)}
        {#each data.items as artist, index}
            {@const image = artist?.images?.length ? artist.images[0]?.url : "" }
            <div class="item" style="background-image: url({image})" on:mousemove={handleMouseMove}>
                <p class="name">{artist.name}</p>
            </div>
        {/each}
    {/if}
</div>

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
    border: 1px solid gold;
    background-position: 100% 100%;
    background-size: cover;
    transition: background-position 2s ease-out, transform 0.125s ease-in-out;

    // Change: Use padding-bottom for maintaining aspect ratio
    &::before {
      //display: block;
      content: "";
      width: 100%;
      padding-bottom: 120%; // Adjust this percentage to set the aspect ratio
    }
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