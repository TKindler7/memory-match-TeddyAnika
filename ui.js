// ui.js — owner: TABLE
// You decide what players see and click. You never change the rules.

const tableEl = document.getElementById("table");
const statusEl = document.getElementById("status");
const newGameButton = document.getElementById("new-game");
const easyButton = document.getElementById("easy");
const hardButton = document.getElementById("hard");
let missTimeout = null;
let selectedPairs = PAIRS;

function render() {
  tableEl.innerHTML = "";

  state.cards.forEach(function (card, index) {
    const button = document.createElement("button");
    button.className = "card";
    if (card.flipped || card.matched) {
      button.classList.add("card--revealed");
      if (card.matched) {
        button.classList.add("card--matched");
      }
      button.textContent = card.face;
    } else {
      button.textContent = CARD_BACK;
    }
    button.addEventListener("click", function () {
      handleClick(index);
    });
    tableEl.appendChild(button);
  });

  const won = isWon();
  if (won) {
    recordBestScore();
  }
  const bestScore = state.bestMoves === null
    ? "No best score yet"
    : `Best: ${state.bestMoves} moves`;
  statusEl.textContent = won
    ? `You won in ${state.moves} moves! | ${bestScore}`
    : `Moves: ${state.moves} | Matches: ${state.matches}/${selectedPairs} | ${bestScore}`;
}

function handleClick(index) {
  const result = pickCard(index);
  render();
  if (result === "miss") {
    missTimeout = setTimeout(function () {
      hideMiss();
      missTimeout = null;
      render();
    }, 800);
  }
}

function startNewGame(pairs) {
  if (missTimeout !== null) {
    clearTimeout(missTimeout);
    missTimeout = null;
  }
  selectedPairs = pairs;
  easyButton.setAttribute("aria-pressed", String(pairs === PAIRS));
  hardButton.setAttribute("aria-pressed", String(pairs === HARD_PAIRS));
  newGame(pairs);
  render();
}

easyButton.addEventListener("click", function () {
  startNewGame(PAIRS);
});

hardButton.addEventListener("click", function () {
  startNewGame(HARD_PAIRS);
});

newGameButton.addEventListener("click", function () {
  startNewGame(selectedPairs);
});

startNewGame(PAIRS);
