//!hello world program
alert('Hello World');
//$alert function is use for popup alerts
// -----------------------------------------------------------------------
//! if Statement
let fun = 'FUN1';
fun = 'agentvinod';
if (fun === 'FUN1') alert('HELLO AGENT VINOD!');
//@ when we just have one line of code for if else statement ,we dont use any curly braces
// ------------------------------------------
// !DATA TYPES
//@ typeof function used to check the data types of any value or variable
let firstName1 = 'Vaskar';

console.log('firstname is a ' + typeof firstName1);

let birthYear1 = 1997;
console.log('birthyear is a ' + typeof birthYear1);

let married = true;
console.log('married is a ' + typeof married);

let gun;
console.log('gun is ' + typeof gun);
// --------------------------------------------------

!OPERATORS;
//@ these are arthimetic operators
let sum = 15 + 21;
let diff = 21 - 7;
console.log(sum);
console.log(diff);
console.log(sum + diff);

const firstName2 = 'Vaskar';
const lastName = 'Chandra Das';
console.log(firstName2 + ' ' + lastName);
//@ these are assignment operators
sum += 5; //here sum+5= 41
sum -= 1; //here sum-1= 40
sum *= 4; //here sum * 4=160
console.log(sum);
diff **= 2; //@ This means diff to the power 2. i.e, diff^2
console.log(diff);
//@ these are comparision operators
console.log(sum < diff); //# less than
console.log(sum > diff); //# greater than
console.log(sum == diff); //# equals to
console.log(sum >= diff); //# greater than equals to
console.log(sum <= diff); //# less than equals to
console.log(sum != diff); //# means not equal
//#All above codes will provide Boolean values. That is True or False.
// ---------------------------------------------------------------------------------
// !operators precedence
let x, y;
x = y = 20 + 10 - 4;
console.log(x, y);
//@ operators precedence table decide which operation has to be done first
//@ here plus operation was done first after that minus was performed

//@ average
let vaskarAge = 24,
   mamataAge = 20;
let average = (vaskarAge + mamataAge) / 2;
//@ without brackets divsion would have performed first after that addition would have done so its neccessary to use operators carefully.
console.log(vaskarAge, mamataAge, average); //@ we can print multiple items with a single console.log() built in function by just adding a comma between different items to separate them form each other.
// -------------------------------------------------------------------------

//! Coding Challenge #1

// Mark and John are trying to compare their BMI (Body Mass Index), which is
// calculated using the formula:
// BMI = mass / height ** 2 = mass / (height * height) (mass in kg
// and height in meter).
// Your tasks:
// 1. Store Mark's and John's mass and height in variables
// 2. Calculate both their BMIs using the formula (you can even implement both
// versions)
// 3. Create a Boolean variable 'markHigherBMI' containing information about
// whether Mark has a higher BMI than John.
// Test data:
// § Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95
// m tall.
// § Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76
// m tall.
// GOOD LUCK 😀

//! Solution.....
//@ Data 1
const markWeight12 = '78';
const markHeight12 = '1.69';
const johnWeight12 = '92';
const johnHeight12 = '1.95';
//@ above values are strings but later we converted them into numbers.
console.log('For Data 1 -');
let mark_BMI12, john_BMI12;
mark_BMI12 = markWeight12 / markHeight12 ** 2;
console.log("Mark's BMI -" + ' ' + mark_BMI12);

john_BMI12 = johnWeight12 / johnHeight12 ** 2;
console.log("John's BMI -" + ' ' + john_BMI12);

const markHigherBMI12 = mark_BMI12 > john_BMI12;
console.log(mark_BMI12, john_BMI12, 'Mark has higher BMI =', markHigherBMI12);

//@ Data 2
const markWeight2 = '95';
const markHeight2 = '1.88';
const johnWeight2 = '85';
const johnHeight2 = '1.76';
console.log('For Data 2 -');
mark_BMI = markWeight2 / markHeight2 ** 2;
console.log("Mark's BMI -" + ' ' + mark_BMI);

john_BMI = johnWeight2 / johnHeight2 ** 2;
console.log("John's BMI -" + ' ' + john_BMI);
// ------------------------------------------------------------------------------------------

const firstName = 'Vaskar Chandar Das';
const designation = 'a Web Developer';
const currentYear = 2022;
const birthYear = 1997;

const sent = 'I am ' + firstName + ' ' + designation + 'of' + (currentYear - birthYear) + ' years old.';

console.log(sent);

//#this is a old methods of writing any sentence in js which become very complicated when we have to write multiple sentences. that's why we use --TEMPLATE LITERALS--. below is the example of template literals.
const tLiterals = `I am ${firstName}, ${designation} of ${currentYear - birthYear} years old.`;
console.log(tLiterals);
//${this is a expression container}.

//@this is a multi line string written both in old and new method

console.log(`this is a
multiline
string
written
with
new js method`);
//@in old method we use "\n\" this for line break.
console.log('this is a \n multiline\n string\n written with\n old method');
// -----------------------------------------------------------------------------------------
//! if else control structure or statement in javascript..
const age1 = 23;
// const oldEnough=age>=18;
// if(oldEnough){
// console.log(`You are eligible for DL.`)
// }else{`You are not  eligible for DL rightnow.`}
//or,
if (age1 >= 18) {
   console.log(`Congratulations!🚘You are eligible to apply for Driving License.`);
} else {
   console.log(`Opps!😕You are not eligible to apply for DL , Wait for another ${18 - age} years.`);
}

const year1 = 2012; //$change its value to execute desire block.
let century;
if (year1 >= 2000) {
   century = 21; //@ we cant declare varibles within if else statement block...so to use any varible inside it we need to first declare that variable outside the block.
} else {
   century = 20;
}
console.log(century);
// --------------------------------------------------------------------------------------

//! Coding Challenge #2
// Use the BMI example from Challenge #1, and the code you already wrote, and
// improve it.
// Your tasks:
// 1. Print a nice output to the console, saying who has the higher BMI. The message
// is either "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"
// 2. Use a template literal to include the BMI values in the outputs. Example: "Mark's
// BMI (28.3) is higher than John's (23.9)!"
// Hint: Use an if/else statement 😉
// GOOD LUCK 😀
// data from challenge one
//@ Data 1
const markWeight1 = '78';
const markHeight1 = '1.69';
const johnWeight1 = '92';
const johnHeight1 = '1.95';

console.log('For Data 1 -');
let mark_BMI, john_BMI;
mark_BMI = markWeight1 / markHeight1 ** 2;
console.log("Mark's BMI -" + ' ' + mark_BMI);

john_BMI = johnWeight1 / johnHeight1 ** 2;
console.log("John's BMI -" + ' ' + john_BMI);

// const markHigherBMI = mark_BMI > john_BMI;

if (mark_BMI > john_BMI) {
   console.log(`Mark (${mark_BMI}) has higher BMI than John (${john_BMI}).`);
} else {
   console.log(`John (${john_BMI}) has higher BMI than Mark (${mark_BMI}).`);
}

// --------------------------------------------------------------------------------

// ! Type conversion and coercion......
//@ when js itself convert data types it is known as coercion.
const year = '1992'; //it is a string.
console.log(year + 4); //@ as year is a string. so + operator simply convert the 4 into string, so the result will be concatenation of both strings that is 19924.
console.log(Number(year) + 4); //@ here Number fucntion converting the string into number so here the result will be 1996.
console.log('23' + '12' + 20); //@ + operator converts number to string-- result will be 231220.
console.log('40' - '20' - '10'); //@ - operator converts string to numbers -- here result will be 10.

// ---------------------------------------------
//! falsy values are  --   null , NaN , " " , 0 ,undefined

console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean(''));
console.log(Boolean({})); //empty object-- which is true.
console.log(Boolean(NaN));
console.log(Boolean(null));
console.log(Boolean('Vaskar')); // result true

const money = 100;
if (money) {
   console.log(`Money is defined. If i change value of variable money other than zero than if block will be executed by the browser.
  Because money is equal to 100 which is a true boolean value therefore if block will get executed.`);
} else {
   console.log(`Money is not defined because money is equal to zero and by default it is a false boolean.`);
}
let height1;
if (height1) {
   console.log(`If Variable is not assigned with any value then by default it is considered as false by javascript. `);
} else {
   console.log(`value is unassigned.`);
}
// --------------------------------------------

//! Equality operator.......

//@  == vs === (Loose vs Strict equality operator)

const age = 18;
if (age === 18) {
   console.log(
      `It is a strict operator, that means it will compare  only same data types on both sides.Here age is equal to 18`
   );
}
console.log(age === 18);

const height = '18'; //@ it is a string
if (height == 18) {
   console.log(
      `value will be false when  the operator is strict because height is assigned with a string  and we want to compare a string with a number data type.`
   );
} else {
   console.log(
      `string cant be compare with number with strict equality operator. Stict operators are used to compare same data types on both sides of the operator.`
   );
}
//-------------------------------------------------------
//! else if function....that is multiple if else statements.

let favourite = Number(prompt(`What is your favourite Number?`));
console.log(typeof favourite);
if (favourite === 40) {
   console.log(`40 is a cool number`);
} else if (favourite === 10) {
   console.log(`10 is aslo a cool number`);
} else {
   console.log(`Your number is not 10 or 40`);
}
// we use multiple else if function according our need
if (favourite !== 40) {
   alert(`Why is not 40 or 10?`);
}
// !== is a strict not equal operator and != is a loose not equal operator.
// -----------------------------------------------

//! Challenge #3
// There are two gymnastics teams, Dolphins and Koalas. They compete against each
// other 3 times. The winner with the highest average score wins a trophy!
// Your tasks:
// 1. Calculate the average score for each team, using the test data below
// 2. Compare the team's average scores to determine the winner of the competition,
// and print it to the console. Don't forget that there can be a draw, so test for that
// as well (draw means they have the same average score)
// 3. Bonus 1: Include a requirement for a minimum score of 100. With this rule, a
// team only wins if it has a higher score than the other team, and the same time a
// score of at least 100 points. Hint: Use a logical operator to test for minimum
// score, as well as multiple else-if blocks 😉
// 4. Bonus 2: Minimum score also applies to a draw! So a draw only happens when
// both teams have the same score and both have a score greater or equal 100
// points. Otherwise, no team wins the trophy
// Test data:
// § Data 1: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
// § Data Bonus 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
// § Data Bonus 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106
// GOOD LUCK 😀

//@ solution

const avgDolphins = (97 + 112 + 101) / 3;
const avgKoalas = (109 + 95 + 106) / 3;
console.log(avgDolphins, avgKoalas);

if (avgDolphins > avgKoalas && avgDolphins >= 100) {
   console.log(`Dolphins won the Trophy🏆`);
} else if (avgDolphins < avgKoalas && avgKoalas >= 100) {
   console.log(`Koalas won the Trophy🏆`);
} else if (avgDolphins === avgKoalas && avgDolphins >= 100 && avgKoalas >= 100) {
   console.log(`Both teams won the Trophy🏆`);
} else {
   console.log(`Both teams lost the Trophy😭`);
}
// --------------------------------------------------------------------------------------------------

//! if else  statement to switch statement

//@  Using if else

let day = 'monday';
if (day === 'monday') {
   console.log(`Do Maths`);
   console.log(`Prepare for Biology`);
} else if (day === 'tuesday' || day === 'wednesday') {
   console.log(`Do practice previous year papers`);
} else if (day === 'thursday') {
   console.log(`Do practice English`);
} else if (day === 'friday') {
   console.log(`Do practice GK For chsl exam`);
} else if (day === 'saturday' || day === 'sunday') {
   console.log(`REVISE EVERYTHING YOU LEARNT OTHER DAYS`);
} else {
   console.log(`It is a invalid day!!`);
}

//@ Using switch statement

switch (day) {
   case 'monday':
      console.log(`Do Maths`);
      console.log(`Prepare for Biology`);
      break;
   case 'tuesday':
   case 'wednesday':
      console.log(`Do practice previous year papers`);
      break;
   case 'thursday':
      console.log(`Do practice English`);
      break;
   case 'friday':
      console.log(`Do practice GK For chsl exam`);
      break;
   case 'saturday':
   case 'sunday':
      console.log(`REVISE EVERYTHING YOU LEARNT OTHER DAYS`);
      break;
   default:
      console.log(`It is a invalid day!!`);
}
// ---------------------------------------------------------
//! Coding Challenge #4
// Steven wants to build a very simple tip calculator for whenever he goes eating in a
// restaurant. In his country, it's usual to tip 15% if the bill value is between 50 and
// 300. If the value is different, the tip is 20%.
// Your tasks:
// 1. Calculate the tip, depending on the bill value. Create a variable called 'tip' for
// this. It's not allowed to use an if/else statement 😅 (If it's easier for you, you can
// start with an if/else statement, and then try to convert it to a ternary
// operator!)
// 2. Print a string to the console containing the bill value, the tip, and the final value
// (bill + tip). Example: “The bill was 275, the tip was 41.25, and the total value
// 316.25”
// Test data:
// § Data 1: Test for bill values 275, 40 and 430
// Hints:
// § To calculate 20% of a value, simply multiply it by 20/100 = 0.2
// § Value X is between 50 and 300, if it's >= 50 && <= 300 😉
// GOOD LUCK 😀

//@ solution

const bill = Number(prompt(`Enter Your Bill Value For Tip Calculation !`));
//$Here we used Ternary/conditional operator in place of if else statement because both work same.
const tip = bill <= 300 && bill >= 50 ? bill * 0.15 : bill * 0.2; //@ syntax of this is == condition ? if block : else block.
alert(`The bill was ${bill} Rs, the tip was ${tip} Rs, and the total value is ${bill + tip} Rs`);

//$If else statement and switch statement is a statement which means it doesnt provide any value...like expressions .
//$expressions are those which provide any value .. in addition we cant store any if else block in a variable and we aslo cant put them in a template literal but ternary operator is a expression so we can use them when we need to put a conditon within any variable or template literal.
