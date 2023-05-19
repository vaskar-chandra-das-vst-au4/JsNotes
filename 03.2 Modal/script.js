"use strict";
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");

//!Below are two Event handler functions.
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener("click", openModal);
  //@ here dont call the function with parenthesis otherwise it will directly call the event handler as soon as js get loaded in browser.
}
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

//!Here we are repeating the event handler multiple times.
// for (let i = 0; i < btnsOpenModal.length; i++) {
//   btnsOpenModal[i].addEventListener("click", function () {
//     modal.classList.remove("hidden");
//     overlay.classList.remove("hidden");
//   });
// }
// btnCloseModal.addEventListener("click", function () {
//   modal.classList.add("hidden");
//   overlay.classList.add("hidden");
// });
// overlay.addEventListener("click", function () {
//   modal.classList.add("hidden");
//   overlay.classList.add("hidden");
// });

//!Keypress Event---------------
//$Keyboard events are global events.Because they dont happen on a specific element.
//$Keyboard events are keypress,keyup,keydown.
// document.addEventListener("keydown", function () {
//   console.log(`A key was pressed.`);
//   //$Whenever the keydown event get executed js create an EVENT object in which the record of all events happened is being stored.
//   //$if we pass a parameter to this event handler then js will provide event object as a argument for the event handler function as soon as the keydown event get executed.
// });

document.addEventListener("keydown", function (e) {
  //console.log(e); // It will print the whole event object.
  //console.log(e.key); // It will print the key pressed only.
  //since "e" is an object so we can read the elements of this object like we use to do with normal objects.
  //------------------------------------------------
  if (e.key === "Escape") {
    // console.log(`Esc key was pressed.`);
    if (!modal.classList.contains("hidden")) {
      //If the modal doesnot contain hidden class then execute the the codes of if block.
      closeModal();
    }
  }
  //@---------------------------OR----------------

  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
  //----------------------------------------------------
});
