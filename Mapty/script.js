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

let map, mapEvent;

class App {
  // Private properties
  #map;
  #mapEvent;

  // Page Loads
  constructor() {
    //TODO: USING BIND() WHEN I NEED map or mapEvent properties in a callback function
    // get the current position when constructor called
    this._getPosition();

    // Set eventListener to form when we submit
    form.addEventListener('submit', this._newWorkout.bind(this));

    // Set eventListener to form input select
    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    // if user set permission to allow then call loadMap() method otherwise alert him

    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Could not get your position so app doesn't work!");
        }
      );
  }

  _loadMap(position) {
    // Get the coords from positionCallBackObject and store in array
    const { longitude, latitude } = position.coords;
    const coords = [latitude, longitude];
    const mapTileUrl = 'https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';

    // Pass the coords in setView() method with 10 zoom
    // Call the map method from L object that is loaded in this file from leaflet library
    // and pass the id of the map in html as argument in map()
    // then store the returned object in private map property
    this.#map = L.map('map').setView(coords, 10);

    // Set the tile of the map with the mapTileUrl which contains the url and set it to map with L object
    L.tileLayer(mapTileUrl).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    // Clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    // Display marker
    const { lat, lng } = this.#mapEvent.latlng;
    const popupOptions = {
      maxWidth: 250,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
      className: 'running-popup',
    };

    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(L.popup(popupOptions))
      .setPopupContent('Workout')
      .openPopup();
  }
}

const app = new App();
