"strict";
/*
//Leap year with the help of dom.

function msgBox(message) {
  document.querySelector("h2").textContent = message;
}

document.querySelector(".click").addEventListener("click", function () {
  let year = document.querySelector(".year").value;

  if (year % 4 === 0) {
    if (year % 100 === 0) {
      if (year % 400 === 0) {
        msgBox(`The Entered Year is a Leap year.`);
      } else {
        msgBox(`The Entered Year is not a Leap year.`);
      }
    } else {
      msgBox(`The Entered Year is a Leap year.`);
    }
  } else {
    msgBox(`The Entered Year is not a Leap year.`);
  }
});

//leap year checker without dom.
// let x = prompt(`Enter the Year`);

// let leapYearChecker = function (year) {
//   if (year % 4 === 0) {
//     if (year % 100 === 0) {
//       if (year % 400 === 0) {
//         alert(`The Entered Year is a Leap year.`);
//       } else {
//         alert(`The Entered Year is not a Leap year.`);
//       }
//     } else {
//       alert(`The Entered Year is a Leap year.`);
//     }
//   } else {
//     alert(`The Entered Year is not a Leap year.`);
//   }
// };

// leapYearChecker(x);
// --------------------------------------------------------------------------------------

// arrays

// let x = 1;
// let arrayTest = [];

// function game() {
//   arrayTest.push(x++); //this is post increment means first x gets added and then x gets incremented.
//   //++x is a pre increment.
//   //the above code means

//   //arrayTest.push(x);
//   // x++;
//   console.log(arrayTest);
// }
// ----------------fizz and buzz------------------------------
let x = 1;
let arrayTest = [];

function game() {
  if (x % 3 === 0 && x % 5 === 0) {
    arrayTest.push("FizzBuzz");
  } else if (x % 5 === 0) {
    arrayTest.push("Buzz");
  } else if (x % 3 === 0) {
    arrayTest.push("Fizz");
  } else {
    arrayTest.push(x);
  }
  x++;

  console.log(arrayTest);
}
// ----------------------Fizzbuzz with while loop-------------------------------------------------
let x = 1;
let arrayTest = [];

function game() {
  while (x <= 100) {
    if (x % 3 === 0 && x % 5 === 0) {
      arrayTest.push("FizzBuzz");
    } else if (x % 5 === 0) {
      arrayTest.push("Buzz");
    } else if (x % 3 === 0) {
      arrayTest.push("Fizz");
    } else {
      arrayTest.push(x);
    }
    x++;
  }
  console.log(arrayTest);
}

//=================================Example_of_While_loop=============================================
let x = 99;
function lyrics() {
  while (x >= 0) {
    if (x === 1) {
      console.log(`
      ${x} bottles of beer on the wall,
      ${x} bottles of bear,
      Take one down and pass it around, no bottles of beer on the wall.`);
    } else if (x === 0) {
      console.log(`
      No more bottles of beer on the wall,
      no more bottles of bear.
      Go to the store and buy some more,
      ${x + 99} bottles of beer on the wall.`);
    } else {
      // console.log(`${x} bottles of beer on the wall, ${x} bottles of bear,
      // Take one down and pass it around, ${--x} bottles of beer on the wall.`);
      // ++x; //Reason written below in for loop.
      console.log(`
      ${x} bottles of beer on the wall,
      ${x} bottles of bear,
      Take one down and pass it around,
      ${x - 1} bottles of beer on the wall.`);
    }
    x--;
  }
}

// -----------Below is the same example with for LOOP----------`

function lyrics1() {
  for (let i = 99; i >= 0; i--) {
    if (i === 1) {
      console.log(`
      ${i} bottles of beer on the wall,
      ${i} bottles of bear,
      Take one down and pass it around, no bottles of beer on the wall.`);
    } else if (i === 0) {
      console.log(`
      No more bottles of beer on the wall,
      no more bottles of bear.
      Go to the store and buy some more,
      ${i + 99} bottles of beer on the wall.`);
    } else {
      // console.log(`${i} bottles of beer on the wall, ${i} bottles of bear,
      // Take one down and pass it around, ${--i} bottles of beer on the wall.`);
      // ++i;

      //Here --i which is equal to i=i-1 , decrement the value 99 to 98 and then reassign the variable with the value 98 and then counter i-- changes the i=98 to i=97 as it is coded to substract one after each iteration. so to overcome this problem after these codes ++i is written which is a pre increment operator and increase the value i=98 to i=99 so the counter i-- can change it into i=98 after first iteration.

      console.log(`
      ${i} bottles of beer on the wall,
      ${i} bottles of bear,
      Take one down and pass it around,
      ${i - 1} bottles of beer on the wall.`);
    }
  }
}

//Fibonacci Code challenge--------

function fibonacciGenerator(n) {
  let output = [];
  if (n === 1) {
    output = [0];
  } else if (n === 2) {
    output = [0, 1];
  } else {
    output = [0, 1];

    // for (i = 2; i < n; i++) {
    //   output.push(output[output.length - 2] + output[output.length - 1]);
    // }
    while (output.length !== n) {
      output.push(output[output.length - 2] + output[output.length - 1]);
    }
  }
  return output;
}
*/
