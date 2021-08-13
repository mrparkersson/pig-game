'use strict';

// selecting elements

const player0El = document.querySelector ('.player--0');
const player1El = document.querySelector ('.player--1');

const score0El = document.querySelector ('#score--0');
const score1El = document.getElementById ('score--1');
const current0El = document.getElementById ('current--0');
const current1El = document.getElementById ('current--1');
const diceEl = document.querySelector ('.dice');
const btnNew = document.querySelector ('.btn--new');
const btnRoll = document.querySelector ('.btn--roll');
const btnHold = document.querySelector ('.btn--hold');

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
let scores, currentScore, activePlayer, playing;
const init = function () {
  playing = true;

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add ('hidden');
  player0El.classList.remove ('player--winner');
  player1El.classList.remove ('player--winner');
  player0El.classList.add ('player--active');
  player1El.classList.remove ('player--active');
};
// init ();
const switchPlayer = function () {
  document.getElementById (`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle ('player--active');
  player1El.classList.toggle ('player--active');
};
//Rolling dice funtionality
btnRoll.addEventListener ('click', function () {
  if (playing) {
    //Generating a random dice roll
    const dice = Math.trunc (Math.random () * 6) + 1;

    //2. display dice
    diceEl.classList.remove ('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3. Check for rolled if true, switch to the next player
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById (
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //switch to next player
      switchPlayer ();
    }
  }
});

btnHold.addEventListener ('click', function () {
  if (playing) {
    //1. Add current score to the score of active player
    scores[activePlayer] += currentScore;
    document.getElementById (`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.Check score if player's score is >=100
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceEl.classList.add ('hidden');
      document
        .querySelector (`.player--${activePlayer}`)
        .classList.add ('player--winner');
      document
        .querySelector (`.player--${activePlayer}`)
        .classList.remove ('player--active');
    } else {
      switchPlayer ();
    }
  }
  // if not switch to the next player
});

btnNew.addEventListener ('click', function () {
  init ();
});
