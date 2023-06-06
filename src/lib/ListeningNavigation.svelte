<script>
    import {page} from '$app/stores';
</script>
<ul class="menu-container">

    <li>
        <a class:active="{$page.url.pathname.includes('/listening')}" href="/listening">currently playing</a>
    </li>
    <li>
        <a class:active="{$page.url.pathname.includes('/recently-played')}" href="/recently-played">recently played</a>
    </li>
    <li>
        <a class:active="{$page.url.pathname.includes('/top/artists')}" href="/top/artists">top artists</a>
    </li>
    <li>
        <a class:active="{$page.url.pathname.includes('/top/tracks')}" href="/top/tracks">top tracks</a>
    </li>
</ul>

<style>
    .menu-container {
        padding-inline-start: 0;
        display: flex;
        gap: 1rem;
        list-style: none;
    }

    a {
        transition: color 300ms ease, border-bottom-color 500ms ease;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--indigo);
    }

    .active {
        border-color: inherit;
    }
</style>