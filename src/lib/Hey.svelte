<script>
    export let charcoal = "#242424"; // off-black / background
    export let cyan = "#008B8B";
    export let aqua = "#00FFFF";
    export let electricBlue = "#646cff"; // blue link color
    export let rose = "#CD5C5C";
    export let neutralGray = "#808080";
    export let deepNavy = "#000080";
    export let steelBlue = "#4682B4";
    export let slate = "#2F4F4F";
    const FILLS = [charcoal, cyan, electricBlue, slate, steelBlue];
    const STROKES = [charcoal, steelBlue, slate];
    export let state = "light";

    function getNewColor(current, set) {
        const color = set[Math.floor(Math.random() * set.length)];
        if (color === current) {
            getNewColor(current);
        }
        return color;
    }

    function handleMouseEnter(letter) {
        console.log('letter:', letter)
        console.log('letter.currentTarget:', letter.currentTarget)
        console.log('letter.currentTarget.style:', letter.currentTarget.style);

        const fill = getNewColor(letter.currentTarget.style.fill, FILLS)
        const stroke = getNewColor(letter.currentTarget.style.stroke, STROKES);
        letter.currentTarget.style['stroke'] = stroke;
        letter.currentTarget.style['fill'] = fill;

    }

    function handleMouseLeave(letter) {
        const {style} = letter.currentTarget;
        style["fill"] = state === "light" ? cyan : steelBlue;
        style["stroke"] = state === "light" ? deepNavy : slate;
        state = state === "light" ? "dark" : "light";
    }
</script>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280.14 52.84" class="hey-svg">
    <defs>
        <style lang="scss">
          .letter {
            cursor: pointer;
            stroke: #000080;
            stroke-miterlimit: 10;
            fill: #008B8B;
            transition: all 100ms ease-in-out;
          }
        </style>
    </defs>
    <path on:mouseenter={handleMouseEnter}
          on:mouseleave={handleMouseLeave} class="letter"
          d="m.5,1.22h7.92v20.52h8.5V1.22h7.92v50.4h-7.92v-22.68h-8.5v22.68H.5V1.22Z"/>
    <path on:mouseenter={handleMouseEnter}
          on:mouseleave={handleMouseLeave} class="letter"
          d="m30.74,1.22h21.6v7.2h-13.68v13.32h10.87v7.2h-10.87v15.48h13.68v7.2h-21.6V1.22Z"/>
    <path on:mouseenter={handleMouseEnter}
          on:mouseleave={handleMouseLeave} class="letter" d="m56.88,1.22h7.92v43.2h13.03v7.2h-20.95V1.22Z"
    />
    <path on:mouseenter={handleMouseEnter}
          on:mouseleave={handleMouseLeave} class="letter" d="m81.64,1.22h7.92v43.2h13.03v7.2h-20.95V1.22Z"
    />
    <path on:mouseenter={handleMouseEnter}
          on:mouseleave={handleMouseLeave} class="letter"
          d="m108.64,49.03c-2.06-2.21-3.1-5.33-3.1-9.36V13.17c0-4.03,1.03-7.15,3.1-9.36,2.06-2.21,5.04-3.31,8.93-3.31s6.86,1.1,8.93,3.31c2.06,2.21,3.1,5.33,3.1,9.36v26.5c0,4.03-1.03,7.15-3.1,9.36-2.06,2.21-5.04,3.31-8.93,3.31s-6.86-1.1-8.93-3.31Zm13.03-8.86V12.67c0-3.31-1.37-4.97-4.1-4.97s-4.1,1.66-4.1,4.97v27.5c0,3.31,1.37,4.97,4.1,4.97s4.1-1.66,4.1-4.97Z"/>
    <path on:mouseenter={handleMouseEnter}
          on:mouseleave={handleMouseLeave} class="letter" d="m152.63,8.42h-8.28V1.22h24.48v7.2h-8.28v43.2h-7.92V8.42Z"/>
    <path on:mouseenter={handleMouseEnter}
          on:mouseleave={handleMouseLeave} class="letter"
          d="m172.65,1.22h7.92v20.52h8.5V1.22h7.92v50.4h-7.92v-22.68h-8.5v22.68h-7.92V1.22Z"/>
    <path on:mouseenter={handleMouseEnter}
          on:mouseleave={handleMouseLeave} class="letter"
          d="m202.89,1.22h21.6v7.2h-13.68v13.32h10.87v7.2h-10.87v15.48h13.68v7.2h-21.6V1.22Z"/>
    <path on:mouseenter={handleMouseEnter}
          on:mouseleave={handleMouseLeave} class="letter"
          d="m229.02,1.22h11.74c4.08,0,7.06.95,8.93,2.84,1.87,1.9,2.81,4.81,2.81,8.75v3.1c0,5.23-1.73,8.54-5.18,9.94v.14c1.92.58,3.28,1.75,4.07,3.53.79,1.78,1.19,4.15,1.19,7.13v8.86c0,1.44.05,2.6.14,3.49.1.89.33,1.76.72,2.63h-8.06c-.29-.82-.48-1.58-.58-2.3-.1-.72-.14-2.02-.14-3.89v-9.22c0-2.3-.37-3.91-1.12-4.82-.74-.91-2.03-1.37-3.85-1.37h-2.74v21.6h-7.92V1.22Zm10.8,21.6c1.58,0,2.77-.41,3.56-1.22.79-.82,1.19-2.18,1.19-4.1v-3.89c0-1.82-.32-3.14-.97-3.96-.65-.82-1.67-1.22-3.06-1.22h-3.6v14.4h2.88Z"/>
    <path on:mouseenter={handleMouseEnter}
          on:mouseleave={handleMouseLeave} class="letter"
          d="m258.04,1.22h21.6v7.2h-13.68v13.32h10.87v7.2h-10.87v15.48h13.68v7.2h-21.6V1.22Z"/>
</svg>

<style lang="scss">
  .letter {
    height: 72px;

    &:hover {
      //fill: #646cff; /* Changes the fill color to your link color on hover */
    }
  }

  .hey-svg {
    height: 60px;
    align-items: center;
  }

  .hey-svg:hover {
  }
</style>