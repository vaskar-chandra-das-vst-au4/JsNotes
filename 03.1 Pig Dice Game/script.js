"use strict";

//Selectig Elements--
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNewgame = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//! Starting Conditions--
let currentScore, activePlayer, playing, score;
const inititilization = function () {
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;
  diceEl.classList.add("hidden");
  player1El.classList.remove("player--active");
  player0El.classList.add("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
};
//! Inititilizationtilization of the starting state--
inititilization();

//! Js functionality--
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
btnRoll.addEventListener("click", function () {
  if (playing) {
    //@ 1.Generating a random number between 1 to 6;
    const dice = Math.trunc(Math.random() * 6) + 1;
    //@ 2.Displayinng the dice image according to the random number get generated on each click.
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    //@ 3.Player switching and adding current score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
//~ Holding the current score--
btnHold.addEventListener("click", function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      playing = false;
      diceEl.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

//! Resetting the game--
btnNewgame.addEventListener("click", inititilization);
