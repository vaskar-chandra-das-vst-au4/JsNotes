'use strict';
/*
//! 1.Destructuring Arrays.
//@ Destructuring means putting the elements of an array in individual varaibles.

const restaurant = {
  name: "Classico Italiano",
  location: "Agra Trivani Bombay Kalyani",
  categories: ["Italian", "Pizzeria", "Vegetarain", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};

//@ Destructuring without destructuring method.
const arr = [2, 3, 4];
const x = arr[0];
const y = arr[1];
const z = arr[2];
console.log(x, y, z);
//@ Destructuring with destructuring method.
const [a, b, c] = arr;
//Here in left side [a,b,c] is not an array.
console.log(a, b, c);
//@  We can destructure particular some elements of an array.
let [main, secondary] = restaurant.categories;
console.log(main, secondary);
//@ Swapping destructured elements.
// $--old method
let temp = main;
main = secondary; //here main=pizzeria
secondary = temp; //here secondary=old value of main.
console.log(main, secondary);
//@ --New method
//@ here we are reassigning the values to achieve swapping.
// [secondary, main] = restaurant.categories;
//@  or
[main, secondary] = [secondary, main];
console.log(main, secondary);
//@ ---storing the function return in two variable.
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);
//@ Destructuring nested array.
const nesTed = [2, 6, [5, 10]];
//--blank space needed to skip the value 6.
//@ or
const [p, , q] = nesTed; //@ here q is an array.
console.log(p, q);
const [i, , [k, l]] = nesTed;
console.log(i, k, l); //@ here k and l will be printed as an individual values.


//! Default Values
//@ --when we dont know how many elements are in the array then we need default values for the elements which we dont know..if we dont assign any default values then it will automatically set to undefined by js.
const defaultValues = [1, 2, 3, 4, 5];
// const [m, n, o, s, t, v] = defaultValues;
// console.log(m, n, o, s, t, v);
//@ here v is not present so its value is undefined.
//@ assigning a default.
//@ when there is no value in array to assign in a variable then js will assign a default value to that variable.like here v is assigned to 1.
const [m = 1, n = 1, o = 1, s = 1, t = 1, v = 1] = defaultValues;
console.log(m, n, o, s, t, v);

*/
/*
//! 2.Destructuring Objects.
const restaurant = {
  name: "Classico Italiano",
  location: "Agra Trivani Bombay Kalyani",
  categories: ["Italian", "Pizzeria", "Vegetarain", "Organic"],
  starterMenu: [
    "Focaccia",
    "Bruschetta",
    "Garlic Bread",
    "Caprese Salad",
    "Maggi",
  ],
  mainMenu: ["Pizza", "Pasta", "Risotto", "Chicken Biryani"],
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0,
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery: function ({
    starterIndex = starterMenu.length - 1,
    mainIndex = 3,
    address,
    time = "9:00",
    userName = "Vaskar",
  }) {
    // console.log(this);

    //@ here the order of  property in the paramter is not mandatory to match the order of the properties of provided object argument..
    //@ in this parameter we are destructuring the given object argument. and using them in this function to  perform the task.
    //@ here userName is not present in argument so js will provide its set default value wherever needed.
    console.log(
      `Order recieved!  ${userName}, ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will deliver on ${time} at ${address}.`
    );
  },
};

//! Destructuring the object----
//@ here variable name and object property name must be same.
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);
//@ we can change the variable name like this.
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);
//! Default values
const { menu = "notPresent", mainMenu = 12, starterMenu = [] } = restaurant;
console.log(menu, mainMenu, starterMenu);
//! Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj); //@ the whole code must be in paraenthesis.otherwise js will give syntax error.
console.log(a, b);
//! Nested objects
const {
  fri: { open: o, close: c },
} = restaurant.openingHours;
console.log(o, c);
//@ OR//////
const { open: oT, close: cT } = restaurant.openingHours.fri;
console.log(oT, cT);

//! Giving an object as an argument for a function method stored in an object resturant.
restaurant.orderDelivery({
  time: "22:30",
  address: "Kalyani",
  mainIndex: 2,
  starterIndex: 2,
  userName: "Mamata Das",
});
restaurant.orderDelivery({
  address: "Kalyani",
});
*/
/*
//! 3.Spread Operators - Use to unpack an array.

//!  Methods of adding elements of an array to another array.

//@  Method 1 with loop - add all elements of a into b.

const a = [56, 89, 90];
let b = [23, 45];
for (let i = 0; i < a.length; i++) {
  b.push(a[i]);
}
console.log(b);

//@  Method 2 manual - MUST NOT USE IF DATA IS BIG.

const c = [34, 12, 56];
const d = [300, 22, c[0], c[1], c[2]];
console.log(d);

//@  Method 3 with spread operator - BEST METHOD TO USE

const p = [43, 12, 78, 90];
const q = [70, 30, 10, ...p];
console.log(q);
console.log(...p); //@  This spread operator will log all the elements of an array individually.

//@  OR it can be done Wth for loop -
for (let i = 0; i < p.length; i++) {
  console.log(p[i]); //but this will log every element in new line.
}
//!  OR - Print all elements in same line Using .join() method >
const p = [43, 12, 78, 90];
let num = [];
for (let i = 0; i < p.length; i++) {
  num.push(p[i]);
}
console.log(num.join(" "));
//!  OR
const p = [43, 12, 78, 90];
let num = "";
for (let i = 0; i < p.length; i++) {
  num += ` ${p[i]}`;
}
console.log(num);
//@  OR - SAME CODE WITH forEach Loop -
p.forEach((el) => console.log(el));

const restaurant = {
  name: "Classico Italiano",

  location: "Agra Trivani Bombay Kalyani",

  categories: ["Italian", "Pizzeria", "Vegetarain", "Organic"],

  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],

  mainMenu: ["Pizza", "Pasta", "Risotto"],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `This is your ordered Pasta loaded with ${ing1},${ing2}, and ${ing3}. Enjoy It! `
    );
  },
};

const newMenu = [...restaurant.mainMenu, "Pani puri"];
console.log(newMenu);

//@  Copy Array
const newMenuCopy = [...newMenu];
console.log(newMenuCopy);

//@ Combining arrays
const joined = [
  ...newMenu,
  ...restaurant.starterMenu,
  ...restaurant.categories,
];
console.log(joined);

//@ Spread operator only work on iterables but not on objects.
//@ Iterables are arrays,strings,sets,maps.
//!  BUT FROM ES18 WE CAN ASLO USE THIS SPREAD OPERATOR ON OBJECTS

//!  Spread operator on strings

const firstName = "Vaskar";
const school = "kvno2";
const letters = ["These are all letters from firstName ", ...firstName];
console.log(letters);
console.log(...school); //@  Like this we can print all the letters of a string.But we can only use them in arrays.THAT IS WE MUST PUT THEM INTO AN ARRAY.
// console.log(`This is a wrong example ${...firstName}`); //@ wrong example.

//!  Spread operator use in real world with functions
// const ingredients = [
//   prompt(`Enter the Pizza's First igredient`),
//   prompt(`Enter the Pizza's Second igredient`),
//   prompt(`Enter the Pizza's Third igredient`),
// ];
//@  'this is vaskar\'s book.' =="\" this is escape need to use single qoute when a string starts with a single qoute . without it js will get confuse and break the codes into parts. so to overcome this we can use escape , double qouted string and template literals.

// restaurant.orderPasta(...ingredients);
//@  or
// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);

//!  Spread operators on objects

const newRestaurant = {
  foundedIn: 2000,
  by: "Vaskar chandra das",
  ...restaurant,
};
console.log(newRestaurant);

//!  Copying object
const restaurantCopy = {
  ...restaurant,
};
console.log(restaurantCopy);
restaurantCopy.name = "Mamata das";
console.log(restaurantCopy.name);
console.log(restaurant.name);

//@ Here we are able to mutate the each resturant name because each are new object store in memory heap with different address.
*/
/*
//@ ///////////////////////////////////////////////////////////////////////////

// ! 4.Rest pattern and parameters

// @  Rest pattern is used to pack elements into an array ,which is opposite of spread operator.

const arr = [1, 2, ...[3, 4]]; //@  This is spread operator. Because it is in the right side of the equal assignment operator.
//!  Rest pattern >>
const [a, b, ...others] = [1, 2, 3, 4, 5]; //@  This is rest pattern because it is in the left side of assignment operator.It packs the rest elements of the array in another array.
console.log(a, b, others);
///////////////////////////////////////////////////
const restaurant = {
  name: "Classico Italiano",
  location: "Agra Trivani Bombay Kalyani",
  categories: ["Italian", "Pizzeria", "Vegetarain", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0,
      close: 24,
    },
  },
  orderPizza: function (mainIngredient, ...additionalIngredients) {
    console.log(mainIngredient, additionalIngredients);
  },
};
const [p, , r, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
//@ Here p and r assigned to the values of mainMenu[0] and mainMenu[2] and left elements are put into an array called otherFood.
//@  but the skipped element did not include in the rest pattern.
//@  rest pattern must used at last position.
console.log(p);
console.log(r);
console.log(otherFood);

//!  Rest operator with objects
//@  Here we are assigning 'fri' of 'restaurant.openingHours' to f and all other values of the object into otherDays object.
const { fri: f, ...otherDays } = { ...restaurant.openingHours };
console.log(f, otherDays);

//!  Rest operator with functions
//@  "...numbers" is a rest parameter which take all the arguments and packed them into an array 'numbers'.
//@  moreover this function can take any number of parameter.

const add = function (...numbers) {
  // console.log(numbers);
  let sum = 0;

  // for (let i = 0; i < numbers.length; i++) {
  //   sum += numbers[i];
  // }

  //@  OR

  numbers.forEach((n) => {
    sum += n;
  });
  return console.log(sum);
};
add(2, 3);
add(45, 67, 100);
add(40, 89, 5, 34, 689);
const x = [100, 200, 300, 400, 500];
add(...x); //@  Here spread operator is unpacking all elements an provide them to the function as arguments.
let ingredients = ["Mushroom", "Garlic", "Cheese", "Butter"];
restaurant.orderPizza(...ingredients);
restaurant.orderPizza("Tomatoes", "mushrooms", "garlic", "chicken", "pepper");
//@  Rest operators used where variables name seperated by commas not elements separated by commas
*/

/*
////////////////////////////////////////////////////////////////////////////////////

//!  Short Circuiting with  && and || operators

const restaurant = {
  name: "Classico Italiano",
  location: "Agra Trivani Bombay Kalyani",
  categories: ["Italian", "Pizzeria", "Vegetarain", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `This is your ordered Pasta loaded with ${ing1},${ing2}, and ${ing3}. Enjoy It! `
    );
  },
  orderPizza: function (mainIngredient, ...additionalIngredients) {
    console.log(mainIngredient, additionalIngredients);
  },
};

console.log(`-------OR-------`);
//@  OR operator short circuiting the code once it find a truthy value.
//@  OR operator can use any value and can return any data type.
console.log(3 || `Vaskar`); //@  Here both are truthy values so when the code will be executed it only print the first truthy value and will ignore the next value.. It is because 'OR' operator give falsly output only when both values are falsy..so if one of the value is truthy then it dosent check for the next one as the result will always be true.
//!  Short circuiting means breaking the code.
console.log("" || "Vaskar");
console.log(true || 0);
console.log(undefined || null); //@  Both values are falsy so it will print the last falsy value.
console.log(undefined || 0 || "" || "Hello" || 23 || null);

//@  Storing the value of restaurant.numGuests into the variable if its exists if not then store default value 10.
// restaurant.numGuests = 23;
restaurant.numGuests = 0;
//@  "0" is aslo a falsy value for OR operator.

//! Method 1 - Using TERNARY OPERATOR
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);
//! Method 2 - Using 'OR' OPERATOR
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

//!  'AND' OPERATOR >>>
//@  AND operator is the opposite of 'OR' operator. It short circuit the code once it find a falsy value. If both values are truthy then the result is aslo truthy value.

console.log(`----AND------`);

console.log(0 && `Vaskar`);
console.log(7 && `Vaskar`);
console.log("hello" && 23 && null && "Vaskar");

//!  Practical example

//!  Using if else statement ->
if (restaurant.orderPizza) {
  restaurant.orderPizza("Mushrooms", "Spinach", "Brocoli", "Cheese");
}
//!  Using 'AND' Operator ->
restaurant.orderPizza &&
  restaurant.orderPizza("Mushrooms", "Spinach", "Brocoli", "Cheese");
//@  If restaurant.orderPizza dosenot exist then nothing will happen but if it exist then it will continue to evaluate for the next truthy value as 'AND' operator only give truthy value when all the values are truthy.

////!  Nullish Coalescing Operator (??)
//@  Nullish operator aslo evaluate on the basis of truthy values.
//@  only null and undefined are nullish values. 0 is not a nullish value.
console.log(`--------nullishCoalescingOperator----------`);
restaurant.numGuests = 0;
const guests3 = restaurant.numGuests ?? 10; //@  here restaurant.numGuests is 0 which is a truthy value for nullish operator.
console.log(guests3);
*/
//@ //////////////////////////////////////////////////////////////////////

/*
// ! Coding Challenge @ 1
// We're building a football betting app (soccer for my American friends 😅)! 
// Suppose we get data from a web service about a certain game ('game' variable on
// next page). In this challenge we're gonna work with that data.
// Your tasks:
// 1. Create one player array for each team (variables 'players1' and
// 'players2')
// 2. The first player in any player array is the goalkeeper and the others are field
// players. For Bayern Munich (team 1) create one variable ('gk') with the
// goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10
// field players
// 3. Create an array 'allPlayers' containing all players of both teams (22
// players)
// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a
// new array ('players1Final') containing all the original team1 players plus
// 'Thiago', 'Coutinho' and 'Perisic'
// 5. Based on the game.odds object, create one variable for each odd (called
// 'team1', 'draw' and 'team2')
// 6. Write a function ('printGoals') that receives an arbitrary number of player
// names (not an array) and prints each of them to the console, along with the
// number of goals that were scored in total (number of player names passed in)
// 7. The team with the lower odd is more likely to win. Print to the console which
// team is more likely to win, without using an if/else statement or the ternary
// operator.
// Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'.
// Then, call the function again with players from game.scored
// GOOD LUCK 😀

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//! SOLUTIONS

//! 1.
const [players1, players2] = game.players;
console.log(players1, players2);

//! 2.
const [gk, ...fieldPlayers] = [...players1];
console.log(gk, fieldPlayers);

//! 3.
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

//! 4.
const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"];
console.log(players1Final);

//! 5.
// const { team1, x: draw, team2 } = game.odds;
// console.log(team1, draw, team2);
//@  OR >>
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

//! 6.
const printGoals = function (...players) {
  console.log(...players);
  console.log(`${players.length} goals were scored.`);
};
// printGoals("Davies", "Muller", "Lewandowski", "Kimmich");
// printGoals("Davies", "Muller");
printGoals(...game.scored);

//! 7.
team1 < team2 && console.log(`Team 1 is more likely to win.`);
team1 > team2 && console.log(`Team 2 is more likely to win.`);
//@ OR----With ternary operator.
team1 < team2
  ? console.log(`Team 1 is more likely to win.`)
  : console.log(`Team 2 is more likely to win.`);

//! ///////////////For of loop///////////////////////
//@  It was introduced in ES6.
const newArr = [...allPlayers];
//Printing all elements of newArr array using for of loop.
console.log(`From for of loop-------------`);
for (const item of newArr) console.log(item);
//@  'Continue' and 'break' aslo works for this loop.
//@  In "for-of" loop "item" word is the variable name and after "of" keyword target element name has to be specified.
//@  Here logging index of each iteration is not same as other loops.
for (const [i, el] of newArr.entries()) {
  console.log(`${i + 1}:${el}`);
}
// console.log(...newArr.entries());
//!  Printing all elements of newArr array using for loop.
console.log(`From for loop-------------`);
for (let i = 0; i < newArr.length; i++) {
  // console.log(`${newArr.indexOf(newArr[i]) + 1}:${newArr[i]}`);
  //!  OR >>
  console.log(`${i + 1}:${newArr[i]}`);
  //@ By adding one we are starting numbering from 1 instead of 0.
}

//!  Printing all elements of newArr array using while loop.
console.log(`From while loop-------------`);
let i = 0;
while (i < newArr.length) {
  // console.log(`${newArr.indexOf(newArr[i]) + 1}:${newArr[i]}`);
  console.log(`${i + 1}:${newArr[i]}`);
  //@  By adding one we are starting numbering from 1 instead of 0.
  i++;
}

/////////////////////////////////////////////////////////////
//! Enhanced Object Literals.
//@ Some features ..included in ES6.
const days = ["mon", "tue", "wed", "thrus", "fri", "sat", "sun"];

const openingHours = {
  //we can aslo compute property name in object.
  [days[3]]: {
    open: 12,
    close: 22,
  },
  [days[4]]: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0,
    close: 24,
  },
  [days[6]]: {
    open: 15,
    close: 24,
  },
};
const restaurant = {
  name: "Classico Italiano",
  location: "Agra Trivani Bombay Kalyani",
  categories: ["Italian", "Pizzeria", "Vegetarain", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  //////we can include global objects within an object by simply mentioning its name as a property.
  openingHours,
  //Old method of writing is ...openingHours:openingHours;
  orderPizza: function (mainIngredient, ...additionalIngredients) {
    console.log(mainIngredient, additionalIngredients);
  },
  /////We can aslo write method like this.
  orderPizzaNEW(mainIngredient, ...additionalIngredients) {
    console.log(mainIngredient, additionalIngredients);
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};

//!  Optional chaining (?.) >>

// console.log(restaurant.openingHours.mon.open); //@  as mon dont exist it will give an error so to overcome that error we have following ways of doing.

//!  Using if else statement & AND operator.
if (restaurant.openingHours && restaurant.openingHours.mon) {
  console.log(restaurant.openingHours.mon.open);
}
//!  Using optional channing.
console.log(restaurant.openingHours?.mon?.open); //@ Here ? is an optional chaning which checks that a asked property exist or not.
//@  If a property doesnt exist then optional chaining simply provide output undefined.
for (const day of days) {
  // console.log(day);
  const open = restaurant.openingHours[day]?.open ?? "Closed"; //@ if we use OR operator here then it will consider 0 aslo a faulty value and start to evaluate the next code. So if open =0 then this code will make it closed which is not correct. So correct this behaviour we can use nullish operator here.

  if (open === "Closed") console.log(`We are closed on ${day}`);
  else console.log(`On ${day}, we open at ${open}. `);
}

//@  Optional chaining can aslo useful while calling a method.
console.log(restaurant.order?.(0, 1) ?? "The called method dont exist.");
//@  Without optional chaining if the method would not have exist we would have got an error.
console.log(restaurant.order123?.(0, 1) ?? "The called method dont exist.");
//@ This method dosent exist but due to optional chaining we didnt get any error.

//@  Optional chaining can be used on arrays.
const users = [{ name: "Vaskar chandra das", dob: 19071997 }];
console.log(users[0]?.name ?? "user array is empty.");
*/

//!  LOOPING OBJECTS - Keys ,Values and  Entries
//@  Keys , values and entries all these methods provides an array as a output.

const openingHours = {
  fri: {
    open: 12,
    close: 22,
  },
  sat: {
    open: 11,
    close: 23,
  },
  sun: {
    open: 0,
    close: 24,
  },
};

//@  Keys = means property names of an object.

const properties = Object.keys(openingHours);
console.log(properties);
//@ So Object.keys(OBJECT_NAME) provide an array as a output contains property names called keys..
//@ therefore we are looping over objects indirectly with the help of array.
let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
  // console.log(day); //@  Output property names of the object openingHours.
  openStr += `${day} `;
}
console.log(openStr);
//!  OR
let openStr1 = `We are open on ${properties.length} days: ${[...properties]}`;
console.log(openStr1);
//! OR - SAME THING WITH FOR LOOP >>
let openStr2 = `We are open on ${properties.length} days: `;
for (let i = 0; i < properties.length; i++) {
  openStr2 += `${properties[i]} `;
}
console.log(openStr2);

////////////////////////////////////////////

//! Property or key Values.
const values = Object.values(openingHours);
console.log(values);
//!  ENTRIES = KEY + VALUES >>>
const entries = Object.entries(openingHours);
console.log(entries);
for (const [key, { open: o, close: c }] of entries) {
  console.log(`On ${key} open at ${o} and close ${c}`);
}
//@ [key, { open: o, close: c }] this whole thing is a array of entries variable in which object is stored. Here key is the key property and 2nd value is the nested object.

//!  Testing >>>
const testarray = ['vaskar', 'binita', 'mamata', 235];
console.log(Object.entries(testarray));
console.log(Object.values(testarray));
console.log(Object.keys(testarray));

/*
//////////////////////////////////////////////////////////////////////////////////////

//!  Coding Challenge @ 2
// Let's continue with our football betting app!  Keep using the 'game' variable from
// before.
// Your tasks:
// 1. Loop over the game.scored array and print each player name to the console,
// along with the goal number (Example: "Goal 1: Lewandowski")
// 2. Use a loop to calculate the average odd and log it to the console (We already
// studied how to calculate averages, you can go check if you don't remember)
// 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them
// (except for "draw"). Hint: Note how the odds and the game objects have the
// same property names 😉
// 4. Bonus: Create an object called 'scorers' which contains the names of the
// players who scored as properties, and the number of goals as the value. In this
// game, it will look like this:
// {
// Gnarby: 1,
// Hummels: 1,
// Lewandowski: 2
// }
// GOOD LUCK 😀
const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
//! Solutions

//! 1.
//@  With for loop

for (let i = 0; i < game.scored.length; i++) {
  console.log(`Goal ${i + 1} : ${game.scored[i]}`);
}

console.log(`--------------------------------------`);

//@ With for of loop.
for (const [index, value] of game.scored.entries()) {
  console.log(`Goal ${index + 1}: ${value}`);
}

//@ for checking.....
const goals = Object.entries(game.scored);
const k = Object.keys(game.scored);
const x1 = Object.values(game.scored);
console.log(goals);
console.log(k);
console.log(x1);

//@  Object.entries(Object-Name) use for objects to get entries and ASLO FOR ARRAYS....

//! 2.
//@ FIND AVERAGE >>>

const x = Object.values(game.odds);

//@  Without Loop
const [a, b, c] = x;
console.log((a + b + c) / 3);

//@  with for loop
let sum = 0;
for (let i = 0; i < x.length; i++) {
  sum += x[i] / x.length;
}
console.log(sum);

//@ with for-of loop
let average = 0;
for (const avg of x) {
  average += avg / x.length;
}

console.log(average);
//@ Using .reduce() method >>>>>
const test = x.reduce(
  (acc, number, _, array) => acc + number / array.length,
  0
);
console.log(test);

//! 3.
//@  with for of loop
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === "x" ? "draw" : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr}: ${odd}`);
}
//@  Odd of victory Bayern Munich: 1.33
//@  Odd of draw: 3.25
//@  Odd of victory Borrussia Dortmund: 6.5

//! 4.Bonus...
//@ Using For of Loop -
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);
//@  yeh loop har iteration mein check krta hai ki array ka element as a property object scorers mein exist krta hai ki nahi agr woh exist nahi krta hai scorers[us property ak nam]=1 set kr dena hai...iske bad agr wahi property phise exist krta hai to scorer[property name] ka value jo ki pehle 1 tha usse +1 badha deta hai..is tarah agr woh property bar bar exist krta hai to uska value increase hota rahega.

//@ OR - Using for Loop -
const scorers1 = {};
for (let i = 0; i < game.scored.length; i++) {
  scorers1[game.scored[i]]
    ? scorers1[game.scored[i]]++
    : (scorers1[game.scored[i]] = 1);
}
console.log(scorers1);

//@ Using forEach Loop -
const scorers2 = {};
game.scored.forEach((player) =>
  scorers2[player] ? scorers2[player]++ : (scorers2[player] = 1)
);
console.log(scorers2);
*/

/*
//@//////////////////////////////////////////////////////

//! SETS - a new data structure which was introduced in ES6.
const ordersSet = new Set(["Pizza", "Pasta", "Chesse", "Pizza", "Pasta"]);
console.log(ordersSet);
//@ Sets remove all duplicates elements and will have only unique values.
console.log(new Set("Vaskar"));
//@ It contains all the letter of the string provided without any duplicates.

//! Finding sets size.
console.log(ordersSet.size);
console.log(new Set("Vaskar").size);
//! Check that a particular element is present in set or not
console.log(ordersSet.has("Pizza"));
console.log(ordersSet.has("garlic"));
//! Adding an element in set
ordersSet.add("Garlic bread");
console.log(ordersSet);
//!  Deleting an element
ordersSet.delete("Pasta");
console.log(ordersSet);
//! Removing all elements of sets.
// ordersSet.clear();
// console.log(ordersSet);
//!The .values() method returns an Iterator object containing all the values in a Set:
console.log(ordersSet.values());

//! NOTE -
//@ Element of sets are not accessible by index number or anything else as sets dont assign index to the elements like arrays. So if we want to access the data then we need to use array but if we want a unique set of data without any duplicates then sets is best.

//! Sets are aslo iterables so we can loop over them.
for (const x of ordersSet) {
  console.log(x);
}
//! Real life example..
//@ So this is an array containing some duplicate values.
const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef", "Waiter"];

//! Find the post avialable.
const staffUnique = new Set(staff);
console.log(staffUnique);
//@ find number of post avialable.
console.log(staffUnique.size);

//@ Getting back an Unique array from a set.
//@ sets is iterable so spread operator can work on it.
const staffUniqueArray = [...new Set(staff)];
console.log(staffUniqueArray);
//! SUMMARY ->
// new Set()	Creates a new Set
// add()	Adds a new element to the Set
// delete()	Removes an element from a Set
// has()	Returns true if a value exists
// clear()	Removes all elements from a Set
// forEach()	Invokes a callback for each element
// values()	Returns an Iterator with all the values in a Set
// keys()	Same as values()
// entries()	Returns an Iterator with the [value,value] pairs from a Set
// Property	Description
// size	Returns the number elements in a Set
//@//////////////////////////////////////////////////////

//! MAP -was included in ES6
//@ Maps is like objects in which we can store data in property name or key. but unlike objects we can use any data type for key name.
const rest = new Map(); //@ This is an empty map.

//! Assigning values to the map.
//@ Here the first value is key and the 2nd one is its value.
//! The set() method return WHOLE MAP.
rest.set("name", "Vaskar chandra das");
rest.set(1, "Kalyani");
console.log(rest.set(2, "Kanchrapara"));

//! Chaining the set method.
rest
  .set("school", "Kendriya Vidyalaya No.2 Kanchrapara")
  .set("friends", ["Neuer", "Pavard", "Martinez"])
  .set("categories", ["Italian", "Pizzeria", "Vegetarain", "Organic"])
  .set("open", 11)
  .set("close", 23)
  .set(true, "We are opened :D")
  .set(false, "We are closed :(");
console.log(rest);
//! Reading data from map using GET method.
console.log(rest.get("school"));
console.log(rest.get("friends"));
console.log(rest.get(true));
console.log(rest.get(1));
//@ Example ->
const time = 12;
console.log(rest.get(time > rest.get("open") && time < rest.get("close")));
//! Check for an element in a map.
console.log(rest.has("close"));
console.log(rest.has("below"));
//! Array as a key name.
// rest.set([1, 2], "My Key name is an array.");
//@  Obtaining a value whose key is an array.
// console.log(rest.get([1, 2]));
//@ 'undefined' Because [1,2] in set() method is different which is in get() as both have separate memory address in a heap.

//@ Correct method of getting Element whose property name is an array.
const x = [1, 2];
rest.set(x, "My key is an array");
console.log(rest.get(x));
//! Deleting a key.
rest.delete(2);
console.log(rest);
//! Removing all keys.
// rest.clear();
// console.log(rest);
//! Size of a MAP
console.log(rest.size);
//! Using dom >
rest.set(document.querySelector("h1"), "HEADING");
console.log(rest);

const openingHours = {
  fri: {
    open: 12,
    close: 22,
  },
  sat: {
    open: 11,
    close: 23,
  },
  sun: {
    open: 0,
    close: 24,
  },
};
const question = new Map([
  ["question", "What is the best programming language in the world?"],
  [1, "C"],
  [2, "Java"],
  [3, "Javascript"],
  ["correct", 3],
  [true, "Correct Answer"],
  [false, "Wrong answer!  Try Again."],
]);

console.log(question);

//! Converting object to MAP
console.log(Object.entries(openingHours)); //@ The syntax of Object.entries(openingHours) is same as the above MAP.
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

//! Get method use to get data from a map.
console.log(question.get("question"));

//! Map are aslo iterables.
//@ Map is similar to the Object.entries(Object-Name)
for (const [key, value] of question) {
  if (typeof key === "number") console.log(`Answer ${key} : ${value}`);
}
//! Quiz >
const answer = 3;
// const answer = Number(prompt(`Enter your answer.`));
console.log(answer);
console.log(question.get(question.get("correct") === answer));

//! Spread operator can be use for maps. Converting maps into array.
console.log(...question);
//@ Print a MapIterator which is similar to Map itself
console.log(question.entries());
//@ Printing all keys
console.log(...question.keys());
//@ Printing all values of keys.
console.log(...question.values());

////////////////////////////////////////////////////////////////////////////
// ! Coding Challenge @ 3
// Let's continue with our football betting app!  This time, we have a map called
// 'gameEvents' (see below) with a log of the events that happened during the
// game. The values are the events themselves, and the keys are the minutes in which
// each event happened (a football game has 90 minutes plus some extra time).
// Your tasks:
// 1. Create an array 'events' of the different game events that happened (no
// duplicates)
// 2. After the game has finished, is was found that the yellow card from minute 64
// was unfair. So remove this event from the game events log.
// 3. Compute and log the following string to the console: "An event happened, on
// average, every 9 minutes" (keep in mind that a game has 90 minutes)
// 4. Loop over 'gameEvents' and log each element to the console, marking
// whether it's in the first half or second half (after 45 min) of the game, like this:
// [FIRST HALF] 17:
// ⚽
// GOAL
// GOOD LUCK 😀
const gameEvents = new Map([
  [17, "⚽ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🔶 Yellow card"],
  [69, "🔴 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽ GOAL"],
  [80, "⚽ GOAL"],
  [92, "🔶 Yellow card"],
]);
console.log(gameEvents);

//! SOLUTIONS ->

//@ 1.
const events = [...new Set(gameEvents.values())];
console.log(events);
//@ 2.
gameEvents.delete(64);
console.log(gameEvents);
//@ 3.
const keys = [...gameEvents.keys()].pop();
console.log(keys);
//@ Method .pop() has a return value = deleted element
console.log(
  `An event happened, on average, every ${keys / gameEvents.size} minutes`
);
//@ 4.
for (const [min, events] of gameEvents) {
  let half = min <= 45 ? "FIRST" : "SECOND";
  console.log(`[${half} HALF] ${min} : ${events}`);
}
*/

//@/////////////////////////////////////////////////////////

/*
//! Working with strings.....
//@ strings aslo have methods like objects which is a unsual thing as primitive values dont get any method of their own, but this happens because js smartly converts the string into string object when we use methods on them.

const airline = "TAP Air Portugal";
const plane = "A320";
console.log(plane[0]);
console.log(plane[1]);
console.log(plane[3]);
console.log("B737"[0]);

//! length method ->
console.log(airline.length);
console.log("B373".length);
//! indexOf() and lastIndexOf() methods ->
//@ In indexing space aslo have index number. when one letter is present more than one time .indexof() will provide index of the first asked letter only. Also this method is case sensitive.
console.log(airline.indexOf("A"));
console.log(airline.indexOf("r"));
console.log(airline.lastIndexOf("r"));
console.log(airline.indexOf("TAP"));
console.log(airline.indexOf("Air"));
console.log(airline.indexOf("Portugal"));
//! slice method = slice(x,y)= x is the starting point of slicing and y is the end where the slicing has to be stopped but y will not be included.
console.log(airline.slice(4)); //@ here slicing started from index 4 . Including index 4 upto the last letter.
console.log(airline.slice(0, 3));
console.log(airline.slice(0, -1)); //@  -1 means last letter.
//@   "-" indicates numbering from right to left.

console.log(airline.slice(4, airline.lastIndexOf(" ")));
console.log(airline.slice(-2));
console.log(airline.slice(0, -2));

//! Function to check middle seat
//@ seat number with end letter B and E are middle seats.
const checkMiddleSeat = function (seat) {
  let s = seat.slice(-1);
  if (s === "B" || s === "E") {
    console.log(`You got the middle seat😕`);
  } else {
    console.log(`You got Lucky😎`);
  }
};
checkMiddleSeat("11B");
checkMiddleSeat("22C");
checkMiddleSeat("76E");

//@ This is how js converts string into string object.
console.log(new String("Vaskar"));
console.log(typeof new String("Vaskar"));
console.log(typeof new String("Vaskar")[0]); //@ though it is a string object it returns a string.

//! Uppercase and lowercase
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

//@ Fix capitilization
const passenger = "VasKAR";
const correctName =
  passenger.toLowerCase()[0].toUpperCase() + passenger.toLowerCase().slice(1);
console.log(correctName);
//@ Function which will fix capitilization of a given name.
const nameCorrection = function (passengerName) {
  return (
    passengerName.toLowerCase()[0].toUpperCase() +
    passengerName.toLowerCase().slice(1)
  );
};
console.log(nameCorrection("VASKAR CHANDRA DAS"));

//! Comparing email using .trim() method ->
//@ trim() method use to delete all the spaces included in a string. trimStart() and trimEnd() aslo exists.
const demoEmail = "vcdas123@gmail.com";
const loginEmail = "  VCDAS123 @gmail.com \n";
const finalEmail = loginEmail.toLowerCase().split(" ").join("").trim();
//@ trim() cant remove spaces between two letters for that here i used split and join method.

demoEmail === finalEmail
  ? console.log(finalEmail)
  : console.log(`Email correction is not done properly.`);

//! Replacing
const priceInGB = "288,97£";
const priceUS = priceInGB.replace("£", "$").replace(",", ".");
//@ this way we can chain replace method as return value is string.
console.log(priceUS);

const announcement = `All passemgers come to boarding door 23. Boarding door 23! `;
console.log(announcement.replace("door", "gate")); //@  It will replace only the first occurence of "word".
console.log(announcement.replaceAll("door", "gate")); //@  It will replace all the occurences at once.
//@ replaceAll() method was introduced in ES2019.

//! Booleans
const planeNEW = "Airbus A320 neo";
console.log(planeNEW.includes("A320"));
console.log(planeNEW.includes("Boeing"));
console.log(planeNEW.includes("bus"));

//! startsWith and endsWith 
console.log(planeNEW.startsWith("Ai"));
console.log(planeNEW.startsWith("Airb"));
console.log(planeNEW.startsWith("Airbus"));
console.log(planeNEW.endsWith("Airbus"));
console.log(planeNEW.endsWith("neo"));
console.log(planeNEW.endsWith("A320"));

if (planeNEW.startsWith("Airbus") && planeNEW.endsWith("neo")) {
  console.log(`Part of the NEW Airbus family.`);
}

//@ Practice exercise
const checkBaggage = function (items) {
  const itemsLowercase = items.toLowerCase();

  if (itemsLowercase.includes("gun") || itemsLowercase.includes("knife")) {
    console.log(`You are not allowed to board.`);
  } else {
    console.log(`Welcome!  please start to board.`);
  }
};

checkBaggage(`I have a laptop, some FOod and a pocket kNIfe`);
checkBaggage(`socks and camera`);
checkBaggage(`Got some snacks and a gun for protection.`);

//! Split method
//@ Split method split a string in multiple pieces and put them into an array.
console.log("a+very+nice+string".split("+"));
console.log("Vaskar Chandra Das".split(" "));
const [firstName, middleName, lastName] = "Vaskar Chandra Das".split(" ");
//! join method
//@ join method is the opposite of split() , it combine all the elements of an array and provide a string as output.
const newName = ["Mr", firstName, lastName.toUpperCase()].join(" ");
const newName1 = ["Mr", firstName, lastName.toUpperCase()].join("--");
const newName2 = ["Mr", firstName, lastName.toUpperCase()].join("-----");
console.log(newName);
console.log(newName1);
console.log(newName2);
//@ function use to captilize the first letter of a name.
const capitilization = function (name) {
  const names = name.toLowerCase().split(" ");
  let output = [];
  for (const x of names) {
    // output.push(x[0].toUpperCase() + x.slice(1));
    //OR
    output.push(x.replace(x[0], x[0].toUpperCase()));
  }
  return console.log(output.join(" "));
};

capitilization("vaskar mamata suraj binita sayan");
capitilization("vaskar chandra das");

//! Padding method ->
const message = "Go to gate 23! ";
console.log(message.padStart(25, "+").padEnd(40, "*"));
//@ A good usecase of padStart() and padEnd() method is to mask credit card number on payment pages.
const maskCreditCard = function (number) {
  const str = String(number);

  //@  OR const str=number+" "; //this is a type coercion.
  return console.log(str.slice(-4).padStart(str.length, "*"));
};

maskCreditCard(125984125461);
maskCreditCard(789224112115);
maskCreditCard("7892241121158896324");
maskCreditCard("78922411211213131312");

//! Repeat method.
const message2 = "Hello Biro...What's Up?";
console.log(message2.repeat(10));

const planesInLine = function (n) {
  return console.log(`There are ${n} planes in line ${"✈".repeat(n)}`);
};
planesInLine(5);
planesInLine(10);
planesInLine(15);

//! concat() method use to join strings together.
const str1 = "Hello";
const str2 = "World";

console.log(str1.concat(" ", str2));
// expected output: "Hello World"

console.log(str2.concat(", ", str1));
// expected output: "World, Hello"

//! Reverse a given string---revese method work on arrays.
const strReverse = function (str) {
  // const convertToSting = String(str);
  // const splitted = convertToSting.split("");
  // const reversed = splitted.reverse();
  // return console.log(reversed.join(""));
  //OR///
  return console.log(String(str).split("").reverse().join(""));
};
strReverse("Vaskar");
strReverse(5656);
*/
//!  Coding Challenge @ 4
// Write a program that receives a list of variable names written in underscore_case
// and convert them to camelCase.
// The input will come from a textarea inserted into the DOM (see code below to
// insert the elements), and conversion will happen when the button is pressed.
// Test data (pasted to textarea, including spaces):
// underscore_case
// first_name
// Some_Variable
// calculate_AGE
// delayed_departure
// Should produce this output (5 separate console.log outputs):
// underscoreCase ✅
// firstName ✅✅
// someVariable ✅✅✅
// calculateAge ✅✅✅✅
// delayedDeparture ✅✅✅✅✅
// Hints:
// § Remember which character defines a new line in the textarea 😉
// § The solution only needs to work for a variable made out of 2 words, like a_b
// § Start without worrying about the ✅. Tackle that only after you have the variable
// name conversion working 😉
// § This challenge is difficult on purpose, so start watching the solution in case
// you're stuck. Then pause and continue!
// Afterwards, test with your own test data!
// GOOD LUCK 😀

//@ Solution.......
const textArea = document.querySelector('textarea');
const btn = document.querySelector('button');

btn.addEventListener('click', function () {
  const text = textArea.value;
  const rows = text.split('\n');

  for (const [i, x] of rows.entries()) {
    const [first, second] = x.toLowerCase().trim().split('_');

    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20, ' ')}${'✅'.repeat(i + 1)}`); //or .padEnd(20) same.
  }
});

//! String Methods Practice

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const getCode = str => str.slice(0, 3).toUpperCase();
for (const flight of flights.split('+')) {
  let [type, from, to, time] = flight.split(';');

  const output = `${type.includes('Delayed') ? '🔴' : ''}${type.replaceAll(
    '_',
    ' '
  )} from ${getCode(from)} to ${getCode(to)} (${time.replace(
    ':',
    'h'
  )})`.padStart(45);

  console.log(output);
}
