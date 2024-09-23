'use strict';

// prettier-ignore

class Workout {
  date = new Date();
  // Creating Unique IDs
  id = Date.now().toString(36) + Math.random().toString(36).substring(2);

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat,lng]
    this.distance = distance; // in kilometers
    this.duration = duration; // in minutes
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April',
                   'May', 'June', 'July', 'August', 'September',
                    'October', 'November', 'December'];
    //this.date.getMonth will return a number between 0-10 so we can use it as index to months arr
    return `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.pace = this.calcPace();
    this.description = this._setDescription();
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
    this.description = this._setDescription();
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
  #mapZoomLevel = 10;
  #mapEvent;
  #workouts = [];

  // Page Loads
  constructor() {
    //TODO: USING BIND() WHEN I NEED properties from App class in a callback function
    // get the current position when constructor called
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    // Set eventListener to form when we submit
    form.addEventListener('submit', this._newWorkout.bind(this));

    // Set eventListener to form input select
    inputType.addEventListener('change', this._toggleElevationField);

    // Set the view of map in the clicked workout from the list
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
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
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    // Set the tile of the map with the mapTileUrl which contains the url and set it to map with L object
    L.tileLayer(mapTileUrl).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(workout => {
      this._renderWorkoutMarker(workout);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    // Empty Inputs
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    form.style.display = 'none';
    // Remove form
    form.classList.add('hidden');
    setTimeout(() => {
      form.style.display = 'grid';
    }, 1000);
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
    this._renderWorkout(workout);

    // Hide form + Clear input fields
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    // Guard Clause
    if (!workout)
      return alert('Something occured with App.\nPlease try again later!');

    const { type, coords, description } = workout;

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
      .setPopupContent(`${type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${description}`)
      .openPopup();
  }

  _renderWorkout(workout) {
    // Guard Clause
    if (!workout)
      return alert('Something occured with App.\nPlease try again later!');

    const {
      id,
      type,
      distance,
      duration,
      description,
      pace,
      cadence,
      speed,
      ElevationGain,
    } = workout;

    let html = `
      <li class="workout workout--${type}" data-id="${id}">
        <h2 class="workout__title">${description}</h2>
        <div class="workout__events">
          <span class="workout__edit">✏️</span>
          <span class="workout__delete">❌</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">${type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
          <span class="workout__value">${distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${duration}</span>
          <span class="workout__unit">min</span>
        </div>
    `;

    if (type === 'running')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
      `;

    if (type === 'cycling')
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon workout__icon--elevation">⛰</span>
            <span class="workout__value">${ElevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
        `;

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach(workout => {
      this._renderWorkout(workout);
    });
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
    // DO IT ONCE BECAUSE IT WILL PERMANENTLY RELOAD
  }
}

const app = new App();
// app.reset();

// TODO: Edit a workout
// TODO: Delete a workout
// TODO: Delete all workouts
// TODO: Ability to sort workouts by a field
// TODO: Re-build objects coming from Local Storage
// TODO: More realistic error and confirmation messages
// TODO: Position the map to show all workouts
// TODO: Draw lines and shapes instead of just points
// TODO: Geocode location from coordinates !Needs ASYNC
// TODO: Display weather data for workout time and place !!Needs ASYNC
