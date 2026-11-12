// state.js — THE CONTRACT
// Every file reads this. Nobody edits it alone.
// To change it: open a pull request and get approval from EVERY teammate.

// How many pairs of cards are on the table.
const PAIRS = 8;
const BEST_SCORE_KEY = "memory-match-best-moves";

function loadBestScore() {
  try {
    const saved = localStorage.getItem(BEST_SCORE_KEY);
    const moves = Number(saved);
    return saved !== null && Number.isSafeInteger(moves) && moves > 0 ? moves : null;
  } catch {
    return null;
  }
}

// One card looks like this: { face: "🍕", flipped: false, matched: false }

const state = {
  cards: [],        // every card on the table, in order
  firstPick: null,  // index of the first face-up card this turn, or null
  secondPick: null, // index of the second face-up card this turn, or null
  moves: 0,         // turns taken (one turn = two picks)
  matches: 0,       // pairs found so far
  locked: false,    // true while a missed pair is still showing
  bestMoves: loadBestScore(), // fewest moves in a completed game, or null
};

function recordBestScore() {
  if (!Number.isSafeInteger(state.moves) || state.moves < 1 ||
      (state.bestMoves !== null && state.moves >= state.bestMoves)) {
    return;
  }

  state.bestMoves = state.moves;
  try {
    localStorage.setItem(BEST_SCORE_KEY, String(state.bestMoves));
  } catch {
    // Keep the best score for this session if browser storage is unavailable.
  }
}

// FUNCTION CONTRACT
// Owners must keep these names, inputs, and outputs exactly as written.
//
// deck.js   CARD_BACK         -> string shown on a face-down card
// deck.js   getFaces(pairs)   -> array of `pairs` different faces (strings)
// game.js   newGame(pairs)    -> resets state and deals a fresh deck
// game.js   pickCard(index)   -> "ignored" | "first" | "match" | "miss"
// game.js   hideMiss()        -> turns the two missed cards face down again
// game.js   isWon()           -> true when every card is matched
// ui.js     render()          -> redraws the whole table from state
// state.js  recordBestScore() -> saves a new lowest move count after a win
