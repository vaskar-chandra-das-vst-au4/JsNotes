'use strict';
//Arrow vs regular functions.
const vaskar = {
  //this is not a code block ,it is just a object literal.
  firtName: 'Vaskar',
  middleName: 'Chandra',
  lastName: 'Das',
  year: 1997,
  calcAge: function () {
    console.log(this);
    console.log(2022 - this.year); //has access of the year of object vaskar as calAge is a method for this object.

    // const isAdult = function () {
    //   console.log(this);
    //   console.log(this.year >= 1990);//here the this keyword is undefined because isAdult is not a method in vaskar object it is just a regular function.To overcome this problem below are the two possible solution.
    // };
    // isAdult();
    //Solution 1- old method.
    const self = this; // here this keyword points to object vaskar for calcAge function.Like tjis we can this keyword of vaskar accessible to isAdult regular function too.
    const isAdult = function () {
      console.log(self);
      console.log(self.year >= 1990);
    };
    isAdult();
    //Solution 2 by using arrow function.
    //Arrow function inherit the this keyword of its parent function.. so here parent scope is calcAge who has access to this keyword which points to vaskar object.
    const isAdult2 = () => {
      console.log(self);
      console.log(self.year >= 1990);
    };
    isAdult2();
  },
  greet: () => console.log(`Hey ${this.firstName}`), //here in this arrow function this keyword is the global window object.That's why the result is hey undefined.
};
vaskar.calcAge();
vaskar.greet();

//! ----------Argument--keyword------
//Only avialable to regular function.
//argument keyword provide an array containing all the arguments passed to a regular function.
//we can pass multiple arguments without mentioning multiple parameter in the function.
// ! In arrow function argument variable do not exist.
const addExpr = function () {
  let sum = 0;
  arr = Array.from(arguments);
  arr.forEach(num => (sum += num));
  return sum;
};
addExpr(22, 44);
addExpr(22, 44, 23, 45);
