console.log(`Exporting Module`);
const shippingCost = 10;
const cart = [];
//@ We can export specific parts by adding export keyword but to share all things together we need to use object.
//! Export are of two types - NAMED EXPORT AND DEFAULT EXPORT.
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart!`);
};
const totalPrice = 245;
const totalQuantity = 40;
export { totalPrice, totalQuantity as tq, cart };

//! Default export -> Here we export a value.
export default function (...numbers) {
  let sum = 0;
  numbers.forEach(no => (sum += no));
  console.log(`The sum is ${sum}.`);
}
