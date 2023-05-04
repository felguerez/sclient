<script lang="ts">
  import { QueryClientProvider } from '@tanstack/svelte-query'
  import type { LayoutData } from './$types';
  export let data: LayoutData
  import '../app.scss';
</script>

<QueryClientProvider client={data.queryClient}>
    <main>
        <slot />
    </main>
</QueryClientProvider>