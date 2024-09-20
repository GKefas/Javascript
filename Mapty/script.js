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

if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { longitude, latitude } = position.coords;
      const coords = [latitude, longitude];
      const mapTileUrl = 'https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';

      const map = L.map('map').setView(coords, 10);

      L.tileLayer(mapTileUrl).addTo(map);

      map.on('click', function (mapEvent) {
        const { lat, lng } = mapEvent.latlng;
        const popupOptions = {
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        };

        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(L.popup(popupOptions))
          .setPopupContent('Workout')
          .openPopup();
      });
    },
    function () {
      alert('Could not get your position');
    }
  );
