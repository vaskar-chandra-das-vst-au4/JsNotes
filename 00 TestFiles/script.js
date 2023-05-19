'use strict';
const test = async function () {
   const res = await fetch('https://vcdas-natours-app.onrender.com/api/v1/tours/');
   console.log(res);
   const data = await res.json();
   console.log(data);
};
test();
