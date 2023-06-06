<script lang="ts">
  export let data = {i: 0, author: '', url: '', title: '', publisher: '', date: ''};
  export let {author, date, i, url, title, publisher} = data;
</script>
<li id={`citation-${i}`}><span
        class="back-link"><a href={`#citation-${data.i}-ref`}>^</a></span>
    {author}. ({date}). {title}. {publisher}.
    <a class="external"
       target="_blank"
       href={url}>
        {url}
    </a>.
</li>

<style lang="scss">
  li {
    font-size: 0.8rem;
  }

  a {
    color: #a69ff8;

    &:hover {
      color: #7c78e0;
    }
  }

  a.external {
    background-image: url("https://wikipedia.org/w/skins/Vector/resources/common/images/link-external-small-ltr-progressive.svg?30a3a");
    background-position: center right;
    background-repeat: no-repeat;
    background-size: 0.857em;
    padding-right: 1em;
  }

  [id^="citation-"]:not([id$="-ref"]) {
    padding: 0.5rem;
    border: 1px solid transparent;
    &:not(:nth-of-type(2n)) {
      margin-left: -0.5rem;
      padding-left: 0.5rem;
    }

    &:target {
      border: 1px solid #535bf2; // depends on fadeBorder for color
      border-radius: 10px;
      animation: fadeBorder 1s ease-in-out forwards;
    }
  }

  @keyframes fadeBorder {
    0% {
      background-color: transparent
    }
    25% {
      background-color: #535bf2
    }
    100% {
      background-color: transparent
    }
  }
</style>