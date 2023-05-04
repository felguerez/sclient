<script lang="ts">
  export let data = {items: []}
</script>
<div style="
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
">
    {#each data.items as item}
        {@const image = item.track.album.images[0].url}
        <div class="item" style="background-image: url({image})">
            <p><span class="name">{item.track.name}</span> by <strong
                    class="artist">{item.track.artists[0].name}</strong></p>
        </div>
    {/each}
</div>

<style lang="scss">
  .item {
    position: relative;
    height: 120px;
    display: inline-block;
    width: 12.5%;
    padding: 1rem;
    border: 1px solid gold;

    &:hover {
      background-size: cover;
    }

    &::after {
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