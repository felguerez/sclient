<script lang="ts">
  import CurrentlyPlaying from "$lib/CurrentlyPlaying.svelte";
  import ListeningNavigation from "$lib/ListeningNavigation.svelte";

</script>
<div class="menu-container">
    <ListeningNavigation/>
</div>
<h2>currently playing</h2>
<CurrentlyPlaying/>

<style>
    .menu-container {
        padding-bottom: 1rem;
    }
</style>