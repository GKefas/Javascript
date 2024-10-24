import View from './View';
import icons from '../.././img/icons.svg';

class previewView extends View {
  _parentElement = '';

  _generateMarkup() {
    const { id, title, publisher, image, key } = this._data;
    const urlID = window.location.hash.slice(1);

    return `
    <li class="preview">
      <a class="preview__link ${
        id === urlID ? 'preview__link--active' : ''
      }" href="#${id}">
        <figure class="preview__fig">
          <img src="${image}" alt="${title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${title}</h4>
          <p class="preview__publisher">${publisher}</p>
        </div>
        <div class="recipe__user-generated ${key ? '' : 'hidden'}">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
      </a>
    </li>
  `;
  }
}

export default new previewView();
