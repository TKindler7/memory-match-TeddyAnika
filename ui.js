// ui.js — owner: TABLE
// You decide what players see and click. You never change the rules.

const tableEl = document.getElementById("table");
const statusEl = document.getElementById("status");
const newGameButton = document.getElementById("new-game");
let missTimeout = null;

function render() {
  tableEl.innerHTML = "";

  state.cards.forEach(function (card, index) {
    const button = document.createElement("button");
    button.className = "card";
    if (card.flipped || card.matched) {
      button.classList.add("card--revealed");
      button.textContent = card.face;
    } else {
      button.textContent = CARD_BACK;
    }
    button.addEventListener("click", function () {
      handleClick(index);
    });
    tableEl.appendChild(button);
  });

  // TODO T2: Show the number of moves and matches in statusEl.
  statusEl.textContent = "";

  if (isWon()) {
    statusEl.textContent = `You won in ${state.moves} moves!`;
  }
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

newGameButton.addEventListener("click", function () {
  if (missTimeout !== null) {
    clearTimeout(missTimeout);
    missTimeout = null;
  }
  newGame(PAIRS);
  render();
});

newGame(PAIRS);
render();
