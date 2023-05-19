"use strict";

console.log(this);
//Simple function--has this keyword undefined.
function calcAge(birthYear) {
  console.log(2022 - birthYear);
  console.log(this);
}
calcAge(1997);
// ---------------------------------
//Arrow functions dont have their own this keyword.Here this keyword point to global window object.
const calcAgeArrow = (birthYear) => {
  console.log(2022 - birthYear);
  console.log(this);
};
calcAgeArrow(2002);
// -------------------------------
//Objects--here this keyword point to the object which calls the method.
const vaskar = {
  firtName: "Vaskar",
  middleName: "Chandra",
  lastName: "Das",
  year: 1997,
  calcAge: function () {
    console.log(this);
    console.log(2022 - this.year);
  },
};
vaskar.calcAge();
//------------------

const mamata = {
  year: 2014,
};
mamata.calcAge = vaskar.calcAge;

mamata.calcAge(); //this points to mamata despite it is written in vaskar object.
const f = vaskar.calcAge;
f(); //give error as now the calcAge function stored in this normal function and normal regular functions without any methods have this keyword equal to undefined so js cant able to get the value of this.year.
