//! 1. Infinite Curring in Js
// Currying in JavaScript transforms a function with multiple arguments into a nested series of functions, each taking a single argument. Currying helps you avoid passing the same variable multiple times, and it helps you create a higher order function.
// sum(1)(2)(3)(4)................()

// Explanation -
// const sum = function (a) {
//    return function (b) {
//       return function (c) {
//          return function (d) {
//             return console.log(a + b + c + d);
//          };
//       };
//    };
// };

// Answer
// const sum = function (a) {
//    return function (b) {
//       if (b !== undefined) return sum(a + b);
//       else return a;
//    };
// };
// OR
// const sum = a => b => b !== undefined ? sum(a + b) : a;

// console.log(sum(1)(2)(3)(4)());

//! 2. Memoization
// Memoization in javascript is an optimization technique that stores the results of function calls in a temporary data structure and then retrieves the results whenever the stored result is needed in the program. By doing this, the execution time is reduced and the CPU performance is increased.

// let cache = {};
// const add = a => {
//    if (cache[a]) {
//       console.log('From cache');
//       return cache[a];
//    }

//    let sum = (a * (a + 1)) / 2;
//    console.log('Calculated');
//    cache[a] = sum;
//    return sum;
// };

// console.time();
// console.log(add(5));
// console.timeEnd();

// console.log('--------------');

// console.time();
// console.log(add(5));
// console.timeEnd();

// ! Debouncing
// Debouncing is a programming pattern or a technique to restrict the calling of a time-consuming function frequently, by delaying the execution of the function until a specified time to avoid unnecessary CPU cycles, and API calls and improve performance
// let counter = 0;
// const logger = () => console.log('searching', counter++);

// let timer;
// const listener = () => {
//    if (timer) clearTimeout(timer);
//    timer = setTimeout(() => logger(), 500);
// };

// document.querySelector('input').addEventListener('keyup', listener);
// ! new debouncing code
const makeApiCall = countdown => {
  console.log('Request made', countdown);
};
const makeBetter = function (fn, delay) {
  let timer;
  let counter = 0;

  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      counter++;
      fn(counter);
    }, delay);
  };
};
const efficientFn = makeBetter(makeApiCall, 1000);
document.getElementById('search').addEventListener('keyup', efficientFn);

// ! Throttling
// Throttling implies limiting the number of times a function gets called in a certain time period. It will prohibit a function from executing if we have invoked it “recently.” Throttling also guarantees that a function runs at a consistent rate.

// const button = document.querySelector('button');

// const expFn = () => console.log('Making an API call....');

// const makeBetter = (fn, limit) => {
//    let flag = true; // We can also use global flag variable instead of using closure
//    return () => {
//       if (flag) {
//          fn();
//          flag = false;
//          setTimeout(() => (flag = true), limit);
//       }
//    };
// };
// const throttledFn = makeBetter(expFn, 5000);

// button.addEventListener('click', throttledFn);

//! Find max and min

// const num = [23, 45, 12, 9, 56, 100, 46, 78, 3, 11, 67, 3, 899];

// const findMax = arr => {
//   let max = arr[0];
//   arr.forEach(n => {
//     if (max < n) return (max = n);
//   });

//   return max;
// };
// const findMin = arr => {
//   let min = arr[0];
//   arr.forEach(n => {
//     if (min > n) return (min = n);
//   });

//   return min;
// };

// console.log(findMax(num));
// console.log(findMin(num));

//! Reverse an array

// const reverse = arr => {
//   for (let i = 0; i < arr.length / 2; i++) {
//     [arr[i], arr[arr.length - 1 - i]] = [arr[arr.length - 1 - i], arr[i]];
//   }
//   return console.log(arr);
// };

// primeNum = [2, 3, 5, 7, 11, 13, 17];
// reverse(primeNum);

// ! Print Prime
// n = 2;
// while (n < 1000) {
//   isPrime = true;
//   for (let x = 2; x < Math.trunc(n / 2) + 1; x++) {
//     if (n % x === 0) {
//       isPrime = false;
//       break;
//     }
//   }
//   isPrime && console.log(n);
//   n++;
// }

// ! Test

// class Teacher {
//   constructor(teacherName, teacherRoll) {
//     this.teacherName = teacherName;
//     this.teacherRoll = teacherRoll;
//     console.log('Parent constructor');
//   }
//   copy = 12;

//   greet() {
//     console.log(`Welcome ${this.teacherName}!`);
//   }
// }

// class Student extends Teacher {
//   //   constructor(teacherName, teacherRoll, stdName, stdRoll) {
//   //     super(teacherName, teacherRoll);
//   //     this.stdName = stdName;
//   //     this.stdRoll = stdRoll;
//   //     console.log('Child constructor');
//   //   }
//   //   welcome() {
//   //     console.log(`Welcome ${this.stdName}!`);
//   //   }
// }

// const student1 = new Student('Rohan', 1002);
// const student2 = new Student('Vaskar', 1005);
// console.log(student1.hasOwnProperty('teacherName'));
// console.log(student1.hasOwnProperty('teacherRoll'));
// console.log(student1.hasOwnProperty('copy'));
// console.log(student2.hasOwnProperty('copy'));
// console.log(student1.hasOwnProperty('greet'));
// console.log(student1.__proto__);
// console.log(student1);
// console.log(student1.teacherName);
// console.log(student1.teacherRoll);
// console.log(student1.copy);
// console.log(student2.copy);
// student1.__proto__.__proto__.greet();
// student1.greet();
// student2.greet();
// console.log(student1.copy);

// const str = '000000117777888';
// const removeDuplicates = str => {
//   let convertedArr = [...str];
//   let unique = [];
//   for (let x = 0; x < convertedArr.length; x++) {
//     if (!unique.includes(`${convertedArr[x]}`)) unique.push(convertedArr[x]);
//   }
//   return unique.join('');
// };
// console.log(removeDuplicates(str));

// class Person {
//   constructor(firstName, lastName, age) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.age = age;
//     // console.log('I am Parent constructor');
//   }

//   #testVar = 'hello what happend?'; // this is aslo a instance variable so only accessed from instances.
//   intro() {
//     console.log(
//       `Person ${this.firstName} ${this.lastName} is of age ${this.age}.`
//     );
//     console.log(testVar);
//   }

//   set age(age) {
//     if (age > 18) this._age = age;
//     else alert('Your are not eligible');
//   }
//   get age() {
//     return this._age;
//   }
//   static hello() {
//     console.log('Hello I am a Static method!');
//   }
// }

// class Student extends Person {
//   constructor(firstName, lastName, age, course) {
//     super(firstName, lastName, age);
//     this.course = course;
//     // console.log('I am child constructor');
//   }
// }
// const vaskar = new Person('Vaskar', 'Chandra Das', 25);
// const mamata = new Person('Mamata', 'Das', 20);
// console.log(vaskar._age);
// console.log(vaskar.age);
// console.log(vaskar);
// console.log(Person.prototype.constructor);
// console.log(vaskar.testVar);
// vaskar.testVar = 123;
// console.log(vaskar.testVar);
// console.log(mamata.testVar);

// const s1 = new Student('Rohan', 'Aich', 23, 'MCA');
// const success = position => {
//   console.log(position);
// };
// const failed = function () {
//   console.log(`Failed to get your location!`);
// };

// navigator.geolocation.getCurrentPosition(success, failed);
// Promise.resolve('This is a immediately resolved promise.').then(res =>
//   console.log(res)
// );
// let flag = Math.trunc(Math.random() * 2) === 1 ? true : false;
// // console.log(flag);
// const testPromise = new Promise((resolve, reject) => {
//   flag && resolve('Your promise is resolved as flag is set true');
//   !flag && reject('Sorry the promise is got rejected as flag is set false');
// });
// testPromise.then(res => console.log(res)).catch(error => console.log(error));

// const sendReq = async function () {
//   try {
//     const res = await fetch(
//       'https://vcdas-natours-app.onrender.com/api/v1/tours'
//     );
//     const data = await res.json();
//     if (data.status === 'fail') throw new Error('SOMETHING WENT WRONG!');
//     console.log(data);
//   } catch (err) {
//     console.error(err.message);
//   }
// };
// sendReq();

// const alphabet = {};

// testStr = 'Vaskar Chandra Das';

// testStr
//   .toLowerCase()
//   .replaceAll(' ', '')
//   .split('')
//   .forEach(letter => {
//     if (!alphabet[letter]) alphabet[letter] = 1;
//     else alphabet[letter] += 1;
//   });

// console.log(alphabet);

// const alphabet = {};

// testStr = 'Vaskar Chandra Das'.toLowerCase();

// for (let x = 0; x < testStr.length; x++) {
//   if (testStr[x] === ' ') continue;
//   if (!alphabet[testStr[x]]) alphabet[testStr[x]] = 1;
//   else alphabet[testStr[x]] += 1;
// }

// console.log(alphabet);
// const makeFiboSeries = x => {
//   const series = [0, 1];
//   if (x === 0) return [0];
//   while (series.at(-1) < x) {
//     series.push(series.at(-1) + series.at(-2));
//   }
//   series.pop();
//   return series;
// };

// const x = makeFiboSeries(0);
// console.log(...x);

// const series = [0, 1];
// const makeFiboSeries = x => {
//   if (x === 0) return [0];
//   if (series.at(-1) < x) series.push(series.at(-1) + series.at(-2));
//   else {
//     series.pop();
//     return series;
//   }
//   return makeFiboSeries(x);
// };

// const x = makeFiboSeries(500);
// console.log(...x);
