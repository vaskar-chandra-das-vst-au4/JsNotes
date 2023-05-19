"use strict";

//! Default parameters
/*
//By default if we dont provide arguments to a function then its parameters value js set to undefined.
//But we can set default values for them.
const bookings = [];
const createBooking = function (
  flightNum,
  numPassenger = 1,
  price = 199 * numPassenger
) {
  //In new method of setting default parameters we must ensure the order of parameter. we cant use any paramter before its execution. Such as in price we use numPassenger which we can only use if it is written before price.

  //This is an old method of setting default parameters.
  // numPassenger=numPassenger||1;
  // price=price||199*numPassenger;
  const booking = {
    flightNum,
    numPassenger,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking("LH123");
createBooking("LH123", 2, 800);
createBooking("LH123", 2);
createBooking("LH123", 5);
//We cant skip any parameters directly.BUT IF WE STILL WANT THEN WE NEED TO SET THAT PARAMETER TO UNDEFINED. Like this--
createBooking("LH123", undefined, 500);

const flight = "LH234";
const vaskar = {
  name: "Vaskar Chandra Das",
  passport: 24739689284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = "LH999";
  passenger.name = "Mr " + passenger.name;
  if (passenger.passport === 24739689284) {
    alert(`Checked in`);
  } else {
    alert(`Wrong passport`);
  }
};

// checkIn(flight, vaskar);
//"flight" is a primitive value so when we changed flightNum we actually changed the copy of actual global flight variable. That's why global flight var is not changed.
console.log(flight);
//But incase of object name its get changed because passenger object and vaskar object are two variable which are pointing towards a same memory address in a memory heap. so by changing one's property means that we are changing it for both.
console.log(vaskar);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000000) + 1;
};
newPassport(vaskar);
checkIn(flight, vaskar);
*/
/*
//! High order functions
const oneWord = function (str) {
  return str.replaceAll(" ", "").toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  const final = [first.toUpperCase(), ...others].join(" ");
  return final;
};

//! High order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`); //@  ".name" is a method use on function to find its source function name.
};
transformer(`Javascript is the best!`, upperFirstWord);
transformer(`Javascript is the best!`, oneWord);

const high5 = function () {
  console.log(`🖐`);
};

document.body.addEventListener("click", high5);
//here high5 is the function recieved by addEventListener function. so it is called high order function.

["vaskar", "mamata", "keshab", "basanti"].forEach(high5);

//! Functions Returning Functions.
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

//greet function return a function whose parameter is "name".
const x = greet(`Hey`); //Now x is the returned function.
x(`Vaskar`);
//this can aslo be done directly like this without storing return function...
greet(`Hey`)(`Biro`);

//Converting above greet function into arrow function.
const greetArrow = (greeting) => (name) => console.log(`${greeting} ${name}`);

greetArrow("Hi")("BIRO");
*/
// /*
//! Call and apply methods.

const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  //@ book:function(){}---Old method of writing methods.
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}.`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};
lufthansa.book(239, "Vaskar chandra das");
lufthansa.book(635, "Mamata das");
console.log(lufthansa.bookings);

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

//using the book method of lufthansa in eurowings can be done like this --
//1.first store the method book into an new variable before eurowings object then mention book varaible name into the object eurowings. then call it.

//But we will use modern method of doing it by manupulating the target object of this keyword.

//! Call method
lufthansa.book.call(eurowings, 23, "Binita tarafdar");
//the first argument is the target object of this keyword and other two are normal arguments for the method.
//OR
const book = lufthansa.book;
book.call(eurowings, 23, "Binita tarafdar");

lufthansa.book.call(eurowings, 25, "Tony stark");

const swiss = {
  airline: "Swiss Air Lines",
  iataCode: "LX",
  bookings: [],
};
lufthansa.book.call(swiss, 25, "Berden");
console.log(swiss.bookings);

//! Apply method.
//Apply method takes array as an argument unlike call method.
const flightData = [27, "Keshab Chandra Das"];

lufthansa.book.apply(eurowings, flightData);
//above code with call method.
lufthansa.book.call(eurowings, ...flightData);

//! Bind method
//@ Bind method return a new function. and it dont call the function immediately. It sets this keyword for the returned function.
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
console.log(111111111);
bookEW(44, "Basanti Das");
bookLX(44, "Basanti Das");
//@ We can create a new function from existing book function for booking of particular flight number or name.
const bookEW23 = book.bind(eurowings, 23); //# here we can set both parameter aslo. Like this....
// const bookEW231 = book.bind(eurowings, 23, "Bishal");
// bookEW231();
bookEW23("Binita Tarafdar");
bookEW23("Mamata Das");
bookEW23("Vaskar Chandra Das");

//! With event listeners.......
lufthansa.plane = 300;
lufthansa.buyPlane = function () {
  this.plane++;
  console.log(this);
  console.log(this.plane);
};

//@ This will not work because in event handler "this" keyword points to the html elements in which handler function is attached.
// document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane);
//~ and here we are using bind method to set back this keyword to buyPlane function because bind method dont call immediately the function unlike call and apply  method.
document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

//! PARTIAL APPLICATION--Preset parameter
const addTax = (rate, value) => value + value * (rate / 100);
console.log(addTax(10, 200));
//Here in the function there is no "this" keyword. So we can set this keyword in bind method to "null".
const addVAT = addTax.bind(null, 20);
//here this=null, rate=20 ,and value is not set.
//this is actually, addVAT=(value) => value+value*(20/100);
console.log(addVAT(200));
console.log(addVAT(625));
console.log(`------------------------------------`);
//rewriting above example without bind method..
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * (rate / 100);
  };
};

console.log(addTaxRate(10)(200));

const addVAT2 = addTaxRate(20);
console.log(addVAT2(200));
console.log(addVAT2(625));
//OR
// console.log(addTaxRate(20)(200));
// console.log(addTaxRate(20)(625));
// */
/////////////////////////////////////////////////////////
/*
//! Coding Challenge #1
// Let's build a simple poll app!
// A poll has a question, an array of options from which people can choose, and an
// array with the number of replies for each option. This data is stored in the starter
// 'poll' object below.
// Your tasks:
// 1. Create a method called 'registerNewAnswer' on the 'poll' object. The
// method does 2 things:
// 1.1. Display a prompt window for the user to input the number of the
// selected option. The prompt should look like this:
// What is your favourite programming language?
// 0: JavaScript
// 1: Python
// 2: Rust
// 3: C++
// (Write option number)
// 1.2. Based on the input number, update the 'answers' array property. For
// example, if the option is 3, increase the value at position 3 of the array by
// 1. Make sure to check if the input is a number and if the number makes
// sense (e.g. answer 52 wouldn't make sense, right?)
// 2. Call this method whenever the user clicks the "Answer poll" button.
// 3. Create a method 'displayResults' which displays the poll results. The
// method takes a string as an input (called 'type'), which can be either 'string'
// or 'array'. If type is 'array', simply display the results array as it is, using
// console.log(). This should be the default option. If type is 'string', display a
// string like "Poll results are 13, 2, 4, 1".
// 4. Run the 'displayResults' method at the end of each
// 'registerNewAnswer' method call.
// 5. Bonus: Use the 'displayResults' method to display the 2 arrays in the test
// data. Use both the 'array' and the 'string' option. Do not put the arrays in the poll
// object! So what should the this keyword look like in this situation?

// Test data for bonus:
// § Data 1: [5, 2, 3]
// § Data 2: [1, 5, 3, 9, 6, 1]
// Hints: Use many of the tools you learned about in this and the last section 😉
// GOOD LUCK 😀

const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),

  registerNewAnswer() {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join("\n")}\n(Write option number)`
      )
    );
    //register answer
    typeof answer === "number" &&
      answer < this.answers.length &&
      this.answers[answer]++;
    // console.log(this.answers);
    this.displayResults();
    this.displayResults("string");
  },

  displayResults(type = "array") {
    if (type === "array") {
      console.log(`${this.answers}`);
    } else if (type === "string") {
      console.log(`Poll results are ${this.answers.join(", ")}`);
    }
  },
};

document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

//BONUS.............
// [5, 2, 3]
// [1, 5, 3, 9, 6, 1]
poll.displayResults.call({ answers: [5, 2, 3] });
poll.displayResults.call({ answers: [5, 2, 3] }, "string");

poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, "string");

*/

/*
//IMMEDIATELY INVOEKD FUNCTION EXPRESSIONS (IIFE)..

const runOnce = function () {
  console.log(`This is not a IIFE`);
};
runOnce();

//IIFE
//IIFE can be use to create scope so that some variables cant be  manupulated from outside that scope.
//But this is an old method and we can do this by simply creating a block scope by curly braces.
(function () {
  console.log(`This is a IIFE therefore it can only be called once.`);
  const iAmPrivate = 40;
})();
//same with arrow function...These functions dont need names and it can only be done with function expressions.
//arrow function as IIFE
(() =>
  console.log(`This is ALSO a IIFE therefore it can only be called once.`))();

// console.log(iAmPrivate); //not accessible in global scope.
//Modern way of creating block scopes....
{
  const x = 23;
  var iAmPublic = 56;
}

console.log(iAmPublic); //varibles declared with var are not block scope so they can be accessible from global scope.
*/
/*
/////////////////////MOST IMPORTANT TOPIC -- CLOSURES//////////////////////////
//Example 1
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 12;
  f = function () {
    console.log(b * 10);
  };
};

g();
f();
console.dir(f); //use to look into internal properties.
//Reassigning f function....
h();
f();
console.dir(f);

//Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  //Timer function..
  //within setTimeout function any function will be executed according to decided time. which is in milliseconds.
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers.`);
    console.log(`There are 3 groups, each with ${perGroup} passengers.`);
  }, 1000 * wait);

  console.log(`Will start boarding in ${wait} seconds`);
};
boardPassengers(180, 3);

//Example 3
// Coding Challenge #2
// This is more of a thinking challenge than a coding challenge 🤓
// Your tasks:
// 1. Take the IIFE below and at the end of the function, attach an event listener that
// changes the color of the selected h1 element ('header') to blue, each time
// the body element is clicked. Do not select the h1 element again!
// 2. And now explain to yourself (or someone around you) why this worked! Take all
// the time you need. Think about when exactly the callback function is executed,
// and what that means for the variables involved in this example.
// GOOD LUCK 😀

(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";
  document.querySelector("body").addEventListener("click", function () {
    header.style.color = "blue";
  });
})();
*/
