'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const languages = [];
  Object.values(data.languages).forEach(lang => languages.push(lang));
  // console.log(languages);
  const html = `<article class="country ${className}">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${
              languages[1] || languages[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[Object.keys(data.currencies)[0]].name
            }</p>
          </div>
        </article>`;
  // console.log(data.currencies[Object.keys(data.currencies)]);
  // console.log(Object.keys(data.currencies));
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};
const getJSON = function (url, errorMsg = 'Something Went Wrong!😈') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

///////////////////////////////////////
/*
//! Our First AJAX CAll ->
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener('load', function () {
    //   console.log(this.responseText); //@ JSON Data format
    const [data] = JSON.parse(this.responseText);
    // console.log(data);
    const languages = [];
    Object.values(data.languages).forEach(lang => languages.push(lang));
    // console.log(languages);
    const html = `<article class="country">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${
              languages[1] || languages[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[Object.keys(data.currencies)].name
            }</p>
          </div>
        </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};
getCountryData('india');
getCountryData('portugal');
getCountryData('sri lanka');
getCountryData('japan');
*/

//! CALLBACK HELL ->
//@ requesting multiple data one within other create a series of requests and its make the code messy and prone to get bugs easily as it is hard to read and understand. So to overcome this callback hell we have something called PROMISES.

// const getCountryAndNeigbour = function (country) {
//   //@ Creating the XMLHttpRequest OBJECT ->
//   const request = new XMLHttpRequest();
//   //@ Opening the OBJECT ->
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   //@ Sending request to the Server ->
//   request.send();
//   //@ Waiting for the DATA to arrive Using load EVENT->
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     // console.log(data);
//     //@ Rendering data of Main country  ->
//     renderCountry(data);

//     //! Redndering neigbouring Country ->

//     //@ Creating Object and Opening it->
//     const requestForN = new XMLHttpRequest();
//     requestForN.open(
//       'GET',
//       `https://restcountries.com/v3.1/alpha/${data.borders[0]}`
//     );
//     //@ Request made ->
//     requestForN.send();
//     //@ Arrived Data ->
//     requestForN.addEventListener('load', function () {
//       const [data] = JSON.parse(this.responseText);
//       // console.log(data);
//       renderCountry(data, 'neighbour');
//     });
//   });
// };
// getCountryAndNeigbour('india');

//! PROMISES ****->
//@ Promise is an object that is used as a placeholder for the future result of an asynchronous operation.
//@ Application -> we no longer rely on events and callbacks passed into asynchronous functions to handle asynchronous results. aslo instead of nesting callbacks we can chain promises for a sequence of asynchronous operations : escaping callback hell.
//@ Before the future value has arrived the status of the promise will be 'pending' at the same time the async task will be performed in the background. Once the task is finised and the data has arrived the status will either fullfilled or rejected. Once we get fullfilled promise we consume promise .

const getCountryAndNeigbour = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      // console.log(response) //! Here the data is not accessible so we need to first call json method on response. .json() method only work on responses get form a promise or from a fetch function. In other case we must use JSON.parse().
      //@ then method returns a promise by default so respondse is equal to that promise.
      //@ json method aslo return the same promise.
      return response.json();
      //@ If we set return manually then this return value will becaome the fullfilled value of the returned promise from then method.
    })
    .then(data => {
      renderCountry(data[0]);
    });
};

// getCountryAndNeigbour('india');

//! Chaining PROMISES ->
//@ Always return nested promises from the previous promise to avoid nesting or callback hell.
const getCountryAndNeigbour1 = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      console.log(data[0]);
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) return;
      // return data[0].borders[0]; //@ must not do this because it will increase one step.That is fetch step.
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(altResponse => altResponse.json())
    .then(data => renderCountry(data[0], 'neighbour'));
};

getCountryAndNeigbour1('india');

//! Handling REJECTED PROMISE ->
//@ By using a second callBack function into then method after fetch method line that is at response.json() line.. OR we can call a catch function at last of our code which will handle all the rejections.
//@ .finally() method will always be called no matter the promise is rejected or fullfilled.
//@ .catch() method only be called once a promise gets rejected aslo this method returns promise.
// const getCountryAndNeigbour = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(altResponse => altResponse.json())
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.log(`${err} 😢`);
//       renderError(`Something went wrong 😠 ${err.message}. Try again!`);
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
// };
// btn.addEventListener('click', function () {
//   getCountryAndNeigbour('india');
// });
//! Throwing ERRORS MANUALLY->
// const getCountryAndNeigbour = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);
//       if (!response.ok) {
//         throw new Error(`Country not Found ${response.status}`);
//         //@ this error will be catch by catch method . aslo this error is equal to err.message of catch method.
//       }

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(altResponse => altResponse.json())
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.log(`${err} 😢`);
//       renderError(`Something went wrong 😠 ${err.message}. Try again!`);
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
// };
// btn.addEventListener('click', function () {
//   getCountryAndNeigbour('india');
// });
// getCountryAndNeigbour('gkd');
//! Refactoring the above code ->
// const getJSON = function (url, errorMsg = 'Something Went Wrong!') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

//     return response.json();
//   });
// };

// const getCountryAndNeigbour = function (country) {
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country NOT FOUND')
//     .then(data => {
//       console.log(data[0]);
//       renderCountry(data[0]);
//       const neighbour = data[0].borders?.[0];
//       //! If we dont add optional chaining in 'neighbour' (actually in 'borders') then js will throw error that it 'cant read property of an defined', as a consequence the next line in which we have specified the custom error will not get executed...
//       if (!neighbour) throw new Error('Neighbour NOT FOUND!');

//       return getJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbour}`,
//         'Country NOT FOUND!'
//       );
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.log(`${err} 😢`);
//       renderError(`Something went wrong 😠 ${err.message}. Try again!`);
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// getCountryAndNeigbour('india');

//! Coding Challenge #1
// In this challenge you will build a function 'whereAmI' which renders a country
// only based on GPS coordinates. For that, you will use a second API to geocode
// coordinates. So in this challenge, you’ll use an API on your own for the first time 😁
// Your tasks:
// PART 1
// 1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat')
// and a longitude value ('lng') (these are GPS coordinates, examples are in test
// data below).
// 2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means
// to convert coordinates to a meaningful location, like a city and country name.
// Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call
// will be done to a URL with this format:
// https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and
// promises to get the data. Do not use the 'getJSON' function we created, that
// is cheating 😉
// 3. Once you have the data, take a look at it in the console to see all the attributes
// that you received about the provided location. Then, using this data, log a
// message like this to the console: “You are in Berlin, Germany”
// 4. Chain a .catch method to the end of the promise chain and log errors to the
// console
// 5. This API allows you to make only 3 requests per second. If you reload fast, you
// will get this error with code 403. This is an error with the request. Remember,
// fetch() does not reject the promise in this case. So create an error to reject
// the promise yourself, with a meaningful error message
// PART 2
// 6. Now it's time to use the received data to render a country. So take the relevant
// attribute from the geocoding API result, and plug it into the countries API that
// we have been using.
// 7. Render the country and catch any errors, just like we have done in the last
// lecture (you can even copy this code, no need to type the same code)
// The Complete JavaScript Course 31
// Test data:
// § Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
// § Coordinates 2: 19.037, 72.873
// § Coordinates 3: -33.933, 18.474

//@ Solution ->
// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(resPromise => {
//       if (!resPromise.ok)
//         throw new Error(
//           `Limit Exceeded! Please wait sometime before new request, Error ${resPromise.status}🤨`
//         );
//       return resPromise.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}!`);
//       return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country NOT FOUND! ${res.status}`);

//       return res.json();
//     })
//     .then(data => {
//       console.log(data[0]);
//       renderCountry(data[0]);
//     })
//     .catch(err => {
//       console.error(err.message);
//     });
// };

// whereAmI(52.508, 13.381);
// whereAmI(22.9670912, 88.4670464);

/*
//! Building a simple PROMISE /PROMISIFYING ->
//@ Creating a Promise ->
//! new Promise() is the promise constructor function(aslo a special kind of object in javaScript) which takes exactly one callBack function which is called executor and this executor gets two arguments called resolve callback and reject callback function.
//@ resolve function handle fullfilled promise and reject function handle rejected promise.Without setTimeout function the created promise still not asynchronous in nature.
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log(`Lottery draw is happening 🔮`);
  setTimeout(function () {
    if (Math.random() >= 0.5) resolve(`You won 💰`);
    else reject(new Error(`You lost your money 💩`));
  }, 3000);
});

//@ Consuming the Build PROMISE ->
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//!Promisifying setTimeout ->
//@ Here we havent pass anything to resolve so will not get anything from the wait function once the promise get resolved.
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, 1000 * seconds);
  });
};

wait(1)
  .then(() => {
    console.log(`1 seconds passed!`);
    return wait(1);
  })
  .then(() => {
    console.log(`2 seconds passed!`);
    return wait(1);
  })
  .then(() => {
    console.log(`3 seconds passed!`);
    return wait(1);
  })
  .then(() => console.log(`4 seconds passed!`));

//~ These Static methods instantly settle a promise ->
//@ As they are instantly fullfiled and rejected so their output will be log to the console first then other promises.
Promise.resolve('You are fullfilled!').then(x => console.log(x));
Promise.reject(new Error(`Something went wrong! Promise REJECTED`)).catch(e =>
  console.error(e)
);
*/

/*
//! Promisifying the gelocation API ->

// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   error => console.error(error)
// );

const getCurrentPosition = function () {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );

    //@ Since navigator.geolocatio.getCurrentPosition() give arguments for success and failed callback function directly so we can write the above code like this aslo ->
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = function () {
  //@ Using current Location to display country details ->
  getCurrentPosition()
    .then(loc => {
      const { latitude: lat, longitude: lng } = loc.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(resPromise => {
      if (!resPromise.ok)
        throw new Error(
          `Limit Exceeded! Please wait sometime before new request, Error ${resPromise.status}🤨`
        );
      return resPromise.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}!`);
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country NOT FOUND! ${res.status}`);

      return res.json();
    })
    .then(data => {
      console.log(data[0]);
      renderCountry(data[0]);
    })
    .catch(err => {
      console.error(err.message);
    });
};
whereAmI();
*/
/*
//! Coding Challenge #2
// For this challenge you will actually have to watch the video! Then, build the image
// loading functionality that I just showed you on the screen.
// Your tasks:
// Tasks are not super-descriptive this time, so that you can figure out some stuff by
// yourself. Pretend you're working on your own 😉
// PART 1
// 1. Create a function 'createImage' which receives 'imgPath' as an input.
// This function returns a promise which creates a new image (use
// document.createElement('img')) and sets the .src attribute to the
// provided image path
// 2. When the image is done loading, append it to the DOM element with the
// 'images' class, and resolve the promise. The fulfilled value should be the
// image element itself. In case there is an error loading the image (listen for
// the'error' event), reject the promise
// 3. If this part is too tricky for you, just watch the first part of the solution
// PART 2
// 4. Consume the promise using .then and also add an error handler
// 5. After the image has loaded, pause execution for 2 seconds using the 'wait'
// function we created earlier
// 6. After the 2 seconds have passed, hide the current image (set display CSS
// property to 'none'), and load a second image (Hint: Use the image element
// returned by the 'createImage' promise to hide the current image. You will
// need a global variable for that 😉)
// 7. After the second image has loaded, pause execution for 2 seconds again
// 8. After the 2 seconds have passed, hide the current image
// Test data: Images in the img folder. Test the error handler by passing a wrong
// image path. Set the network speed to “Fast 3G” in the dev tools Network tab,
// otherwise images load too fast
//@ Solution ->

const imgContainer = document.querySelector('.images');

const wait = function (seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, seconds * 1000);
  });
};
const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');
    img.src = imgPath;
    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });
    img.addEventListener('error', function () {
      reject(new Error(`Failed to Load currentImage!`));
    });
  });
};
let currentImage;
createImage('img/img-1.jpg')
  .then(img => {
    currentImage = img;
    console.log(`Image 1 Loaded Successfully!`);
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImage = img;
    console.log(`Image 2 Loaded Successfully!`);
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = 'none';
    console.clear();
  })
  .catch(err => {
    console.error(err);
  });
*/

//! Consuming Promises Using Async Wait ->
//@ Try and Catch use to catch the errors.
// const getCurrentPosition = function () {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function () {
//   try {
//     const pos = await getCurrentPosition();
//     console.log(pos);
//     const { latitude: lat, longitude: lng } = pos.coords;
//     console.log(lat, lng);

//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     console.log(resGeo);
//     if (!resGeo.ok) throw new Error(`Location not FOUND!`);
//     const dataGeo = await resGeo.json();
//     console.log(dataGeo.country);

//     //@ Using Country Name to Display Current Country ->
//     const res = await fetch(
//       `https://restcountries.com/v3.1/name/${dataGeo.country}`
//     );
//     if (!res.ok) throw new Error(`Location not FOUND!`);
//     const [data] = await res.json();
//     console.log(data);
//     renderCountry(data);
//   } catch (err) {
//     console.error(err);
//     renderError(`Something went wrong😣 ${err.message}`);
//   }
// };
// whereAmI();

/*
//! Returning a value from async function ->
const getCurrentPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    const pos = await getCurrentPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

    if (!resGeo.ok) throw new Error(`Location not FOUND!`);
    const dataGeo = await resGeo.json();

    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error(`Location not FOUND!`);
    const [data] = await res.json();
    renderCountry(data);

    //@ Function return  ->
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(err);
    renderError(`Something went wrong😣 ${err.message}`);
    throw err;
  }
};
console.log(`1: I am Vaskar Chandra Das.`);
//@ Wrong a way of getting a returned value form an async function ->
// const city = whereAmI();
// console.log(city);
//! Correct way ->
//@ If any error happened in any line then we will not able to access the returned value ..So to get we need to again throw error in catch block.
//@ Doing this type of chaining we are mixing both methods of consuming promises.
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 😈`))
//   .finally(() => console.log(`3: I am Binita Tarafdar.`));

//@ Conversion of above codes into an async function using IIFE ->
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message} 😈`);
  }
  console.log(`3: I am Binita Tarafdar.`);
})();
*/
/*
//! Running Promises in Parallel ->

const getCountryDataParallel = async function (c1, c2, c3) {
  try {
    //! All these aysnc task will be loaded one after another ...but we want to load them parallely Promise.all static method.
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    // console.log([data1.capital[0], data2.capital[0], data3.capital[0]]);

    //! OR ->

    //@ Here each async task will run parallely.
    //! if any of them gets rejected then the resultant promise aslo get rejected.That is Promise.all short circuit the whole chain once it finds a rejected promise..
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital[0]));
  } catch (err) {
    console.error(err);
  }
};
getCountryDataParallel('india', 'bangladesh', 'portugal');
*/

//! PROMISE COMBINATORS ->

//@ 1. Promise.race() -> It takes array of multiple promises and then whichever gets loaded first become the resultant promise , it dosent matter the promise is rejected or fullfilled.
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/india`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/japan`),
  ]);
  console.log(res[0]);
})();

//! Real life example of race combinator -> Whenever promise will take lot of time to load all the promise will get rejected using a setTimeout Function.

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`ERROR OCCURED!`));
    }, sec * 1000);
  });
};

Promise.race([getJSON(`https://restcountries.com/v3.1/name/india`), timeout(1)])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));
//! HERE AWAIT KEYWORD IS NOT USED BECAUSE ALL THE PROMISES USED WILL GET IMMEDIATELY RESOLVED OR REJECTED.

//@ 2. Promise.allSettled() -> Take array of multiple promises and returns an array of containing all settled arrays dosenot matter the promise is fullfilled or rejected.

Promise.allSettled([
  Promise.resolve(`Success!`),
  Promise.reject(`Rejected!`),
  Promise.resolve(`Another Success!`),
])
  .then(data => console.log(data))
  .catch(err => console.error(err));
//@ 3. Promise.all() -> Take an array of multiple promises and returns an array containing all fullfilled promises..if any of them gets rejcted then this static method reject the whole promise.
Promise.all([
  Promise.resolve(`Success!`),
  Promise.reject(`Rejected!`),
  Promise.resolve(`Another Success!`),
])
  .then(data => console.log(data))
  .catch(err => console.error(err));

//@ 4. Promise.any -> Opposite of Promise.race() , It takes as an array of multiple promises and then returns the first fullfilled promise aslo it ignore all rejected promises.
//! ES2021 released feature
Promise.any([
  Promise.resolve(`Success!`),
  Promise.reject(`Rejected!`),
  Promise.resolve(`Another Success!`),
])
  .then(data => console.log(data))
  .catch(err => console.error(err));
