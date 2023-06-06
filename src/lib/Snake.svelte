<script lang="ts">
  import {onMount, onDestroy} from "svelte";
  import {readable, writable} from "svelte/store";
  import Play from "./Play.svelte";


  type Point = {
    x: number;
    y: number;
  };

  const INITIAL_SNAKE = [
    {x: 10, y: 10},
    {x: 10, y: 11},
    {x: 10, y: 12}
  ];

  const INITIAL_FOOD = {x: 15, y: 15};

  const snake = writable<Point[]>(INITIAL_SNAKE);

  const food = writable<Point>(INITIAL_FOOD);
  const direction = writable<string>("RIGHT");
  const gameOver = writable<boolean>(false);
  const gameState = writable<"IDLE" | "STARTED" | "OVER" | "PAUSED">("IDLE");
  const highScore = writable(0);
  const interval = writable<number | undefined>(undefined);
  let isMobile;

  let mainElement;

  function toggleGameState() {
    switch ($gameState) {
      case "STARTED":
        gameState.set("PAUSED");
        break;
      case "IDLE":
      case "PAUSED":
      default:
        gameState.set("STARTED");
        break;
    }
    if (mainElement) {
      mainElement.focus();
    }
    if ($interval) {
      clearInterval($interval);
      interval.set(undefined);
      return;
    }
    interval.set(setInterval(moveSnake, 200));
  }

  function restart() {
    if ($interval) {
      clearInterval($interval);
      interval.set(undefined)
    }
    snake.set(INITIAL_SNAKE);
    gameState.set("STARTED");
    food.set(INITIAL_FOOD);
    gameOver.set(false);
    direction.set("RIGHT");
    mainElement.focus();
    interval.set(setInterval(moveSnake, 200));
  }

  onMount(() => {
    mainElement.focus();
    isMobile = readable(/Mobile|iPhone|Android/.test(navigator.userAgent));
    window.addEventListener("keydown", handleSpaceBar)
  });
  onDestroy(() => {
    if ($interval) {
      clearInterval($interval);
      interval.set(undefined);
    }
  });

  function moveSnake() {
    let newSnake;
    let isGameOver = false;

    snake.update(val => {
      newSnake = [...val];
      const head = {x: val[0].x, y: val[0].y};
      switch ($direction) {
        case "UP":
          head.y = head.y - 1;
          break;
        case "DOWN":
          head.y = head.y + 1;
          break;
        case "LEFT":
          head.x = head.x - 1;
          break;
        case "RIGHT":
          head.x = head.x + 1;
          break;
        default:
          break;
      }
      const isColliding = isCollision(head);
      const isOuttaBounds = isOutOfBounds(head);
      if (isColliding || isOuttaBounds) {
        gameState.set("OVER");
        highScore.update(val => {
          if (val < $snake.length) {
            return $snake.length;
          }
          return val;
        });
        isGameOver = true;
        return val;
      }
      if (isFoodEaten(head)) {
        generateFood();
        newSnake = [head, ...val, val[val.length - 1]];
      } else {
        newSnake = [head, ...val.slice(0, -1)];
      }
      return newSnake;
    });

    if (isGameOver) {
      if ($interval) {
        clearInterval($interval);
        interval.set(undefined);
      }
      gameOver.set(true);
      gameState.set("OVER");
      highScore.update(val => {
        if (val < $snake.length) {
          return $snake.length;
        }
        return val;
      })
    }
  }


  function handleKeyDown(event: KeyboardEvent) {
    const newDirection = getNewDirection(event.keyCode);

    if (newDirection) {
      direction.set(newDirection);
    }
  }

  function handleSpaceBar(event: KeyboardEvent) {
    if (event.code === "Space") {
      if ($gameState === "OVER") {
        restart();
      } else {
        toggleGameState();
      }
    }
  }

  function getNewDirection(keyCode: number): string | null {
    switch (keyCode) {
      case 38: // Up arrow key
        return $direction !== "DOWN" ? "UP" : null;
      case 40: // Down arrow key
        return $direction !== "UP" ? "DOWN" : null;
      case 37: // Left arrow key
        return $direction !== "RIGHT" ? "LEFT" : null;
      case 39: // Right arrow key
        return $direction !== "LEFT" ? "RIGHT" : null;
      default:
        return null;
    }
  }

  function isCollision(head: Point): boolean {
    return $snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y);
  }

  function isOutOfBounds(head: Point): boolean {
    return head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20;
  }

  function isFoodEaten(head: Point): boolean {
    return head.x === $food.x && head.y === $food.y;
  }

  function generateFood() {
    food.set({
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20)
    });
  }

  function isSnake(snake: Point[], row: number, column: number): boolean {
    return snake.some((segment) => segment.x === column && segment.y === row);
  }

  function isFood(food: Point, row: number, column: number): boolean {
    return food.x === column && food.y === row;
  }
</script>

<h3 class="title">Let's play Snake
    {#if $gameState === "OVER"}
        <span class="recycler" on:click={restart}>♻️</span>
    {:else}
        <Play on:click={toggleGameState} style="margin-left: 0.5rem;"/>
    {/if}
</h3>
{#if $isMobile}
    <p><strong>WARNING:</strong>This game isn't playable mobile because it uses right/left buttons :(</p>
{:else}
    <ul>
        <li>⏯️ Press the <span class="spacebar">spacebar</span> to start or the button above to play/pause</li>
        <li>⬆️⬇️⬅️➡️ Use the directional keys to control the snake
        </li>
        <li>🐍 Eat food to grow your snake</li>
        <li>☠️ Run into yourself or the boundaries and die</li>
    </ul>
{/if}
<div class="snake">
    <main bind:this={mainElement} tabindex="0" on:keydown={handleKeyDown}>
        <div class="game-board">
            {#each Array(20) as _, rowIndex}
                {#each Array(20) as _, columnIndex}
                    <div
                            class="square"
                            class:snake={isSnake($snake, rowIndex, columnIndex)}
                            class:food={isFood($food, rowIndex, columnIndex) && $gameState !== "IDLE"}
                    ></div>
                {/each}
            {/each}
        </div>
    </main>
    <div class="scores-container">
        <div class="scores">

            {#if ["OVER", "STARTED"].includes($gameState)}
                <h4>Score:
                    <pre class="score">{$snake.length}</pre>
                </h4>
                {#if $highScore}
                    <h4>High score:
                        <pre class="score">{$highScore || $snake.length}</pre>
                    </h4>
                {/if}
            {/if}
        </div>
        {#if $gameOver}
            <h1>☠️</h1>
            <h3>
                <pre>play again?</pre>
            </h3>
            <button on:click={restart}>play it again</button>
        {/if}
    </div>
</div>

<style lang="scss">
  .title {
    display: flex;
    align-items: center;
  }

  .play {
    margin-left: 0.5rem;
    font-size: 2rem;
    line-height: 0.5;
  }

  .recycler {
    margin-left: 0.5rem;
    display: inline-block;
    cursor: pointer;
  }

  .snake {
    display: flex;
    @media (max-width: 452px) {
      flex-direction: column;
    }
  }

  main {
    display: inline-flex;
  }

  .game-board {
    display: grid;
    gap: 1px;
    grid-template-columns: repeat(20, 1fr);
    grid-template-rows: repeat(20, 1fr);
    margin: 0 auto;
  }

  .square {
    width: 20px;
    height: 20px;
    background-color: #f9f9f9;
    @media (max-width: 452px) {
      width: 16px;
      height: 16px;
    }
  }

  .spacebar {
    font-family: monospace;
    font-weight: bold;
    color: var(--mint);
    text-transform: uppercase;
  }

  .snake {
    background-color: var(--indigo);
  }

  .food {
    background-color: #535bf2;
  }

  .scores-container {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;

    @media (max-width: 640px) {
      margin-block-start: 1rem;
    }

    h1, h2, h3, h4 {
      margin-bottom: 1rem;

      pre {
        margin-bottom: 0;
        display: inline-block;
      }
    }

    .score {
      color: var(--spotify-green);
      font-weight: bold;
      font-size: 1.25rem;
    }
  }

  .scores {
    width: 50%;

    h4 {
      justify-content: space-between;
      display: flex;
      width: 100%;
    }
  }
</style>