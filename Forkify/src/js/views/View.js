import icons from '../.././img/icons.svg';

export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    // Store data as private field to use it in generateMarkup which is implements in Child classes
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear(); // Clear everything inside parent element
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    // Store data as private field to use it in generateMarkup which is implements in Child classes
    this._data = data;
    const newMarkup = this._generateMarkup();

    // Creating Virtual DOM in JS memory not in Page based on  newMarkup
    const newDom = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    // Loop Over Virtual DOM elements
    newElements.forEach((newEl, i) => {
      // Set the curEl to the same as newElement
      const curEl = curElements[i];

      // Update changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      )
        curEl.textContent = newEl.textContent;

      // Update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        // Take all attributes from changed elements in a []
        Array.from(newEl.attributes).forEach(attr =>
          // Reset all attributes with each names and values
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });

    // Complexity , scenario change based on how much elements are gonna be updated
    // O(n^2) : worst scenario
    // O(n) : best scenario
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
              <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
