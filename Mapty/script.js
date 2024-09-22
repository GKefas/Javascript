'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Workout {
  date = new Date();
  // Creating Unique IDs
  id = Date.now().toString(36) + Math.random().toString(36).substring(2);

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat,lng]
    this.distance = distance; // in kilometers
    this.duration = duration; // in minutes
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.pace = this.calcPace();
  }

  calcPace() {
    // min/km
    return this.duration / this.distance;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, ElevationGain) {
    super(coords, distance, duration);
    this.ElevationGain = ElevationGain;
    this.speed = this.calcSpeed();
  }

  // km/h
  calcSpeed() {
    return this.distance / (this.duration / 60);
  }
}

////////////////////////////////////////////////////////
// APPLICATION ARCHITECTURE

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  // Private properties
  #map;
  #mapEvent;
  #workouts = [];

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
    // Helper Functions
    const checkValid = (...data) => data.every(data => Number.isFinite(data));
    const checkPositive = (...data) => data.every(data => data > 0);

    // Get data from form and coords from click
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // Create workout based on type
    // Running Type
    if (type === 'running') {
      const cadence = +inputCadence.value;

      // Check if data is valid
      if (
        !checkValid(distance, duration, cadence) ||
        !checkPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // Cycling type
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      // Check if data is valid
      if (
        !checkValid(distance, duration, elevation) ||
        !checkPositive(distance, duration)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);

    // Render workout on map as marker
    this._renderWorkoutMarker(workout);

    // Render workout on list

    // Hide form + Clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
  }

  _renderWorkoutMarker(workout) {
    const { coords, distance, type } = workout;
    console.log(type);

    const popupOptions = {
      maxWidth: 250,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
      className: `${type}-popup`,
    };

    L.marker(coords)
      .addTo(this.#map)
      .bindPopup(L.popup(popupOptions))
      .setPopupContent('workout')
      .openPopup();
  }
}

const app = new App();
