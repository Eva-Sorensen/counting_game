"use strict";

// Selecting elements
const player1Element = document.querySelector(".player-1");
const player2Element = document.querySelector(".player-2");
const aim1Element = document.getElementById("aim-1");
const aim2Element = document.getElementById("aim-2");
const total1Element = document.getElementById("total-1");
const total2Element = document.getElementById("total-2");
const diceElement = document.querySelector(".dice");
const btnNewElement = document.querySelector(".btn-new");
const btnRollElement = document.querySelector(".btn-roll");
const btnAddElement = document.querySelector(".btn-add");
const btnSubElement = document.querySelector(".btn-sub");

//variables
let player1Active;
let aims;
let totals;
let diceAmount;

// methods
const getAim = () => Math.floor(Math.random() * 10) + 10;
const getRoll = () => Math.floor(Math.random() * 6) + 1;

const reset = function () {
  aims = {
    player1: getAim(),
    player2: getAim(),
  };

  totals = {
    player1: 0,
    player2: 0,
  };
  aim1Element.textContent = aims.player1;
  aim2Element.textContent = aims.player2;
  total1Element.textContent = totals.player1;
  total2Element.textContent = totals.player2;
  player1Active = true;
  btnRollElement.disabled = false;
  btnAddElement.disabled = true;
  btnSubElement.disabled = true;
  btnRollElement.classList.remove("disabled");
  btnAddElement.classList.add("disabled");
  btnSubElement.classList.add("disabled");
  diceElement.classList.add("hidden");
  player1Element.classList.add("player-active");
  player1Element.classList.remove("player-winner");
  player2Element.classList.remove("player-active", "player-winner");
};

const changeActivePlayer = function () {
  player1Element.classList.toggle("player-active");
  player2Element.classList.toggle("player-active");
  player1Active ? (player1Active = false) : (player1Active = true);
};

const toggleBtnDisabled = function () {
  btnSubElement.disabled = !btnSubElement.disabled;
  btnSubElement.classList.toggle("disabled");
  btnAddElement.disabled = !btnAddElement.disabled;
  btnAddElement.classList.toggle("disabled");
  btnRollElement.disabled = !btnRollElement.disabled;
  btnRollElement.classList.toggle("disabled");
};

const btnDisabledAll = function () {
  btnSubElement.disabled = true;
  btnSubElement.classList.add("disabled");
  btnAddElement.disabled = true;
  btnAddElement.classList.add("disabled");
  btnRollElement.disabled = true;
  btnRollElement.classList.add("disabled");
};

const updateTotalDisplay = function () {
  total1Element.textContent = totals.player1;
  total2Element.textContent = totals.player2;
};

const checkWinCondition = function () {
  if (totals.player1 === aims.player1 || totals.player2 === aims.player2) {
    totals.player1 === aims.player1
      ? player1Element.classList.add("player-winner")
      : player2Element.classList.add("player-winner");
    player1Element.classList.remove("player-active");
    player2Element.classList.remove("player-active");
    diceElement.classList.add("hidden");
    btnDisabledAll(true);
  }
};

const btnRollHandler = function () {
  const diceValue = getRoll();
  diceElement.classList.remove("hidden");
  diceElement.src = `images/dice${diceValue}.png`;
  diceAmount = diceValue;
  toggleBtnDisabled();
};

const btnAddHandler = function () {
  player1Active
    ? (totals.player1 += diceAmount)
    : (totals.player2 += diceAmount);
  updateTotalDisplay();
  changeActivePlayer();
  toggleBtnDisabled();
  checkWinCondition();
};

const btnSubHandler = function () {
  player1Active
    ? (totals.player1 -= diceAmount)
    : (totals.player2 -= diceAmount);
  updateTotalDisplay();
  changeActivePlayer();
  toggleBtnDisabled();
  checkWinCondition();
};

const btnNewHandler = function () {
  reset();
};

reset();
btnRollElement.addEventListener("click", btnRollHandler);
btnAddElement.addEventListener("click", btnAddHandler);
btnSubElement.addEventListener("click", btnSubHandler);
btnNewElement.addEventListener("click", btnNewHandler);
