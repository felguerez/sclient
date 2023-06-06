<script lang="ts">

  import {createEventDispatcher} from 'svelte';

  const dispatch = createEventDispatcher();
  let isPaused = false;
  export let style;

  function handleClick() {
    dispatch('click');
    isPaused = !isPaused;
  }

  export let button;
</script>

<button class="button {isPaused ? 'paused' : ''}" on:click={handleClick} bind:this={button} {style}/>
<style lang="scss">
  .button {
    --height: 1rem;
    padding: 0;
    border: 0;
    background: transparent;
    box-sizing: border-box;
    width: 0;
    height: 1rem;
    border-radius: 0;

    border-color: transparent transparent transparent var(--spotify-green);
    transition: 100ms all ease;
    cursor: pointer;

    // play state
    border-style: solid;
    border-width: calc(0.5 * var(--height)) 0 calc(0.5 * var(--height)) calc(0.875 * var(--height));

    &.paused {
      border-style: double;
      border-width: 0px 0 0px calc(0.875 * var(--height));
    }

    &:hover {
      border-color: transparent transparent transparent var(--green);
    }
  }

</style>
