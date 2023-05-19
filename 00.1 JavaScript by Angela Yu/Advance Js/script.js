"use strict";
const drumsContainer = document.querySelector(".set");
const drums = document.querySelectorAll(".drum");

const buttonAnimation = function (currKey) {
  currKey.classList.add("pressed");
  setTimeout(() => {
    currKey.classList.remove("pressed");
  }, 100);
};
const makeSound = function (key) {
  if (key === "w") {
    const tom1 = new Audio("sounds/tom-1.mp3");
    tom1.play();
  }
  if (key === "a") {
    const tom2 = new Audio("sounds/tom-2.mp3");
    tom2.play();
  }
  if (key === "s") {
    const tom3 = new Audio("sounds/tom-3.mp3");
    tom3.play();
  }
  if (key === "d") {
    const tom4 = new Audio("sounds/tom-4.mp3");
    tom4.play();
  }
  if (key === "j") {
    const snare = new Audio("sounds/snare.mp3");
    snare.play();
  }
  if (key === "k") {
    const crash = new Audio("sounds/crash.mp3");
    crash.play();
  }
  if (key === "l") {
    const kickBass = new Audio("sounds/kick-bass.mp3");
    kickBass.play();
  }
};

drumsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("drum")) {
    makeSound(e.target.textContent);
    buttonAnimation(e.target);
  }
});
document.addEventListener("keydown", function (e) {
  makeSound(e.key);
  const activeButton = document.querySelector(`.${e.key}`);
  buttonAnimation(activeButton);
});
