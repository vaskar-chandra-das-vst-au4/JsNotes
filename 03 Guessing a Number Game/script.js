"use strict";
/* console.log(document.querySelector(".message").textContent);
//here document.querySelector() is a special obejct that is the entry point to the DOM. It use to select the elements with their content.
//.textContent use to select only the content of the element.
document.querySelector(".message").textContent = "Hello Biro"; //this is hows we can manupulate the content of any element using dom.
// ----------------------WHAT_IS_DOM------------------
//DOM-document object model is a structured representation of html documents. allows js to access html elements and styles to manupulate them.
//DOM methods and properties are the part of web APIs (application programming interface) APIs are the libraries which browser implement and these thing we can access with the help  of javascript
// ---------------------------------------------------

//here we provide a number to input field.
// .value is used to check a value of an input field.
document.querySelector(".guess").value = 23;
console.log(document.querySelector(".guess").value);
*/

// ----------------HANDLING_CLICK_EVENTS--------------
let secretNumber = Math.trunc(Math.random() * 6) + 1;

let score = 20;
let highscore = 0;
const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};
//Here addEventListener is a method which will respond when the selected element get clicked. The function here is called a event handler it tells what need to be done after the user click.
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  if (!guess) {
    //When no input recieved
    if (score > 1) {
      // document.querySelector(".message").textContent = "⛔ No Number!";
      displayMessage("⛔ No Number!");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      // document.querySelector(".message").textContent = "😭 You lost the Game !";
      displayMessage("😭 You lost the Game !");
      document.querySelector(".score").textContent = 0;
    }
  } else if (guess !== secretNumber) {
    //when guess is wrong.
    if (score > 1) {
      // document.querySelector(".message").textContent =
      //   guess > secretNumber ? "📈 Too high!" : "📉 Too low!"; //here ternary operator is used to make the code dry..making the code dry is called refactoring.
      displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      // document.querySelector(".message").textContent = "😭 You lost the Game !";
      displayMessage("😭 You lost the Game !");
      document.querySelector(".score").textContent = 0;
    }
  }
  //  else if (guess > secretNumber) {
  //   //When input is greater than the secretnumber.
  //   if (score > 1) {
  //     document.querySelector(".message").textContent = "📈 Too high!";
  //     score--;
  //     document.querySelector(".score").textContent = score;
  //   } else {
  //     document.querySelector(".message").textContent = "😭 You lost the Game !";
  //     document.querySelector(".score").textContent = 0;
  //   }
  // } else if (guess < secretNumber) {
  //   //When input is smaller than the secretnumber.
  //   if (score > 1) {
  //     document.querySelector(".message").textContent = "📉 Too low!";
  //     score--;
  //     document.querySelector(".score").textContent = score;
  //   } else {
  //     document.querySelector(".message").textContent = "😭 You lost the Game !";
  //     document.querySelector(".score").textContent = 0;
  //   }
  // }
  else if (guess === secretNumber) {
    //When input is equal to the secretnumber.
    if (score > 1) {
      // document.querySelector(".message").textContent = "🎉 Correct Number!";
      displayMessage("🎉 Correct Number!");
      document.querySelector("body").style.backgroundColor = "#60b347";
      document.querySelector(".number").style.width = "30rem";
      document.querySelector(".number").textContent = secretNumber;

      if (score > highscore) {
        highscore = score;
        document.querySelector(".highscore").textContent = highscore;
      }
    } else {
      // document.querySelector(".message").textContent = "😭 No chance remain!";
      displayMessage("😭 No chance remain!");
    }
  }
});

document.querySelector(".again").addEventListener("click", function () {
  secretNumber = Math.trunc(Math.random() * 6) + 1;
  score = 20;
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").style.width = "15rem";

  document.querySelector(".number").textContent = "?";
  // document.querySelector(".message").textContent = "Start guessing...";
  displayMessage("Start guessing...");
  document.querySelector(".guess").value = "";
  document.querySelector("body").style.backgroundColor = "#222";
});
