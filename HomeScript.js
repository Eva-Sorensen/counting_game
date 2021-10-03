"use strict";

// Selecting elements
const btnInfoElement = document.querySelector(".btn-info");
const btnMode1Element = document.querySelector(".btn-mode1");
const btnMode2Element = document.querySelector(".btn-mode2");

//methods
const changeToTwoPlayerMode = function () {
  window.location.href = "twoPlayer.html";
};

btnMode2Element.addEventListener("click", changeToTwoPlayerMode);
