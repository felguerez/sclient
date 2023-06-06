<script>
    import Citation from "$lib/Citation.svelte";

    export let references = [
        // {
        //     url: "https://medium.com/eniacvc/seed-to-scale-episode-14-with-michael-mignano-founder-ceo-of-anchor-a738270c7374",
        //     title: "Seed to Scale: Episode 14 with Michael Mignano, Founder & CEO of Anchor",
        //     publisher: "Eniac Ventures, Medium",
        //     author: "Hadley Harris",
        //     date: "2019, January 23"
        // },
        // {
        //     url: "https://www.insideradio.com/podcastnewsdaily/anchor-cofounder-michael-mignano-becomes-latest-podcast-executive-to-leave-spotify/article_5269443a-cafd-11ec-b308-4fd96fc49f46.html",
        //     title: "Anchor Cofounder Michael Mignano Becomes Latest Podcast Executive To Leave Spotify",
        //     date: "2022, May 3",
        //     publisher: "Inside Radio",
        //     author: "Podcast News Daily"
        // },
        // {
        //     url: "https://newsroom.spotify.com/2021-12-16/2021-wrapped-for-podcasters-shows-that-more-people-are-becoming-audio-creators/",
        //     title: "2021 Wrapped for Podcasters Shows That More People Are Becoming Audio Creators",
        //     date: "2021, December 16",
        //     author: "Spotify",
        //     publisher: "Spotify For the Record"
        // },
        {
            url: "https://newsroom.spotify.com/2022-09-20/with-audiobooks-launching-in-the-u-s-today-spotify-is-the-home-for-all-the-audio-you-love/",
            title: "With Audiobooks Launching in the U.S. Today, Spotify Is The Home For All The Audio You Love",
            date: "2022, September 20",
            author: "Spotify",
            publisher: "Spotify For the Record"
        },
        {
            url: "https://www.theverge.com/2021/9/30/22701219/spotify-interactive-podcast-polls-question-answer-feature-launch-anchor",
            title: "Spotify expands interactive podcast polls and Q&As to even more shows",
            date: "2021, September 30",
            author: "Ashley Carman",
            publisher: "The Verge"
        },
        {
            url: "https://newsroom.spotify.com/2020-10-14/spotify-launches-new-audio-experience-combining-music-and-talk-content/",
            title: "Spotify Launches New Audio Experience Combining Music and Talk Content",
            date: "2020, October 14",
            author: "Spotify",
            publisher: "Spotify For the Record"
        },
        {
            url: "https://www.npr.org/2021/11/10/1054255398/spotifys-music-talk-shows-capture-the-magic-of-early-podcasts",
            title: "Spotify's 'Music + Talk' shows capture the magic of early podcasts",
            publisher: "Fresh Air",
            author: "Nick Quah",
            date: "2021, November 10"
        },
        {
            url: "https://medium.com/anchor/your-anchor-profile-has-a-brand-new-look-72c430595ca7",
            title: "Your Anchor profile has a brand new look",
            publisher: "Medium",
            author: "Anchor",
            date: "2019, December 19"
        },
    ]

    export function calculateYearsAndMonths(startDate, endDate = new Date()) {
        let years = endDate.getFullYear() - startDate.getFullYear();
        let months = endDate.getMonth() - startDate.getMonth();

        if (months < 0) {
            years--;
            months += 12;
        }

        if (months === 0) {
            return years + " years"
        }

        const yearText = years === 1 ? "year" : "years";

        return `${years} ${yearText}, ${months} months`;
    }

    export function calculateYears(startDate, endDate = new Date()) {
        let years = endDate.getFullYear() - startDate.getFullYear();
        return years === 1 ? years + " year" : years + " years";
    }
</script>
<div class="main">
    <div class="spotify-summary">
        <h2>Work</h2>
        <p>I currently work at Spotify on a team building the audiobooks listener experience. I'm a Web Engineer but I
            spend a lot of time on the backend.</p>
        <h3>Spotify</h3>
        <p class="tenure">May 2019 &ndash; present ({calculateYearsAndMonths(new Date("2019-05-22"))})</p>
        <p>When I joined Spotify I began working on anchor.fm, now called <a href="https://podcasters.spotify.com"
                                                                             target="_blank" rel="noreferrer nofollow">Spotify
            for
            Podcasters</a>. From May 2019 to May 2022, we experienced hyper-growth in creators, content, and
            engineering headcount. A
            lot of my work is still in production and continues to power features like polls, Q&A, and Music + Talk.
            Spotify for Podcasters continues to power 80% of all podcasts on Spotify and is the largest podcast creator
            platform in the
            world. <sup><span
                    class="citation"
                    id="citation-needed-0"><a
                    href="#citation-needed-0">[citation needed]</a></span></sup></p>
        <p>In Fall 2022, my team and I launched audiobooks on Spotify<sup><span
                class="citation"
                id="citation-0-ref"><a
                href="#citation-0">[1]</a></span></sup>. It was a big achievement and an exciting milestone to launch a
            high-profile product in a high-impact part of the business. The audiobooks experience relies on web
            surfaces extensively, which I had the
            privilege of leading and producing. </p>
        <p>I've acquired lots of technical, practical skills being on a growing team with a successful product and a large user base. Since joining {calculateYears(new Date("2019-05-22"))} ago I've
            built internal
            tools, creator tools, listener frontends, and backend systems. My role's flexibility helped me achieve a truly "full-stack" skill-set.</p>
    </div>
    <div>
        <h4>Senior Engineer</h4>
        <p class="tenure">January 2022 &ndash; present ({calculateYearsAndMonths(new Date("2022-01-01"))})</p>
        <ul>
            <li>Top-secret project, current</li>
            <li>Road Manager (web), Audiobooks launch, September 2022</li>
        </ul>
        <h4>Web Engineer, anchor.fm</h4>
        <p class="tenure">May 2019 &ndash; January 2022
            ({calculateYearsAndMonths(new Date("2019-05-22"), new Date("2022-01-01"))})</p>
        <ul>
            <li>Interactivity (Polls &amp; Q&A), Spring 2021 <sup>
                <span class="citation" id="citation-1-ref"><a
                        href="#citation-1">[2]</a></span></sup></li>
            <li>Music + Talk, Fall 2020 <sup><span class="citation" id="citation-2-ref"><a
                    href="#citation-2">[3]</a></span>, <span class="citation" id="citation-3-ref"><a
                    href="#citation-3">[4]</a></span></sup></li>
            <li>Profile pages, Winter 2019 <sup class="citation" id="citation-4-ref"><a
                    href="#citation-4">[5]</a></sup></li>
        </ul>
    </div>
</div>
<div class="citations">
    <h2>References</h2>
    <ol>
        {#each references as reference, i}
            {@const {publisher, author, date, title, url} = reference}
            <Citation {i} {publisher} {author} {date} {title} {url}/>
        {/each}
    </ol>
</div>

<style>
    .main {
        max-width: 720px;
    }

    .spotify-summary {
        padding-bottom: 1rem;
    }

    .tenure {
        font-size: 0.9rem;
        font-style: italic;
        color: var(--rose-light);
        margin-bottom: 0.25rem;
    }

    ol {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        list-style-position: inside;
    }

    .citation {

    }
</style>