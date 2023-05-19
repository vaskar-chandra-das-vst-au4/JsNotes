'use strict';
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);
const getLimit = (limits, user) => limits?.[user] ?? 0;

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas'
) {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda'
);
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

const checkExpenses = (state, limits) =>
  state.map(entry =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry
  );

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log(finalBudget);

const logbigExpenses = function (state, biglimit) {
  //! Declarative way ->
  const bigExpense = state
    .filter(entry => entry.value <= -biglimit)
    .map(entry => entry.description.slice(-2))
    .join(' / ');
  return bigExpense;
  //! Imperative way ->
  // let output = '';
  // budget.forEach(entry => {
  //   entry.value <= -biglimit
  //     ? (output += `${entry.description.slice(-2)}  / `)
  //     : '';
  //   //! Emojis are of 2 chars
  // });
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
};
console.log(logbigExpenses(finalBudget, 100));
