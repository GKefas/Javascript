/////////////////
// console.log(document.documentElement);

// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// const buttons = document.getElementsByTagName('button');

// console.log(document.getElementsByClassName('btn'));

// Creating and iserting elements
//.insertAdjacentHTML
// Random color

// const randomInt = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = randomColor();
//   console.log('Link', e.target, e.currentTarget);

//   // Stop propagation
//   e.stopPropagation();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Link', e.target, e.currentTarget);
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Link', e.target, e.currentTarget);
// });

// const h1 = document.querySelector('h1');

// Going downward:child

// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.children);
// console.log();
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents

// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// Going sideways: siblings

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(el => {
//   if (el !== h1) {
//     el.style.transform = 'scale(1.2)';
//   }
// });

// Intersection Observer API
