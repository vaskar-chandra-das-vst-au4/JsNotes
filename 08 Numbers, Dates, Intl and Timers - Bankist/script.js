'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-06-23T17:01:17.194Z',
    '2022-06-24T23:36:17.929Z',
    '2022-06-25T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2022-06-18T18:49:59.371Z',
    '2022-06-22T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};
const account3 = {
  owner: 'Binita Tarafdar',
  movements: [500, 3400, 1500, -790, -3210, 121000, 8500, -30],
  interestRate: 1.5,
  pin: 3333,

  movementsDates: [
    '2021-11-01T13:15:33.035Z',
    '2021-11-30T09:48:16.867Z',
    '2021-12-25T06:04:23.907Z',
    '2022-01-25T14:18:46.235Z',
    '2022-02-05T16:33:06.386Z',
    '2022-04-10T14:43:26.374Z',
    '2022-06-18T18:49:59.371Z',
    '2022-06-22T12:01:20.894Z',
  ],
  currency: 'INR',
  locale: 'en-IN',
};
const account4 = {
  owner: 'Vaskar Chandra Das',
  movements: [500002, 3400, -150, 7190, 3210, -1000, 18500, -310],
  interestRate: 1.5,
  pin: 4444,

  movementsDates: [
    '2021-11-01T13:15:33.035Z',
    '2021-11-30T09:48:16.867Z',
    '2021-12-25T06:04:23.907Z',
    '2021-01-25T14:18:46.235Z',
    '2022-02-05T16:33:06.386Z',
    '2022-04-10T14:43:26.374Z',
    '2022-06-18T18:49:59.371Z',
    '2022-06-22T12:01:20.894Z',
  ],
  currency: 'INR',
  locale: 'en-IN',
};
const account5 = {
  owner: 'Sayan Biswas',
  movements: [500, 3400, 12150, 197190, 93210, 51000, 18500, -310],
  interestRate: 1.5,
  pin: 5555,

  movementsDates: [
    '2021-11-01T13:15:33.035Z',
    '2021-11-30T09:48:16.867Z',
    '2021-12-25T06:04:23.907Z',
    '2021-01-25T14:18:46.235Z',
    '2022-02-05T16:33:06.386Z',
    '2022-04-10T14:43:26.374Z',
    '2022-06-18T18:49:59.371Z',
    '2022-06-22T12:01:20.894Z',
  ],
  currency: 'INR',
  locale: 'en-IN',
};
const account6 = {
  owner: 'Sisu Panda',
  movements: [566500, 453400, 122150, 197190, 9453210, -51000, 18500, -310],
  interestRate: 1.5,
  pin: 6666,

  movementsDates: [
    '2021-11-01T13:15:33.035Z',
    '2021-11-30T09:48:16.867Z',
    '2021-12-25T06:04:23.907Z',
    '2021-01-25T14:18:46.235Z',
    '2022-02-05T16:33:06.386Z',
    '2022-04-10T14:43:26.374Z',
    '2022-06-25T18:49:59.371Z',
    '2022-06-27T12:01:20.894Z',
  ],
  currency: 'INR',
  locale: 'en-IN',
};

const accounts = [account1, account2, account3, account4, account5, account6];

/////////////////////////////////////////////////

//! Elements
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
const btnLogout = document.querySelector('.btn-logout');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
//! Functions

//! Function to format given date...
const formatDate = function (date, acc) {
  //@ Function for calculating days passed.
  const calcdaysPassed = (d1, d2) =>
    Math.round(Math.abs(d2 - d1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcdaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    //@Here we even dont need to write "else" because this else block will only get executed if above returns are false..as we know that if the function is returned then the below codes dont get executed.
    //@ OR
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    const locale = navigator.language;
    return new Intl.DateTimeFormat(locale, options).format(date);
  }
};

//! Number formatter..
const formatCur = function (value, currency, locale) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

//! Timer function

const startLogOutTimer = function () {
  //@ Total session time...
  let time = 900;
  //@ The CALLBACK FUNCTION FOR setIntercal
  const trick = function () {
    let min = String(Math.trunc(time / 60)).padStart(2, 0);
    let sec = String(Math.trunc(time % 60)).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    //@ When time variable reaches 0 that means now the user has to be logged out automatically
    if (time === 0) {
      //! Stopping timer Interval..
      clearInterval(timer);
      //@  Change welcome message
      labelWelcome.textContent = `Log in to get started`;
      //@  Opacity set to zero
      containerApp.style.opacity = 0;
    }

    //@ Decrese the time variable after every second..
    //@  This need to be after the above if block because when the time variable reaches 1 then immediately the if block gets executed but visually we will able to see that timer is still at 1 sec and immediately the user gets logged out, but we dont want this we want to log out the user when the timer show 0 sec and the reason behind this is that,  as "time--" is post decrement operator so it will visually show zero in next iteration but behind the scene it decrease the value of time variable in the heap before visually showing its value in next iteration.
    time--;
  };
  //@ Calling the function trick to run it immediately..
  trick();

  //@ Call the timer every second...and updates the min and sec variables...
  //@ The callback function of setInterval function will get executed after First one second and then it will be called after every 1 sec , but we want to call this callback function immediately as the user gets logged in. so to achieve this we need to make the callback function a separate function and call it immediately after declaring and then we passed it into the setInterval function as a callback function.
  const timer = setInterval(trick, 1000);

  //@ We must return "timer" because if someone already logged in and at the same time another user aslo try to log in then in the new logged in account both the timer of accounts gets merged and we will get a weird looking timer in the new logged in account. so to fix this issue first we need to return "timer" and then stored this timer value in a global variable so that we can check if the timer exist or not ,if timer exist while logging in then the old timer gets cleared out and new timer will get executed ..
  return timer;
};

//!Display movements************************
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);

    const disaplayDate = formatDate(date);
    //@ OLD CODE
    // const html = `
    //   <div class="movements__row">
    //     <div class="movements__type movements__type--${type}">${
    //   i + 1
    // } ${type}</div>
    //     <div class="movements__date">${disaplayDate}</div>
    //     <div class="movements__value">${mov.toFixed(2)}€</div>
    //   </div>
    // `;

    const formattedMov = formatCur(mov, acc.currency, acc.locale);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${disaplayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
//!Displaying current balance***************
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  // labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
  labelBalance.textContent = formatCur(acc.balance, acc.currency, acc.locale);
};
//!Displaying summary*****************
const calcDisplaySummary = function (acc) {
  //@ money in
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  // labelSumIn.textContent = `${incomes.toFixed(2)}€`;
  labelSumIn.textContent = formatCur(incomes, acc.currency, acc.locale);

  //@ money out
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  // labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;
  labelSumOut.textContent = formatCur(Math.abs(out), acc.currency, acc.locale);

  //@ Interest earned....
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  // labelSumInterest.textContent = `${interest.toFixed(2)}€`;
  labelSumInterest.textContent = formatCur(interest, acc.currency, acc.locale);
};
//!Creating usernames of all accounts*****************
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

//!Update UI****************
const updateUI = function (acc) {
  //@ Display movements
  displayMovements(acc);

  //@ Display balance
  calcDisplayBalance(acc);

  //@ Display summary
  calcDisplaySummary(acc);
};
//!Clear input fields**********
const clrInput = function (a, b) {
  a.value = b.value = '';
  a.blur();
  b.blur();
};

//!EVENT HANDLERS**************************

//!Implementing LOGIN feature

let currentAccount, timerCheck;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    //@ Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner}`;
    containerApp.style.opacity = 100;

    //@Clear transfer section data
    clrInput(inputLoginUsername, inputLoginPin);

    //@ Implementing timer feature and resetting it if while logging in already a timer exist...
    if (timerCheck) clearInterval(timerCheck);
    timerCheck = startLogOutTimer();
    //@ UpdateUI
    updateUI(currentAccount);

    //@Clear transfer section data
    clrInput(inputTransferAmount, inputTransferTo);

    //@ Implementing Dates
    // let fullDate = new Date();
    // let date = `${fullDate.getDate()}`.padStart(2, 0);
    // let month = `${fullDate.getMonth()}`.padStart(2, 0);
    // let year = fullDate.getFullYear();
    // let hour = `${fullDate.getHours()}`.padStart(2, 0);
    // let min = `${fullDate.getMinutes()}`.padStart(2, 0);
    // let disaplayDate = `${date}/${month}/${year}, ${hour}:${min}`;
    // labelDate.textContent = disaplayDate;
    //@ OR
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(new Date());
  }
});
//!Transfer section
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //@ DO transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //@Pushing Dates
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    //@updateUI
    updateUI(currentAccount);

    //@Clear transfer section data
    clrInput(inputTransferAmount, inputTransferTo);
    //@ Resetting the timer- whenever we will try to transfer money the timer gets reset.
    clearInterval(timerCheck);
    timerCheck = startLogOutTimer();
  }
});
//!Getting loan
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +inputLoanAmount.value;

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      //@  Add movement
      currentAccount.movements.push(Math.round(amount));

      //@ Pushing Dates
      currentAccount.movementsDates.push(new Date().toISOString());

      //@  Update UI
      updateUI(currentAccount);
    }, 2500);

    //@ Resetting the timer- whenever we will try to get loan the timer gets reset.
    clearInterval(timerCheck);
    timerCheck = startLogOutTimer();

    clrInput(undefined, inputLoanAmount);
  }
});
//!Closing the current account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    //@Deleting Current account from accounts array
    accounts.splice(index, 1);

    //@Hide UI
    containerApp.style.opacity = 0;
    //@Clear inputs
    clrInput(inputCloseUsername, inputClosePin);
    //@ Change welcome message
    labelWelcome.textContent = `Log in to get started`;
  }
});
//!Implementing sorting of movements using sort method
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
//! Logout Feature...
btnLogout.addEventListener('click', function () {
  clearInterval(timerCheck);
  containerApp.style.opacity = 0;
  labelWelcome.textContent = `Log in to get started`;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

//! LECTURES
/*
//!CONVERTING AND CHECKING NUMBERS

//@In js all numbers are simply  are of int data type
console.log(34 === 34.0);

console.log(10 / 3);
//@ in js everything is stored in binary and so it is very difficult to represent some fractions in binary which are very easy to represent in base 10 number system.
//@ Such as...
console.log(0.1 + 0.2);
//@which should be 0.3 but js give a weird value .
console.log(0.1 + 0.2 === 0.3);

//@Conversion
console.log(Number('23'));
//@ Or
console.log(+'23');

//!Parsing
//@1. "Number" is a namespace where all these methods are stored..
//@.parseInt() method ignore any character or any spaces it only take numbers.aslo it will ignore any decimal places..beside these if the argument given to it starts with any character then it will give NaN as a output
//@this method aslo have second parameter which accepts base value as a argument such as base 10,base 2 for binary etc etc.
console.log(`--------.parseInt()--------`);
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt(' 30px  ', 10));
console.log(Number.parseInt(' 67.8rem', 10));
console.log(Number.parseInt('g3.89fg', 10));

//@another syntax of this method but this we dont use in modern js.
// console.log(parseInt('679.89fg', 10));

//@2. .parseFloat()
console.log(`------.parseFloat()--------`);
//This method accepts all decimal values.
console.log(Number.parseFloat(' 67.8rem', 10));
console.log(Number.parseFloat(' op67.8rem', 10));

//@3. .isNaN()
//@checks that the arguments provided is not a number..
//@if it is a number then its returns false otherwise True.
console.log(`------.isNaN()---------`);
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20x')); //@this is not a number.
console.log(Number.isNaN(+'20')); //@this is a number.
console.log(Number.isNaN(43 / 0)); //@It is actually undefined but js still consider it as a number.
//@Aslo we are noticing that "20" and 20 both are considered as a number by this method so we dont really use it very much.
//@In place of this method we use isFinite();

//@4. .isFinite()
//@This checks if the provided argument is a number or not.
console.log(`-------.isFinite()--------`);
console.log(Number.isFinite(26));
console.log(Number.isFinite('26'));
console.log(23 / 0); //infinity
console.log(Number.isFinite(23 / 0));
console.log(Number.isFinite(+'44'));
console.log(Number.isFinite(+'44xc'));
console.log(Number.isFinite(23.889));

//@5. .isInteger()
//@checks for integer
console.log(`-------.isInteger()--------`);
console.log(Number.isInteger(26));
console.log(Number.isInteger('26'));
console.log(Number.isInteger(23 / 0));
console.log(Number.isInteger(+'44'));
console.log(Number.isInteger(+'44xc'));
console.log(Number.isInteger(23.889)); //false
console.log(Number.isInteger(23.0)); //true
*/
/*
//!MATH 

//@SquareRoot 
console.log(Math.sqrt(64));
//@ OR
console.log(64 ** (1 / 2));

//@CubeRoot  
console.log(8 ** (1 / 3));
console.log(512 ** (1 / 3));

//@ Min and Max  
//@ It do type coersion but it dont parese
console.log(Math.max(12, 45, 7, 8, 21, 90));
console.log(Math.max(12, 45, 7, 8, 21, 178, 90));
console.log(Math.max(12, 45, 7, 8, 21, '178', 90));
console.log(Math.max(12, 45, 7, 8, 21, '178px', 90));

console.log(Math.min(12, 45, 7, 8, 21, 90));
console.log(Math.min(12, 45, 7, 8, 21, 178, 90));
console.log(Math.min(12, 45, 7, 8, 21, '178', 90));
console.log(Math.min(12, 45, 7, 8, 21, '178px', 90));

//@ Calculating area of a circle
console.log(Math.PI); //value of pi
console.log(Math.PI * Number.parseInt('12cm') ** 2);

//@ Generating Random numbers
// Math.trunc() - Removes decimal part.
console.log(Math.random()); //Generate numbers between 0 to 1.
console.log(Math.trunc(Math.random() * 6) + 1); //Generate number between 0 to 6 where 6 is included.
//OR
console.log(Math.trunc(Math.random() * 7)); //Generate number between 0 to 6 where 6 is included. Without trunc method it would have given numbers between 0 to 7 in decimals but trunc cut off the decimal parts.

//@ A function which will generate random numbers between two given numbers..
const ramdomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

//!Explanation......
//@  Math.trunc(Math.random()) ==> 0 ... 1
//@  Math.trunc(Math.random()*(max-min) +1 ==> 0..(max-min).
//@  Where the max-min value will be included because of adding 1.
//@  Math.trunc(Math.random() * (max - min) + 1) + min ==> (0 + min) ...(max - min + min) = min....max
//@  Here both min and max are included in the range.
console.log(ramdomInt(10, 25));

//! ROUNDING  
//@ Math.trunc() dont round off it just omit decimal portion.
console.log(Math.trunc(43.56));

//@ Rounding depending on 5  
console.log(Math.round(43.5));
console.log(Math.round(43.2));
console.log(Math.round(43.7));
console.log(Math.round(43.489));
//@ .ceil()- always round up  
console.log(Math.ceil(43.4));
console.log(Math.ceil(43.7));
console.log(Math.ceil(43.5));
//@ .floor() - always round down  
console.log(Math.floor(43.4));
console.log(Math.floor(43.7));
console.log(Math.floor(43.5));

//! Difference between .floor() and .trunc()   
console.log(Math.trunc(43.7));
console.log(Math.floor(43.5));
//@ trunc removes decimal and floor round down
//@ such as
console.log(Math.trunc(-43.7));
console.log(Math.floor(-43.5));

//@ Rounding decimals   
//@ SYNTAX - console.log((decimal number).toFixed(upto decimal place));
//@ .toFixed() method is like string methods as it return strings.
//@ Integers are primitive values and primitives dont have methods but behind the scene js do boxing that means js transform them first into number object then called the method on that object and then once the operation is finished it again transform the object into primitive that is number.
console.log((56.789).toFixed(0)); //@No decimal place rounding off to integer  //57
console.log((56.789).toFixed(1)); //@Rounding off to one decimal place //56.8
console.log((56.789).toFixed(2)); //@upto 2 decimal place //56.79
console.log((56.789).toFixed(6)); //@upto 4 decimal place //56.789000
console.log(+(56.789).toFixed(6)); //@Converting to number
*/

/*
//! REMAINDER OPERATOR   
console.log(550 % 5);
console.log(550 % 34);

//@ Function to find odd or even number
const findEOrO = no =>
  no % 2 === 0 ? `It is a even number.` : `It is a odd number.`;

console.log(findEOrO(46));
console.log(findEOrO(19));

//@ Manupulating html balance rows
labelBalance.addEventListener('click', function (e) {
  e.preventDefault();
  [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
    // i % 2 === 0
    //   ? (row.style.backgroundColor = 'lightyellow')
    //   : (row.style.backgroundColor = 'lightgreen');
    if (i % 2 === 0) row.style.backgroundColor = 'lightyellow';
    if (i % 3 === 0) row.style.backgroundColor = 'lightgreen';
  });
});
*/

/*
//! NUMERIC SEPARATOR
//@ 238,987,000,000
//@ By using underscore in place of commas we can separate digits in js code as these underscore will be ignored by js during execution and will not reflect them into the result.
//@ WE CAN ONLY USE UNDERSCORE BETWEEN TWO DIGITS.
const diameter = 238_987_000_000;

//@Below is the eg of using underscore incorrectly.
// const testUnderscore=456_._6790_

//@WE SHOULD ONLY USE UNDERSCORE TO SEPARATE DIGITS INTO OUR CODE..
//@JS CANT DO PARSING IF WE USE UNDERSCORE IN BETWEEN TWO NUMBERS WHICH ARE ACTUALLY INTO A STRING SUCH AS-

const shouldNotUse = '7699_7873';
console.log(Number.parseInt(shouldNotUse)); //@This will simply ignore the digits after underscore.
console.log(Number(shouldNotUse)); //@NaN
*/

/*
//! WORKING WITH BigInt
//@Numbers are represented internally as 64bit that is there are 64 one's and zero's to represent any number.
//@But out of these 64 only 53 are used to store numbers other remaining are used to store position of decimal point and sign
//@So this create a limit ..That we can store upto a particular number only in js.
console.log(2 ** 53 - 1); //@9007199254740991
//@  OR
console.log(Number.MAX_SAFE_INTEGER); //@9007199254740991
//@This is the maximum value which can be represented in js safely without any errors
//@Any integer larger than 9007199254740991 this are termed as unsafe integer and js cant represent them accurately.
//@BUT IN ES2020 A NEW PRIMITIVE WAS ADDED WHICH REMOVED THE RESTRICTION...NOW IN JS WE CAN REPRESENT ANY BIG NUMBER WITH ACCURACY - CALLED BigInt
//@ Function BigInt()
console.log(34535645645454548984584045984); //@ cant be represented without bigInt.
console.log(34535645645454548984584045984n); //@ "n" represent BigInt number
console.log(BigInt(3453564564545));

//@ Operations -remain same with BigInt
console.log(12320323n + 54657474745747474674745n);

//@ We cant do these...
//@ Cannot mix BigInt and other types, use explicit conversions

// console.log(Math.sqrt(16n)); //@ Math operation not gonna work on BigInt numbers.

// console.log(20n / 5); //@ Not allowed

// const huge = 343454555546456222222222435n;
// const small = 3445;
// console.log(huge * small);
//@ For this to work we need to convert them into same primitive value
const huge = 343454555546456222222222435n;
const small = 3445;
console.log(huge * BigInt(small)); //@Now its correct.

console.log(20n > 15); //True.
console.log(20n === 20); //@False because type coersion is not done as the operator use is strict which compare same data type.
console.log(20n == 20); //@true //Here we used loose equality operator which do type coersion.
console.log(20n == '20');

console.log(huge + ` This is really a big number.`);

//Divisons
console.log(20n / 3n); //@In divisions of these numbers decimal values are not represented. //6n

*/
/*
//! CREATING DATES 

//@we can create date using "new date constructor function"
//@There are 4 ways of creating dates in js
//@ 1.
const now = new Date();
console.log(now);
//@ 2.Parsing from a Date sting
//@Syntax - new Date("month date year hr min sec")
console.log(new Date('Jun 25 2022 12:36:04'));
//@But it is not good practice to parse date from a date string created by us as it is not reliable.
console.log(new Date('december 24, 2015'));
console.log(new Date('2019-11-18T21:31:17.178Z'));
console.log(new Date(account1.movementsDates[1]));

//@ 3.Providing directly date day hr etc..
//@ Syntax - new Date("year month date hr min sec")
//@ Here month number are zero based so june which is equals to 6 but in js it is 5.
console.log(new Date(2022, 5, 30, 13, 22, 4));
//@ This constructor function aslo do autocorrection like any month dont have 35 days so js will rectify it .
console.log(new Date(2022, 5, 35, 13, 22, 4));

//@ We can find how many milliseconds passed since the beginning of unix time which is jan 1st 1970
console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));
console.log(3 * 24 * 60 * 60 * 1000); //259200000 this is a timestamp
*/
/*
//! THESE DATES ARE JUST ANOTHER TYPE OF SPECIAL OBJECTS SO THEY HAVE THEIR OWN METHODS LIKE ANY OTHER OBJECTS.
//@METHODS......
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getMilliseconds());
//@Getting a date string....
console.log(future.toISOString());
console.log(new Date(2142237180000));
//@Getting current timespace
console.log(Date.now());
console.log(future.getTime());

//@all dates aslo have set method like above get method.
console.log(future.setFullYear(2000));
console.log(future.setMonth(2));
console.log(future.setDate(18));
//@This method dont exist because by changing dates we can indirectly aslo changing day.
//console.log(future.setDay(1));
console.log(future.setHours(20));
console.log(future);
*/
/*
//! INTERNATIONALIZATION OF DATES
//@ all country codes- "http://www.lingoes.net/en/translator/langcode.htm"

//@ This Intl will only show dates according to the given country and language code. So to display formated date and time together we need to pass an object as argument in DateTimeFormat method like this.
// const now = new Date();
// console.log(new Intl.DateTimeFormat('en-IN').format(now));
//@ Passing object-
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  second: 'numeric',
  // month: 'numeric', //@ digits
  // month: '2-digit', //@ two digits
  month: 'long', //@ Words
  year: 'numeric',
  // year: '2-digit',
  // weekday: 'numeric', //@ weekday numeric value
  // weekday: 'long', //@ whole name
  // weekday: 'short', //@ short form
  // weekday: 'narrow', //@ single letter
};

//@ we must not pass locale manually the js must get in from browser by using below code...
const locale = navigator.language;
const now = new Date();
console.log(new Intl.DateTimeFormat(locale, options).format(now));

//! Internationalization of numbers

const num = 3884764.23;
const optionsNew = {
  // style: 'unit',
  style: 'currency', //@ It ignores the unit property the currency need to specify..as it is not determine by locale.
  // unit: 'kilometer-per-hour',
  currency: 'EUR',
  // useGrouping: false, //@ false dont group with commas.
  // unit: 'kilometer',
  // unit: 'celsius',
};
console.log('US:', new Intl.NumberFormat('en-IN', optionsNew).format(num));
console.log('IN:', new Intl.NumberFormat('en-US', optionsNew).format(num));
console.log('UK:', new Intl.NumberFormat('en-UK', optionsNew).format(num));

console.log(
  'US:',
  new Intl.NumberFormat(navigator.language, optionsNew).format(num)
);
*/
/*
//! setTimeout Function...
//@ setTimeout function recieves first argument as a call back function then the 2nd argument will be the time after which the callback function has to be executed. After these two arguments rest all arguments which we will pass to this setTimeout function will be passed to the callback function as the arguments for it.
//@  When js reaches to setTimeout function it registers the callback function and starts the timer after which it must be executed..and then it procced to the next line of codes..
const ingredients = ['Olives', 'Spinach', 'Garlic'];
const pizzaTimer = setTimeout(
  (ing1, ing2, ing3) => {
    console.log(
      `Your order with ${ing1}, ${ing2} and ${ing3} is now ready. Please collect it from counter no. 4🍕`
    );
  },
  3000,
  ...ingredients
);

//! Clearing the timeout function..
// if (ingredients.includes('Olives')) clearTimeout(pizzaTimer) ;

//! setInterval function
//@  setInterval's  callback function will get executed again and again after a specified time.

const clock = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

setInterval(function () {
  console.log(
    new Intl.DateTimeFormat(navigator.language, clock).format(new Date())
  );
}, 1000);
//! Clearing the interval function..
  clearInterval(interval-timer-name);
*/
