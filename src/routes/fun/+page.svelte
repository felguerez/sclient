<script lang="ts">
  import Snake from "$lib/Snake.svelte";
</script>
<p>What do I consider fun? The usual stuff:</p>
<ul>
    <li>Biking around NYC</li>
    <li>Hanging out at the park</li>
    <li>Hiking and visiting National Parks</li>
    <li>Rock climbing (indoor and outdoor)</li>
    <li>Listening to music, podcasts, and NPR</li>
</ul>
<Snake/>
<style lang="scss">
    li {
      @media (max-width: 640px) {
        margin-inline-start: 1.5rem;
      }
    }
</style>