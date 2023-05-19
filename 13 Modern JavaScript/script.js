//! Importing Module ->
//@ This way we can access only Public methods ->
// import './shoppingCart.js';
console.log(`Importing Module`);
//! NAMED EXPORT ->
//@ Accessing specific methods of the exporting module ->
//@ We can change import variable name using 'as'
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('bread', 5);
// console.log(price, tq);
//! Importing Everthing at once ->
import * as ShoppingCart from './shoppingCart.js';
ShoppingCart.addToCart('bread', 5);
ShoppingCart.addToCart('soda', 2);
ShoppingCart.addToCart('soap', 7);
console.log(ShoppingCart.totalPrice, ShoppingCart.tq);
console.log(ShoppingCart.cart);

//! Default import -> We can give any name to default imported method aslo we use curly braces for named imports but not for default imports.
//@ We should not mix default and named import. aslo we must not use both in same file.  Like this -
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
import add from './shoppingCart.js';
add(25, 36, 85, 200);
add(10, 23);
/*
//! Top level Await ->
// //@ Earlier it was not possible to use await keyword outside a async function . but in the latest version of js ES2022 we can now use it in a module outside a async function.

// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return { title: data.at(-1).title, text: data.at(-1).body };
};
const returned = await getLastPost();
console.log(returned);
*/
//! The module pattern  ->
const shoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 123;
  const totalQuantity = 20;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to the cart (Shipping cost is ${shippingCost}).`
    );
  };

  const orderStock = () => {
    console.log(`${quantity} ${product} ordered from supplier`);
  };
  //! Returned variables are public api -> But other than these all are private that is they are not accessible from outside this IIFE.
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

shoppingCart2.addToCart('Biryani', 10);
shoppingCart2.addToCart('apple', 10);
console.log(shoppingCart2);
console.log(shoppingCart2.shippingCost);
console.log(34 + 6);

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 9 },
    { product: 'apple', quantity: 4 },
  ],
  user: { loggedIn: true },
};

//! Cloning This state object using Javascript built in method ->
//@ But this copied object is a live copy that means both state and stateClone are pointing towards same data in the heap so any change made in original state will aslo get reflected in stateClone. But using cloneDeep method which we have imported from a module can solve this issue .
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateClone);
console.log(stateDeepClone);

//! Only understands by Browser ->
if (module.hot) {
  module.hot.accept();
}

console.log(`vaskar` ?? null);
console.log(`vdsaf` ?? null);
console.log(ShoppingCart.cart);
console.log(ShoppingCart.cart.find(n => n.quantity >= 3));
Promise.resolve('Test Data').then(data => console.log(data));
console.log(`Hello BORON`);

import 'core-js/stable';
// import 'core-js/stable/array/find';
//! Polifilling async functions ->
import 'regenerator-runtime/runtime';
