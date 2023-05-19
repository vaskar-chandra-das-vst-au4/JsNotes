'use strict';

//@ This is how we activate strict mode ,it's very important to write this
//@ because sometimes js dont pass error messages so debugging becomes very time consuming and hard to find bugs .strict mode help to detect errors in our Code. strict mode only works when we write it above all other codes.Also strict mode restrict some features which may  become a reason for bugs later on.

//@just a code to test the strict mode.
const age1 = 45;
let eligibility;
if (age1 >= 20) {
  console.log(`You are now eligible for pension seva.`);
  eligibility = true;
} else {
  console.log(`Sorry You are not eligible.`);
}
// ---------------------------------------------------------------------------

//! FUNCTIONS.......

//@ functions are the group of codes which can we be use again and again where ever it is needed by just calling/running/invoking the function.

function logger() {
  console.log(`Hello my name is Vaskar.`);
  console.log(
    `Reuseable codes are written within a function so that they can be used again and again where ever it is needed.`
  );
} //@This function is not returning any values and aslo not having any parameters.So that means it is not mandatory to retun a value by a function aslo its not mandatory to have paramters.

//@ This is how we call a function ,calling a function is called calling/invoking/running functions.

logger();
logger();
logger();

function fruitMaker(apple, orange) {
  //@ here apple ,orange within parenthesis are called parameters of the function fruitMaker.
  // console.log(apple,orange);
  const juice = `Juice is made of ${apple} apples and ${orange} oranges.`;
  return juice; //@ here the function is returning a value of variable juice.
}

// fruitMaker(5,3); //@ here 5,3 are arguments which are given to the function parameters apple and orange respectively.

const outputJuice = fruitMaker(5, 3); //@ storing the return value in variable outputJuice.

// console.log(outputJuice);

//@here fruitMaker(5,3) itself a return value of variable juice. so in order to print its value first we stored it in a variable outputJuice. But we can aslo print the return of function fruitMaker without storing its return value in any variable like this-

console.log(fruitMaker(5, 3)); //@console.log is aslo a function but it is a builtin function in javascript. Number() is aslo a built in function. These functions are called by us by using parenthesis.

//@the above fruitmaker can aslo be written like this--
function juiceMaker(orange, apple) {
  return `The juice is made of ${orange} oranges and ${apple} apples.`;
}
console.log(juiceMaker(2, 1));
//@or
// function juicemaker(oranges,apples){
//     console.log(`The juice is made of ${oranges} oranges and ${apples} apples.`);
// }
// juicemaker(2,1);
// -----------------------------------------------------------

//! FUNCTION DECLARATION

function calAge1(birthYear) {
  // const age=2022-birthYear;
  // return age;
  return 2022 - birthYear;
}
console.log(calAge1(1997));
console.log(
  `These two age are calculated using function declaration`,
  calAge1(1998)
);
//@ we can call this function even before declaring them.
// ---------------------------------------------------------------------
//! FUNCTION EXPRESSION
//@ here we dont assign function name like function declaration.
//@ aslo we cant call these type of function expression without declaring them first. This is a expression so it has a value and we can store them in a variable like other data types.
const calAge2 = function (birthYear) {
  return 2022 - birthYear;
};
//@ Here we have to call the function by the variable name in which function expression is stored.

console.log(calAge2(1997));
//@ following are aslo some ways of calling function
console.log(
  `This age calculation is done using FUNCTION EXPRESSION!!`,
  calAge2(1995),
  `Here age is not converted to a string because i used comma to print string and function together`
);
console.log(
  `This age calculation is done using FUNCTION EXPRESSION!!` + calAge2(1991)
);
console.log(
  `This age calculation is done using FUNCTION EXPRESSION AGE = ${calAge2(
    1800
  )}`
);
// -----------------------------------------------------------------------------------

//! ARROW FUNCTION ( IT IS ASLO A EXPRESSION )

const age = birthYear => 2022 - birthYear; //@ HERE first "birthYear" is the parameter and after the => sign "2022-birthYear" is the return value of arrow function and this whole arrow function is stored in variable "age"
console.log(age(1997));
//@ OR  Another way of calling the function.....written below......
const yourAge = age(1997);
console.log(yourAge);

//@ CALCULATION OF RETIREMENT AGE
const retirementAge = birthYear => {
  const presentAge = 2022 - birthYear;
  const willRetireON = 65 - presentAge;
  return willRetireON;
};
//@ or THE ABOVE CODE CAN BE SHORTEN LIKE THIS--
// const retirementAge= birthYear => 65-(2022-birthYear);

console.log(`Your Age For Retirement is`, retirementAge(1997));

//@ ARROW FUNCTION WITH MULTIPLE PARAMETERS
const retirementAge1 = (birthYear, nAme) =>
  `${nAme} will Retire in ${65 - (2022 - birthYear)} years.`;
console.log(retirementAge1(1997, `Vaskar Chandra Das`));

// @FUNCTION CALLING FUNCTION EXAMPLE........

function fruitCutter(fruit) {
  return fruit * 6;
}

function fruitMaker(apples, oranges) {
  // const applePieces=fruitCutter(apples) ;
  // const orangePieces=fruitCutter(oranges);
  // const juice=`Juice is made of ${applePieces} pieces of apples and ${orangePieces} pieces of oranges.` ;
  // return juice;
  //@ OR INSHORT ABOVE CODE CAN BE WRITTEN LIKE...................
  return `Juice is made of ${fruitCutter(
    apples
  )} pieces of apples and ${fruitCutter(oranges)} pieces of oranges.`;
}
console.log(fruitMaker(5, 6));
// -----------------------------------------------------------------------------------------------
//! Coding Challenge #1

// Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new
// gymnastics discipline, which works differently.
// Each team competes 3 times, and then the average of the 3 scores is calculated (so
// one average score per team).
// A team only wins if it has at least double the average score of the other team.
// Otherwise, no team wins!
// Your tasks:
// 1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
// 2. Use the function to calculate the average for both teams
// 3. Create a function 'checkWinner' that takes the average score of each team
// as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner
// to the console, together with the victory points, according to the rule above.
// Example: "Koalas win (30 vs. 13)"
// 4. Use the 'checkWinner' function to determine the winner for both Data 1 and
// Data 2
// 5. Ignore draws this time
// Test data:
// § Data 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
// § Data 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27
// Hints:
// § To calculate average of 3 values, add them all together and divide by 3
// § To check if number A is at least double number B, check for A >= 2 * B.
// Apply this to the team's average scores 😉
// GOOD LUCK 😀

const calcAverage1 = (s1, s2, s3) => (s1 + s2 + s3) / 3;

// console.log(`Average score of Dolphins is ${calcAverage(44,23,71)} and Average score of Koalas is ${calcAverage(65,54,49)}`);
//@ Data 1
let aDolphins = calcAverage1(44, 23, 71);
let aKoalas = calcAverage1(65, 54, 49);

function checkWinner(avgDolphins, avgKoalas) {
  if (avgDolphins >= avgKoalas * 2) {
    console.log(`Dolphins won the match🎉(${avgDolphins} vs ${avgKoalas})`);
  } else if (avgKoalas >= avgDolphins * 2) {
    console.log(`Koalas won the match🎉(${avgKoalas} vs ${avgDolphins})`);
  } else {
    console.log(`Both lost the match😭`); //@ we can aslo use variables present outuside a particular function.
  }
}

checkWinner(aDolphins, aKoalas); //@ functions are independent so they dosent care from where they are getting arguments.
checkWinner(400, 2000);
checkWinner(200, 100);
//@ OR
checkWinner(calcAverage(44, 23, 71), calcAverage(65, 54, 49));

//@ Data 2
aDolphins = calcAverage(85, 54, 41);
aKoalas = calcAverage(23, 34, 27);
checkWinner(aDolphins, aKoalas);

// -----------------------------------
//@ it is a faulty fucntion as here we are not providing arguments.
//  function checkWinnerTest (avgDolphins , avgKoalas) {
// avgDolphins=calcAverage(85,54,41);
// avgKoalas=calcAverage(23,34,27);
//     if(avgDolphins>=avgKoalas*2){
//         console.log(`Dolphins won the match🎉(${avgDolphins} vs ${avgKoalas})`);
//     }else if (avgKoalas>=avgDolphins*2){
//         console.log(`Koalas won the match🎉(${avgKoalas} vs ${avgDolphins})`);
//     }else{
//          console.log(`Both lost the match😭`); //we can aslo use variables present outuside a particular function.
//         }
//     }
// -----------------------------------

//@ This is a exapmle of a function performing a particular task without giving any return value.

// function fruitCutter(fruit){
//     return fruit*6;
// }

// function fruitMaker(apples , oranges){
//     const applePieces=fruitCutter(apples) ;
//     const orangePieces=fruitCutter(oranges);
//     const juice=`Juice is made of ${applePieces} pieces of apples and ${orangePieces} pieces of oranges.` ;
//     console.log(juice);
//     //@ OR INSHORT ABOVE CODE CAN BE WRITTEN LIKE...................
//     // console.log(`Juice is made of ${fruitCutter(apples)} pieces of apples and ${fruitCutter(oranges)} pieces of oranges.`)
// }
// fruitMaker(5,6);

//! ARRAYS.........
//@ arrays are the most important data structure use in javascript.
//@ multiple values need multiple variables to store them so to minimise the efforts arrays are one of the important function we use in js ..arrays actually a function.
//@ arrays are use to store multiple data types in a same time.

const friend1 = 'Vaskar';
const friends2 = 'Mamata Das';
const friends3 = 'Binita Tarafdar';
//@ like this we have to declare multiple variables to store these data
//@ Initiation of arrays
const friends = [`Vaskar`, `Mamata Das`, `Binita Tarafdar`]; //@ Here we write our data within box brakects.

const friendsAlt = new Array(`Puspa`, `Rohit`, `Joy`); //@ It is another way of writing arrays.

//@ Numbering of data in arrays starts from 0 .
console.log(friends); //@ this is how we can print all elements of an array.
console.log(friends[0]); //@ this is how we can print a particular element of an array in console.
console.log(friends[1]);
console.log(friends[2]);
//$Like this we can find a length that is no of elements in an array.
console.log(friends.length);
console.log(friends[friends.length - 1]); //@ ".length" start numbering from 1 so "friends.length -1" is the last element of an array.
console.log(friends[friends.length - 2]);

//! Replace or mutate a array like this
friends[2] = 'Varun';
console.log(friends);
//@ we cant change the whole data of an array in once.
//@ we know const values cant be mutate but here we are mutating its value indirectly by changing the data of the arary.
//@ so the reason behind it is that we cant change the value of const if the value stored in it is  primitive data type but array is not a primitive data type.

//@ WE CAN STORE ONE ARRAY IN ANOTHER ARRAY..
const storeD = [
  `Example of storing one array in another`,
  23,
  friends,
  friend1,
];
console.log(storeD);

//!EXERCISE--
//@ Function Declaration
function calAge1(birthYear) {
  return 2022 - birthYear;
}
const bYears = [1997, 1998, 1991, 1992];

console.log(
  calAge1(bYears[0]),
  calAge1(bYears[1]),
  calAge1(bYears[2]),
  calAge1(bYears[3])
);

const ages1 = [
  calAge1(bYears[0]),
  calAge1(bYears[1]),
  calAge1(bYears[2]),
  calAge1(bYears[3]),
];
console.log(ages1);

//! Examples of few Methods

//! 1. Adding elements to an array

//@ Push is a function called methods which directly call on friends array.This method help to add elements to the end of an array. This whole function is having return value which is the new length of the array.
const friends = [`Vaskar`, `Mamata Das`, `Binita Tarafdar`];
//friends.push(`Added to the end`);
console.log(friends);

//@ retun value of this push method or function- new length of the array.
const returnCheck = friends.push(`Added to the end`);
console.log(returnCheck);

//@ adding elements to the starting of an array - .unshift()
friends.unshift(`I am at 1st`);
//@ this method aslo return length of the array.
console.log(friends);

//! 2.Removing elements
//@ .pop() It removes the last element.
friends.pop();
console.log(friends.pop()); //@ This code removed Binita Tarafdar. so return value is Binita Tarafdar.
console.log(friends);
//@ .pop() method has return value = the last element which was removed by it.

//@ Shift method removes elements from the starting of an array.
friends.shift();
console.log(friends);
//@ These methods are all functions which are called by the parenthesis..aslo these dont needs parameters to remove any element.

//! 3.Checking index of any element.
console.log(friends.indexOf(`Mamata Das`));
console.log(friends.indexOf(`Vaskar`));
console.log(friends.indexOf(`Not`)); //@when we ask index of any element which doesnt exist in an array then this method simply return -1.

//! 4.Includes method. (This is a strict method)
//console.log(friends.includes(`Vaskar`)); //@ This method tell us whether the given argument is present or not in the array.That is its return only boolean value.

friends.push(23);
if (friends.includes(`23`)) {
  //@ friends.includes(`23`) this value is false because its ask to check string 23 put we added number 23 in the array .
  console.log(`Yes i am present.`);
} else {
  console.log(`Absent`);
}

//! Coding Challenge #2
// Steven is still building his tip calculator, using the same rules as before: Tip 15% of
// the bill if the bill value is between 50 and 300, and if the value is different, the tip is
// 20%.
// Your tasks:
// 1. Write a function 'calcTip' that takes any bill value as an input and returns
// the corresponding tip, calculated based on the rules above (you can check out
// the code from first tip calculator challenge if you need to). Use the function
// type you like the most. Test the function using a bill value of 100
// 2. And now let's use arrays! So create an array 'bills' containing the test data
// below
// 3. Create an array 'tips' containing the tip value for each bill, calculated from
// the function you created before
// 4. Bonus: Create an array 'total' containing the total values, so the bill + tip
// Test data: 125, 555 and 44
// Hint: Remember that an array needs a value in each position, and that value can
// actually be the returned value of a function! So you can just call a function as array
// values (so don't store the tip values in separate variables first, but right in the new
// array) 😉
// GOOD LUCK 😀

const bills1 = [125, 555, 44];
console.log(`These are bill values without including taxes`, bills1);
const calcTip1 = function (billvalue) {
  // let tip;
  // if(billvalue>50 && billvalue<300){
  //        tip=billvalue*0.15;
  //           }else{
  //     tip=billvalue*0.2
  //         }
  // return tip;
  //@ or
  return billvalue > 50 && billvalue < 300 ? billvalue * 0.15 : billvalue * 0.2; //@ used ternary operator
};
//@ or
//const calcTipOR= billvalue => billvalue>50 && billvalue<300 ? billvalue*0.15 : billvalue*0.2;
//console.log(calcTipOR(bills1[0]),calcTipOR(bills1[1]),calcTipOR(bills1[2]));

const tipStore = [
  calcTip1(bills1[0]),
  calcTip1(bills1[1]),
  calcTip1(bills1[2]),
];
console.log(`These are tip Values`, tipStore);

//@ Final bill
const finalBill = [
  tipStore[0] + bills1[0],
  tipStore[1] + bills1[1],
  tipStore[2] + bills1[2],
];
console.log(`These are final bills1`, finalBill);
//@ or
// const finalBill2=(tip,bill) => tip+bill;
// const bb=[finalBill2(bills1[0],tipStore[0]),finalBill2(bills1[1],tipStore[1]),finalBill2(bills1[2],tipStore[2])];
//@ or
let bbb3 = [];
const finalBill3 = function (tip, bill) {
  let x = tip + bill;
  return bb3.push(x);
};

// console.log(`This is Total bill values calculate with the help of a function-`,bb);
//================================================================================================//

//! OBJECTS......
//@ Objects are another type of data structure use in js.
//@ In array we cant assign names to our stored elements but in objects we assign them a name which is called a property.

const vaskarArray = [
  //This is an array
  'vaskar',
  'chandra',
  'das',
  1997,
  'Bsc',
  2022 - 1997,
  ['Panda', 'Binita', 'Sayan'],
];
const Vaskar = {
  //This is an Object , Here firstname , middlename etc are property.
  firstName: 'Vaskar',
  middleName: 'Chandra',
  lastName: 'Das',
  dob: 1997,
  graduation: 'Bsc',
  age: 2022 - 1997,
  friends: ['Panda', 'Binita', 'Sayan'],
  address: 'Gokulpur Santrapara Road Near Akademos School.',
};
console.log(Vaskar);
//@ This is how we can call propety of any object.
console.log(Vaskar.firstName); //@ In dot notation we need to use property name we cant use any expression there.
console.log(Vaskar['firstName']); //@ In bracket notation we can use both property name and expression.

//@ this is one example of using expression in a bracket notation.
const namE = 'Name';
console.log(Vaskar[`last${namE}`]);
console.log(Vaskar[`middle${namE}`]);
//======================================//
//@ application of using bracket notation...
const about = prompt(
  `What do you want to know about Vaskar? Is it firstName,lastName, middleName,dob,graduation,age,friends?`
);
// console.log(about);
// alert(Vaskar[about]);
if (Vaskar[about]) {
  //@here if user enter some value which is not a property of that object Vaskar then if condition will return with undefined which is a faulty value  so the else block will be executed.
  alert(Vaskar[about]);
} else {
  alert(
    `Wrong Request Made! You can ask among firstName , lastName , middleName , dob , graduation , age , friends`
  );
}
//========================================================//
//@Adding elements to an object..
Vaskar.job = 'A Fullstack Web Developer';
Vaskar['school'] = `Kendriya Vdiyalaya No.2 Kancharapara`;
console.log(Vaskar);

//!Challenge.Write this using objects
//Vaskar Has 3friends ,and his best is called Panda.
console.log(
  `${Vaskar.firstName} has ${Vaskar.friends.length} friends, and his best friend is called ${Vaskar.friends[0]}.`
);

////////////////////////////////////////////////////////////

//!OBJECT METHODS...........

const Vaskar = {
  firstName: 'Vaskar',
  middleName: 'Chandra',
  lastName: 'Das',
  dob: 1997,
  graduation: 'Bsc',
  job: `Web Developer`,
  friends: ['Panda', 'Binita', 'Sayan'],
  address: 'Gokulpur Santrapara Road Near Akademos School.',
  haveDL: true, //It is a boolean value..
  //$we can aslo store function expression and arrow function in an object but we cant store
  //$function declaration.
  // calcAge: function (birthYear){
  //     return 2022-birthYear;
  // }
  // calcAge:function(){
  //     //@to check the this keyword ---
  //     // console.log(this);
  //     return 2022-this.dob; //@this keyword is the whole object in which it is used. In place of this keyword we may aslo  use Vaskar keyword that is the name of the object as both will produce same value.
  //     // return 2022 - Vaskar.dob;

  // }
  calcAge: function () {
    this.age = 2022 - this.dob; //@ here we are simply storing calculated age in a new created property in the same object.
    return this.age; //@ here we dont need return value as the above line will create a new property so we can easily access that from outside but using return value in a function is a good pratice.
  },
  getSummary: function () {
    return `${Vaskar.firstName} is a ${Vaskar.age} years old ${
      Vaskar.job
    } , and he ${Vaskar.haveDL ? 'has a' : 'dont has'} DL.`;
  },
};
// console.log(`The Age is`,Vaskar.calcAge(1997)); //@ Way 1 of calling function which is present in an object.
//@ or
// console.log(`The age of ${Vaskar.firstName} is ${Vaskar.calcAge(1997)} years.`)

// console.log(Vaskar['calcAge'](1997)); //@ way 2 of calling an function present within an object.
//@ In both ways we have to provide the birthdate as arguments that is we are repeating the dob which is already stored in the object..
//@ We can use any element of an object within a function which aslo stored in the same object like this---
//@ above three lines are for 1st function.

// console.log(Vaskar.calcAge()); //for 2nd function.

//@ below two lines are for 3rd function. line 447.
console.log(Vaskar.calcAge()); //@we cant directly call age property as it is not calculated yet so atleast we have to calculate the age once so that object can store its value in a property called age.
console.log(Vaskar.age); //@now we can call age property.
// ==================//

//!CHALLENGE
//@ write the string using objects
//@Vaskar is a 25 years old web developer, and he has a dl.
console.log(Vaskar.getSummary()); //used 4th function.

//! =====================================Coding Challenge #3=======================================//

// Let's go back to Mark and John comparing their BMIs! This time, let's use objects to
// implement the calculations! Remember: BMI = mass / height ** 2 = mass
// / (height * height) (mass in kg and height in meter)
// Your tasks:
// 1. For each of them, create an object with properties for their full name, mass, and
// height (Mark Miller and John Smith)
// 2. Create a 'calcBMI' method on each object to calculate the BMI (the same
// method on both objects). Store the BMI value to a property, and also return it
// from the method
// 3. Log to the console who has the higher BMI, together with the full name and the
// respective BMI. Example: "John's BMI (28.3) is higher than Mark's (23.9)!"

// Test data: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m
// tall.
// GOOD LUCK 😀
//!solution

const mark = {
  fullName: 'Mark',
  mass: 78,
  height: 1.69,
  calcBMI: function () {
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};

const john = {
  fullName: 'John',
  mass: 92,
  height: 1.95,
  calcBMI: function () {
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};

mark.calcBMI(); //@ atleast both methods has to be called before using them.
john.calcBMI();

mark.BMI > john.BMI
  ? console.log(
      ` ${mark.fullName}'s BMI(${mark.BMI}) is higher than ${john.fullName}'s BMI(${john.BMI}).`
    )
  : console.log(
      `${john.fullName}'s BMI(${john.BMI}) is higher than ${mark.fullName}'s BMI(${mark.BMI}).`
    );

// or

// if(mark.BMI>john.BMI()){
//     console.log("Mark's BMI",(mark.BMI), " is higher than John's BMI" ,(john.BMI),".");
// }else{
//     console.log("John's BMI",(john.BMI)," is higher than Mark's BMI" ,(mark.BMI), ".");
// }

// ===========================================================================//

//! LOOPS............
//@ Loops are aslo control structure like if else statement. Used to loop a particular command again and again.
//@ In this way we have to write code for printing same thing again and again
console.log(`I have completed Book 1`);
console.log(`I have completed Book 2`);
console.log(`I have completed Book 3`);
console.log(`I have completed Book 4`);
console.log(`I have completed Book 5`);
console.log(`I have completed Book 6`);
console.log(`I have completed Book 7`);
console.log(`I have completed Book 8`);
console.log(`I have completed Book 9`);
console.log(`I have completed Book 10`);

//! -------------------------------------WritingAoveCodesWith-FOR-LOOP---------------------------------------
for (let rep = 1; rep < 11; rep++) {
  //@ here we must declare the variable with let because its value will get change with each Iteration.
  console.log(`I have completed Book ${rep}.`);
  //@ Here if the condition gets true then it will continue iterate the codes..until the rep value equals to 11.
  //@  when it will reach 11 it get stopped
}
//! ---------------------------PrintingAllElementsOfAnArray----------------------------------
const testArray1 = [
  'Vaskar Chandra Das',
  1997,
  'Kalyani',
  'A web developer',
  2022 - 1997,
];

console.log(`All Elements Of The Array testArray`);

for (let i = 0; i < testArray1.length; i++) {
  console.log(testArray1[i], typeof testArray1[i]);
}
//! -------------------------------MakingNewArrayWithLoops------------------------------------------
//@This array will contain the all data types of elements present in an array testArray.
const typeofArray = [];
for (let i = 0; i < testArray1.length; i++) {
  // typeofArray[i] = typeof testArray1[i];
  // or
  typeofArray.push(typeof testArray1[i]);
}
console.log(typeofArray);

const years = [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998];
const ages = [];

for (let i = 0; i < years.length; i++) {
  ages.push(2022 - years[i]);
}
console.log(ages);

//! --------------------------------ContinueAndBreak-----------------------------------------------
//$continue - it exit the current Iteration and continue to the next one.
//$break - it exit the whole Iteration when the condition of exiting get fullfilled.
const testArray2 = [
  'Vaskar Chandra Das',
  'Hero',
  1997,
  'Kalyani',
  'A web developer',
  2022 - 1997,
];
console.log(`------ONLY STRINGS GET PRINTED WITH THE HELP OF CONTINUE------`);
for (let i = 0; i < testArray2.length; i++) {
  //$here the condition is continue printing if the element type is not string.
  if (typeof testArray2[i] !== 'string') continue;
  console.log(testArray2[i], typeof testArray2[i]);
}
//!------BREAK WITH NUMBERS-----

for (let i = 0; i < testArray2.length; i++) {
  //@here the condition is break the THE whole loop if the element type is number.
  if (typeof testArray2[i] === 'number') break;
  console.log(testArray2[i], typeof testArray2[i]);
}

//!============================LoopingBackwards=======================
const testArray = [
  'Vaskar Chandra Das',
  'Hero',
  1997,
  'Kalyani',
  'A web developer',
  2022 - 1997,
];
for (let i = testArray.length - 1; i >= 0; i--) {
  console.log(testArray[i]);
}
//! ==========================================LoopInsideALoop=========================================
for (let exercise = 1; exercise < 4; exercise++) {
  console.log(`-------------Starting Exercise ${exercise}`);
  //another loop
  for (let rep = 1; rep < 6; rep++) {
    console.log(`Exercise ${exercise} : Lifting Weight Repetition ${rep} 🏋️‍♀️`);
  }
}

//! ==============================================WhileLoop===================================================
// for(let i=1;i<11;i++){
//     console.log(`Your Exercise Number Is ${i}.`);
// }
//@ =============conversion of above for loop into while loop==========
// let i=1;
// while(i<11){
//     console.log(`Your Exercise Number Is ${i}.`);
//     i++ ;
// }
let dice = Math.trunc(Math.random() * 6) + 1;
while (dice !== 6) {
  //@While loop dont depend on any counter variable.If we need a loop whithout a counter variable then while loop is good to use.
  //@that is u dont know how many times u need to loop the command so it this situation while loop is good to use.
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) {
    console.log(`Rolling is about to END...`);
  }
}

//! ============================================Coding Challenge #4========================================
// Let's improve Steven's tip calculator even more, this time using loops!
// Your tasks:
// 1. Create an array 'bills' containing all 10 test bill values
// 2. Create empty arrays for the tips and the totals ('tips' and 'totals')
// 3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate
// tips and total values (bill + tip) for every bill value in the bills array. Use a for
// loop to perform the 10 calculations!
// Test data: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52
// Hints: Call ‘calcTip ‘in the loop and use the push method to add values to the
// tips and totals arrays 😉
// Bonus:
// 4. Bonus: Write a function 'calcAverage' which takes an array called 'arr' as
// an argument. This function calculates the average of all numbers in the given
// array. This is a difficult challenge (we haven't done this before)! Here is how to
// solve it:
// 4.1. First, you will need to add up all values in the array. To do the addition,
// start by creating a variable 'sum' that starts at 0. Then loop over the
// array using a for loop. In each iteration, add the current value to the
// 'sum' variable. This way, by the end of the loop, you have all values
// added together
// 4.2. To calculate the average, divide the sum you calculated before by the
// length of the array (because that's the number of elements)
// 4.3. Call the function with the 'totals' array
// GOOD LUCK 😀

//!Solution:

//@ -------------------------1&2&3----------------------------------
const bills3 = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

const calcTip = function (billvalue) {
  return billvalue > 50 && billvalue < 300 ? billvalue * 0.15 : billvalue * 0.2;
};

for (let i = 0; i < bills3.length; i++) {
  const tip = calcTip(bills3[i]);
  tips.push(tip);
  totals.push(tip + bills3[i]);
}
console.log(bills3, tips, totals);

//@ -4-Loop within a function used to calculate avg of any given array------
//@ It is a generic function use to calculate avg of any array with the help of a loop.

const calcAverage = function (arr) {
  let sum = 0;
  let it;
  for (let i = 0; i < arr.length; i++) {
    it = sum += arr[i] / arr.length;
  }
  return it;
};
console.log(calcAverage(totals));
console.log(calcAverage(tips));

// !------TipCalculator--UPDATED------
const bills = [125, 555, 44];
let tip = [];
let totalBill = [];
const calcTipOR = function (billvalue) {
  if (billvalue > 50 && billvalue < 300) {
    tip.push(billvalue * 0.15);
  } else {
    tip.push(billvalue * 0.2);
  }
};
for (let i = 0; i < bills.length; i++) {
  calcTipOR(bills[i]);
}

const finalBill31 = function (tip, bill) {
  let x = tip + bill;
  return totalBill.push(x);
};
for (let i = 0; i < tip.length; i++) {
  finalBill31(tip[i], bills[i]);
}
