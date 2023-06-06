<script lang="ts">
  import {QueryClientProvider} from '@tanstack/svelte-query'
  import type {LayoutData} from './$types';

  export let data: LayoutData
  import '../app.scss';
  import Navigation from "../lib/Navigation.svelte";
</script>

<QueryClientProvider client={data.queryClient}>
    <main>
        <Navigation/>
        <slot/>
    </main>
</QueryClientProvider>

<style lang="scss">
  main {
    margin: 1rem auto;
    max-width: 960px;
    @media (max-width: 976px) {
      margin: 1rem;
    }
  }
</style>