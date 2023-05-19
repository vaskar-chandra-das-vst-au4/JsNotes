"use strict";

// ! 1. Reverse a String ->
// You are given a string s. You need to reverse the string.
// Input:s = Geeks
// Output: skeeG
//! Solution ->
const reverseWord = function (str) {
  //Your code here
  return str.split("").reverse().join("");
};
console.log(`Solution 1 -`, reverseWord("Geeks"));

//! 2. Multiply two string ->
// Given two numbers as strings s1 and s2. Calculate their Product.
// Note: The numbers can be negative.
// 505041410988047 3318139 = Inputs
// 1675797602414467284533 = Output

// console.log(1675797602414467284533n);
//@ Solution ->
const test = function (s1, s2) {
  //code here
  const s1B = BigInt(s1);
  const s2B = BigInt(s2);
  const pdt = s1B * s2B;
  return String(pdt);
};
console.log(`Solution 2 -`, test(505041410988047, 3318139));
console.log(`Solution 2 -`, test(-10, 0));

//! 3. Reverse words in a given string ->
// Given a String S, reverse the string without reversing its individual words. Words are separated by dots.
// Input: S = i.like.this.program.very.much;
// Output: much.very.program.this.like.i;
//@ Solution ->
const reverseWords = function (s) {
  const revWords = s.split(".").reverse().join(".");
  return revWords;
};
console.log(`Solution 3 -`, reverseWords("i.like.this.program.very.much"));

//! 4. Parenthesis Checker ->
// Given an expression string x. Check whether the given sting contains balanced bracket pair.
// Input - {([])} ,Output - True;
//Input - {([])(())}, Output - False ;
const parChecker = function (x) {
  const stacK = [];
  const brackets = [...x];
  brackets.forEach((br) => {
    if (br === "(" || br === "[" || br === "{") {
      stacK.push(br);
    } else if (br === ")" || br === "]" || br === "}") {
      if (br === stacK[stacK.length - 1]) {
        stacK.pop();
      } else {
        console.log(false);
      }
    }
  });
  console.log(stacK);
};

parChecker("{([])}");
