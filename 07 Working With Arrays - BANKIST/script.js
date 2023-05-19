'use strict';
/////////////////////////////////////////////////
/////////////////////////////////////////////////
//!  BANKIST APP

//!  Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

//!  Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//! *****************BANKIST**APP*******************//

//@ Display movements***************************
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ''; //@  It will remove the previous entries ..which was predefined in html code.

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  //@  movements.slice().sort((a, b) => a - b) result of it will be a sorted array. Here sort is use to make a copy of original movements because sort method manupulate the original array.
  movs.forEach(function (m, i) {
    const type = m > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${m}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
    //@  It will push a entire lines of html codes in original html code file..
  });
};

//! Displaying current balance***************
const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

//! Displaying summary*****************
const calcDisplaySummary = account => {
  //@ money in
  const income = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}€ `;
  //@ money out
  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€ `;

  //@ Interest earned....
  // const interest =
  //   account.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0) * 0.012;
  // labelSumInterest.textContent = `${interest}€ `;
  //@  OR
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * account.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest}€ `;
};

//! Creating usernames of all accounts*****************
//@  This function recieve a object from an array from which it extract the owner name ..with that owner name this function will create a new property in the object which will contain the username.
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(namE => namE[0])
      .join('');
  });
};
createUsernames(accounts);
// console.log(accounts);

//! Update UI****************
const updateUI = function (acc) {
  //@ Display Movements
  displayMovements(acc.movements);

  //@ Display balance
  calcPrintBalance(acc);

  //@ Displaying summary
  calcDisplaySummary(acc);
};

//! Clear input fields**********
const clrInput = function (a, b) {
  //@  Clear input fields
  //@  This will work because assignement operator gets executed from right to left.
  //@  Removing cursor marker and their values from input field
  a.value = b.value = '';
  //@  Removing cursor marker from input field
  a.blur();
  b.blur();
};

//! EVENT HANDLERS************
//@ Implementing LOGIN feature
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  //@  This click event get aslo initiated if we press enter in the input fields.
  //@  This is because all the input fields and submit button are in the same form element.

  //@ Prevent from form from submitting..
  //@  as when a submit button in place within form element it then when we click on it the page gets reloaded. so to prevent that behaviour the following code has to be written .
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //@ Clear transfer section data
    clrInput(inputLoginUsername, inputLoginPin);

    //@ Display the UI and Welcome msg
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //@ updateUI
    updateUI(currentAccount);

    //@ Clear transfer section data
    clrInput(inputTransferAmount, inputTransferTo);
  }
});

//! Transfer section
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // console.log(recieverAcc, amount);

  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.username
  ) {
    //@ Doing transfer
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);
  }

  //@ updateUI
  updateUI(currentAccount);

  //@ Clear transfer section data
  clrInput(inputTransferAmount, inputTransferTo);
});

//! Closing the current account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  //@  Checking for correct current username and pin
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    //! THE FIND INDEX METHOD -->>>
    //@ Finding the current account index in the accounts array for using it to delete the account.
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    //@ Deleting Current account from accounts array
    accounts.splice(index, 1);

    //@ Hide UI
    containerApp.style.opacity = 0;

    //@ Clear inputs
    clrInput(inputCloseUsername, inputClosePin);
  }
});
//! Getting loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);

    updateUI(currentAccount);
    clrInput(undefined, inputLoanAmount); //@  Here we dont need first argument so we set its value to undefined.
  }
});

//! Implementing sorting of movements using sort method
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();

  //@ sorted and unsorted system using not equal assignment operator
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
  //@  OR
  //@ sorted and unsorted system using if else statement
  // if (sorted) {
  //   displayMovements(currentAccount.movements, false);
  //   sorted = false;
  // } else {
  //   displayMovements(currentAccount.movements, true);
  //   sorted = true;
  // }
});

// /*

//!  THEORY -->

//!  ARRAY METHODS ------>>

let arr = ['a', 'b', 'c', 'd', 'e'];
//@  SLICE METHOD -> Return a new array without manupulating the original array.
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
//@  Ccopy of original array using slice method.
console.log(arr.slice());
//@  OR
console.log([...arr]);

//@  SPLICE METHOD -> Unlike slice method its manupulate the original array.
//splice(start, deleteCount)
// console.log(arr.splice(2));
console.log(arr.splice(-1));
console.log(arr);
arr.splice(1, 2);
console.log(arr);
//@  We genrally use splice method to delete elements of an array.

//@  REVERSE METHOD ->This method manupulate the original array.
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());

//@  CONCAT METHOD
const letters = arr.concat(arr2);
console.log(letters);
//@  OR
console.log([...arr, ...arr2]);

//@ JOIN METHOD ->
//@  This return string but it dosent manupulate original string.
console.log(letters.join(' - '));

//! NEW ES2022 AT METHOD --->>
const arrData = [23, 11, 778];
//@ Printing first element of an array
console.log(arrData[0]);
//@  OR
console.log(arrData.at(0));
//@ Printing last element of an array
console.log(arrData[arrData.length - 1]);
//@  OR
console.log(arrData.slice(-1)[0]);
console.log(arrData.at(-1));

//@ At method aslo work on strings....
console.log('Vaskar'.at(0));
console.log('Vaskar'.at(-1));

//@  Other methods are include(),indexOf(),shift(),push(),pop(),unshift(),...etc.
// */
/*
//! LOOPING ARRAYS USING forEach LOOP....
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//Looping with "for of" loop
for (const [i, m] of movements.entries()) {
  if (m > 0) {
    console.log(`Movement ${i + 1} : You deposited ${m}`);
  } else {
    console.log(`Movement ${i + 1} : You withdrew ${Math.abs(m)}`);
  }
}
//Looping with forEach loop
console.log(`----FOREACH----`);

//@  Here forEach loop will call this call back anonymous function..This aslo provide arguments to the function in each array.. the first argument will be the value or element at each iteration 2nd is index or key of that iteration and the 3rd one is the whole array on which looping is done. This loop dosent have break and continue .
movements.forEach(function (m, i, arr) {
  if (m > 0) {
    console.log(`Movement ${i + 1} : You deposited ${m}`);
  } else {
    console.log(`Movement ${i + 1} : You withdrew ${Math.abs(m)}`);
  }
  //   console.log(arr);
});

//! Looping over SETS and MAPS using forEach loop
//! ON MAPS
const currenciesArray = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
//@ Third parameter is the whole map on which looping is done.
currenciesArray.forEach(function (value, key, map) {
  console.log(`${key} : ${value}`);
});
//! ON SETS
const currenciesSet = new Set(['USD', 'EUR', 'GBP', 'Rs', 'USD', 'EUR']);
currenciesSet.forEach(function (value, _, set) {
  console.log(value);
});
//@ here value=key it is because set dont has keys and indexes so both are same..therefore we can omit that parameter.By using _ in place of key.
*/

/*
//!  Coding Challenge #1
// Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
// about their dog's age, and stored the data into an array (one array for each). For
// now, they are just interested in knowing whether a dog is an adult or a puppy.
// A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
// old.
// Your tasks:
// Create a function 'checkDogs', which accepts 2 arrays of dog's ages
// ('dogsJulia' and 'dogsKate'), and does the following things:
// 1. Julia found out that the owners of the first and the last two dogs actually have
// cats, not dogs! So create a shallow copy of Julia's array, and remove the cat
// ages from that copied array (because it's a bad practice to mutate function
// parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1
// is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy
// 🐶
// ")
// 4. Run the function for both test datasets
// Test data:
// § Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
// § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
// Hints: Use tools from all lectures in this section so far 😉
// GOOD LUCK 😀


const checkDogs = function (dogsJulia, dogsKate) {
  const correctedJulia = dogsJulia.slice(1, 3);
  const bothDogsData = [...correctedJulia, ...dogsKate];
  //or cont bothDogsData=correctedJulia.concat(dogsKate);
  bothDogsData.forEach(function (a, i) {
    a >= 3
      ? console.log(`Dog number ${i + 1} is an adult, and is ${a} years old🐶`)
      : console.log(
          `Dog number ${i + 1} is still a puppy, and is ${a} years old🐶`
        );
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/
/*
//!  Transformation using MAP METHOD --->>
const currenciesArray = [1002, -354, 455, 5697, -89, 9, 32, 459];
const conversionValue = 1.1;
//@ map method return a new array and it doesnot mutate the original one.The function used in this method is called callback function.
const mapTest = currenciesArray.map(function (value) {
  return value * conversionValue;
});
console.log(mapTest);
// !*********************Conversion of callback function expression into arrow function************************************
const mapTestArrow = currenciesArray.map(value => value * conversionValue);
console.log(mapTestArrow);

//! *********same thing using for of loop************************
const mapTest1 = [];
for (const value of currenciesArray) {
  mapTest1.push(value * conversionValue);
}
console.log(mapTest1);

const mapTestDescription = currenciesArray.map(
  (m, i) =>
    `Movement ${i + 1} : You ${m > 0 ? 'deposited' : 'withdrew'} ${Math.abs(m)}`
);

console.log(mapTestDescription);

//!  Transformation using Filter METHOD ----->>>>
//@ Has same parameters like map and forEach methods..
const deposits = currenciesArray.filter(value => value > 0);
//OR
// const deposits = currenciesArray.filter(function (value) {
//   return value > 0;
// });
console.log(deposits);

const withdrawal = currenciesArray.filter(v => v < 0);
console.log(withdrawal);

//@ Same thing using for of loop.....
const withdrawal1 = [];
for (const v of currenciesArray) if (v < 0) withdrawal1.push(v);
console.log(withdrawal1);
//! Transformation using Reduce METHOD ---->>>>
//@  Syntax - balance.reduce(function(accumulator,currentValue,index,array){return accumulator + currentValue;},initial Value of accumulator parameter)
//@  By using reduce method we can chain multiple differenet method at once but it is not possible if we use loops such as for of loop.
// const balance = currenciesArray.reduce(function (acc, cur, i, arr) {
//   return acc + cur;
// }, 0);
// console.log(balance);
const balance = currenciesArray.reduce((acc, cur, i, arr) => acc + cur, 0);
console.log(balance);
//@  OR
//@  same using for of loop
let sum = 0;
for (const cur of currenciesArray) {
  sum += cur;
}
console.log(sum);
//@  Finding maximum value out of all elements in an array using reduce method
const max = currenciesArray.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
  //@  In each iteration the return value gets stored in acc varaible.
}, currenciesArray[0]);
console.log(max);

//!  Coding Challenge 2 --->
// Let's go back to Julia and Kate's study about dogs. This time, they want to convert
// dog ages to human ages and calculate the average age of the dogs in their study.
// Your tasks:
// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
// ages ('ages'), and does the following things in order:
// 1. Calculate the dog age in human years using the following formula: if the dog is
// <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
// humanAge = 16 + dogAge * 4
// 2. Exclude all dogs that are less than 18 human years old (which is the same as
// keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know
// from other challenges how we calculate averages 😉)
// 4. Run the function for both test datasets
// Test data:
// § Data 1: [5, 2, 4, 1, 15, 8, 3]
// § Data 2: [16, 6, 10, 5, 6, 1, 4]
// GOOD LUCK 😀

const Data1 = [5, 2, 4, 1, 15, 8, 3];
const Data2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = ages => {
  //Calculating Human ages....
  // let humanAge = [];
  // ages.forEach(age => {
  //   age <= 2 ? humanAge.push(2 * age) : humanAge.push(16 + age * 4);
  // });
  // console.log(`The human ages are ${humanAge.join(' ')}`);

  //@  OR

  //@  Calculating Human ages....
  let humanAge = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  console.log(
    `Human ages are ${humanAge.slice(0, -1).join(',')} and ${humanAge
      .slice(-1)
      .join('')}.`
  );

  //@ Filtering Ages...
  const adults = humanAge.filter(age => age >= 18);
  console.log(
    `Adult ages are ${adults.slice(0, -1).join(',')} and ${adults
      .slice(-1)
      .join('')}.`
  );

  //@ Calculating average
  // const calAvg = `The average of adults is ${
  //   adults.reduce((acc, age) => acc + age, 0) / adults.length
  // }`;
  //@  OR
  //avg of 2 and 3 => (2/2) + (3/2)= 2.5 or (2+3)/2=2.5
  const calAvg = `The average of adults is ${adults.reduce(
    (acc, age, _, arr) => acc + age / arr.length,
    0
  )}`;

  return calAvg;
};

console.log(calcAverageHumanAge(Data1));
console.log(calcAverageHumanAge(Data2));

//! Chaining methods --------->>>>>>>>
const total = currenciesArray
  .filter(mov => mov > 0)
  .map(mov => {
    return mov * 1.1;
  })
  .reduce((acc, mov) => acc + mov, 0);
console.log(total);

//! *************Coding Challenge #3*************
//@  Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time as an arrow function, and using chaining!

// @Test data:
// § Data 1: [5, 2, 4, 1, 15, 8, 3]
// § Data 2: [16, 6, 10, 5, 6, 1, 4]
// GOOD LUCK 😀

//@ Solution.........
const Data11 = [5, 2, 4, 1, 15, 8, 3];
const Data21 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAgeArrow = ages => {
  let avg = ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, _, arr) => acc + age / arr.length, 0);
  return avg;
};
console.log(calcAverageHumanAgeArrow(Data11));
console.log(calcAverageHumanAgeArrow(Data21));

//! **********The find method*************
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);
console.log(movements);
//@  the find method use to get a single element which satisfy the condition present in the call back function.
//@  Unlike filter method it return a single value rather than a complete array of elements which satisfied the condition of callback function attached to the method find.
//@  if multiple elements satisfy the condition then find method will return only the first element.

const account = accounts.find(acc => acc.owner === 'Jessica Davis'); //It will return the object which satisfy the condition.
console.log(account);

//@  same thing with for of loop
let accountForOf;
for (const acc of accounts) {
  if (acc.owner === 'Jessica Davis') accountForOf = acc;
}
console.log(accountForOf);
*/
/*
//!  Some and Every methods----->>>>

//! Some method
//@  if the condition of callback function attached to "some" method is satisfied by any one element of the array then this method will return true.
console.log(account1.movements.some(mov => mov > 0));
console.log(account4.movements.some(mov => mov < 0));

//@  Every method is the opposite of some method in this every element need to satisfy the condition to get true as return.
console.log(account4.movements.every(mov => mov > 0));

//@  Separate callback function
const deposits = mov => mov > 0;
console.log(account4.movements.some(deposits));
console.log(account4.movements.every(deposits));
console.log(account4.movements.filter(deposits));

//! Flat and flatMap method
arr = [1, 2, [3, 4], 5, 6, 7, [8, 9, 10]];
const arrDeep = [1, 2, [3, 4], 5, 6, 7, [8, [9, 10]]];
//@  Spread operator cant take out nested elements without the help of destructuring.
console.log(...arr);
//@  But flat method can
//@  Flat method return a new array with all elements even the nested ones.
//@  By default it can flat only one level of nesting.
//@  but we can change it simply providing argument greater than 1 as 1 is default flating in which only one level of flating can be possible.
console.log(arr.flat());
console.log(arrDeep.flat());
console.log(arrDeep.flat(2));

//@ Old method of doing this......
// const [a, b, c, d] = [...accounts];
// console.log(a, b, c, d);
// const accountMovements = [
//   ...a.movements,
//   ...b.movements,
//   ...c.movements,
//   ...d.movements,
// ];
// console.log(accountMovements);

//@  OR

// const accountMovements = [];
// for (const mov of accounts) {
//   accountMovements.push(...mov.movements);
// }
// console.log(accountMovements);
// const allMovementsSum = accountMovements.reduce((acc, mov) => acc + mov,0);
// console.log(allMovementsSum);

//@  OR

//! New method using Flat method
const accountMovements = accounts.map(mov => mov.movements);
console.log(accountMovements);
const allMovements = accountMovements.flat();
console.log(allMovements);
//@ Adding all movements...
const allMovementsSum = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(allMovementsSum);

//@  OR
//@ chaining
const sumMovements = accounts
  .map(mov => mov.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(sumMovements);
//@  OR
//! flatMap method
//@  Flat map method first map the array then it flat the array
const sumMovements1 = accounts
  .flatMap(mov => mov.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(sumMovements1);

//! SORT METHOD**************************
//@ Sort method work on the basis of strings nut not on numbers and it mutate the original array.

//! SORTING STRINGS
//@ It will arange alphabetically..
const firstName = ['Vaskar', 'Mamata', 'Keshab', 'Basanti'];
console.log(firstName.sort());
w
//! SORTING NUMBERS

//! return < 0 | A , B (Position remain unchanged)
//! return > 0 | B , A (Position get swaped)
//! THAT IS POSITION GET SWAPPED IF RETURN VALUE IS GREATER THAN ZERO
//! AND POSITION REMAIN UNCHANGED IF RETURN VALUE IS LESS THAN ZERO.
//! It is not mandatory to have return 1 or -1 it can be any other number.
//@ Raw Data
const transaction = [...account1.movements];
console.log(transaction);

//! ASCENDING ORDER
const ascendingOrder = transaction.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});
console.log(ascendingOrder);
//@ OR
const ascendingOrder1 = transaction.sort((a, b) => a - b);
console.log(ascendingOrder1);
//@ (a-b) - if a>b then it will return a number greater than zero therefore position will get changed but if a<b then it will return a negative number so the position will remain unaffected.

//! DESCENDING ORDER
const descendingOrder = transaction.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});
console.log(descendingOrder);
//@ OR
const descendingOrder1 = transaction.sort((a, b) => b - a);
console.log(descendingOrder1);

//! Some more array methods

//@ Creating an array using new method.
//@  Old method of doing
const oldArr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

//@  NEW METHODS
//@  Empty arrays + Fill method

const x = new Array(7); //@ THIS WILL CREATE AN EMPTY ARRAY WITH LENGTH 7.
console.log(x);
//@ Here map method will not work..

//@  Fill method
//@  This method is like slice method where we can specify where to add and where to end adding elements in an array.
x.fill(1); //@ will fill the array with 1 according to its length.
console.log(x);
//@  x.fill(what to fill , where to start filling , where to end filling)

x.fill(66, 3, 6);
console.log(x);

//! Array.from method
//@ syntax-Array.from({ object-which will specify the length of the array }, callback function)
//@ Using this method we can make array from all iterables.
const y = Array.from({ length: 7 }, () => 3);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

//@  querySelectorAll provide us a array like structure called nodelist which we can convert into an array using Array.from

labelBalance.addEventListener('click', function (e) {
  e.preventDefault();

  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => el.textContent.replace('€', '')
  );
  console.log(movementsUI);
  //@ OR
  // const movementsUI = Array.from(
  //   document.querySelectorAll('.movements__value')
  // );
  // console.log(movementsUI.map(el => el.textContent.replace('€', '')));
  //@ OR
  // document.querySelectorAll('.movements__value') - It is a nodelist on which we can use spread operator to form a new array.
  // const movementsUI = [...document.querySelectorAll('.movements__value')];
  // console.log(movementsUI.map(el => el.textContent.replace('€', '')));
});

//! Additional exercise.......
//1.
const bankDepositsSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, mov) => sum + mov);
console.log(bankDepositsSum);

//2.
let total = 0;
accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .forEach(mov => {
    if (mov >= 1000) total++;
  });

console.log(total);

//OR

console.log(
  accounts.flatMap(acc => acc.movements).filter(mov => mov >= 1000).length
);

// OR
console.log(
  accounts
    .flatMap(acc => acc.movements)
    .reduce((count, mov) => (mov >= 1000 ? count + 1 : count), 0)
);
console.log(
  accounts
    .flatMap(acc => acc.movements)
    .reduce((count, mov) => (mov >= 1000 ? count++ : count), 0)
);
//@ This happen because count++ is a post increment which means in each iteration ,the result of count ++ is 0  as the operator returns initial value first then the increased value....thats why in each iteration the value is 0 so it is impossibe to increase its value..
//@ so the simple solution is use pre increment operator.
console.log(
  accounts
    .flatMap(acc => acc.movements)
    .reduce((count, mov) => (mov >= 1000 ? ++count : count), 0)
);

//OR
console.log(
  accounts
    .flatMap(acc => acc.movements)
    .reduce(function (count, mov) {
      if (mov >= 1000) return count + 1;
      else return count;
      // return mov >= 1000 ? count + 1 : count;
    }, 0)
);
//! In reduce method we must return accumulator in each iteration. otherwise reduce method will not work.

//4.
//this is a nice title => This Is a Nice Title.
const convertTitleCase = function (title) {
  const capitilize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitilize(word)))
    .join(' ');
  return capitilize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a Long title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/
/*
!Coding Challenge #4
// Julia and Kate are still studying dogs, and this time they are studying if dogs are
// eating too much or too little.
// Eating too much means the dog's current food portion is larger than the
// recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10%
// above and 10% below the recommended portion (see hint).
// Your tasks:
// 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate
// the recommended food portion and add it to the object as a new property. Do
// not create a new array, simply loop over the array. Forumla:
// recommendedFood = weight ** 0.75 * 28. (The result is in grams of
// food, and the weight needs to be in kg)
// 2. Find Sarah's dog and log to the console whether it's eating too much or too
// little. Hint: Some dogs have multiple owners, so you first need to find Sarah in
// the owners array, and so this one is a bit tricky (on purpose) 🤓
// 3. Create an array containing all owners of dogs who eat too much
// ('ownersEatTooMuch') and an array with all owners of dogs who eat too little
// ('ownersEatTooLittle').
// 4. Log a string to the console for each array created in 3., like this: "Matilda and
// Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat
// too little!"
// 5. Log to the console whether there is any dog eating exactly the amount of food
// that is recommended (just true or false)
// 6. Log to the console whether there is any dog eating an okay amount of food
// (just true or false)
// 7. Create an array containing the dogs that are eating an okay amount of food (try
// to reuse the condition used in 6.)
// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food
// portion in an ascending order (keep in mind that the portions are inside the
// array's objects 😉)
// Hints:
// § Use many different tools to solve these challenges, you can use the summary
// lecture to choose between them 😉
// § Being within a range 10% above and below the recommended portion means:
// current > (recommended * 0.90) && current < (recommended *
// 1.10). Basically, the current portion should be between 90% and 110% of the
// recommended portion.
// Test data:
// const dogs = [
// { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
// { weight: 8, curFood: 200, owners: ['Matilda'] },
// { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
// { weight: 32, curFood: 340, owners: ['Michael'] },
// ];
// GOOD LUCK 😀 

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1.
dogs.forEach(dog => {
  dog.recFood = Math.trunc(dog.weight ** 0.75 * 28);
});
console.log(dogs);
//2.
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(
  `The Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  }`
);
//3.
//dogs eats too much
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);
//dogs eats less
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

//4.
// "Matilda and Alice and Bob's dogs eat too much!"
// and
// "Sarah and John and Michael's dogs eat too little!"
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

//5.
console.log(dogs.some(dog => dog.curFood === dog.recFood));

//6.
// current > (recommended * 0.90) && current < (recommended *
// 1.10).
const checkOkay = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
console.log(dogs.some(checkOkay));

//7.
console.log(dogs.filter(checkOkay));

//8.
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
*/
