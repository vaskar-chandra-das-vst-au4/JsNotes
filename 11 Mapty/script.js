'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

const success = function (position) {
  console.log(position);
  const { latitude, longitude } = position.coords;
  console.log(latitude, longitude);
  console.log(`https://www.google.com/maps/@${latitude},${longitude},10z`);
  // console.log(window);
  const coords = [latitude, longitude];
  var map = L.map('map').setView(coords, 13);

  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  map.on('click', function (mapEvent) {
    const { lat, lng } = mapEvent.latlng;
    console.log(lat, lng);
    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(
        L.popup({
          maxWidht: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Workout')
      .openPopup();
  });
};
const failed = function () {
  console.log(`Failed to get your location!`);
};



navigator.geolocation.getCurrentPosition(success, failed);
