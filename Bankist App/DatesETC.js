/////////////////////////////////////////////////
// LECTURES

// console.log(23 === 23.0);

// console.log(+'23');

// //Parsing

// console.log(Number.parseInt('30px', 10));
// console.log(Number.parseFloat('2.5rem', 10));

// // IsNaN

// console.log(Number.isNaN(+'20X'));

// // Checking if value is real number
// console.log(Number.isFinite(20));
// console.log(Number.isFinite(+'20PX'));
// console.log(Number.isFinite(Number.NEGATIVE_INFINITY));

// console.log(Math.max(5, 18, 23, 11, 2));
// console.log(Math.min(5, 18, 23, 11, 2));

// console.log(Math.PI * Number.parseFloat('10px') ** 2);

// console.log(Math.trunc(Math.random() * 6) + 1);

// const randomInt = (min, max) =>
//   Math.trunc(Math.random() * (max - min) + 1) + min;

// console.log(randomInt(5, 20));

// // Rounding integers

// console.log(Math.trunc(23.3));
// console.log(Math.round(23.3));
// console.log(Math.round(23.9));

// console.log(Math.floor(23.3));
// console.log(Math.floor(23.9));

// console.log(Math.ceil(23.3));
// console.log(Math.ceil(23.9));

// // Rounding decimals

// console.log((2.7).toFixed(0));
// console.log(+(2.7).toFixed(3));

// console.log(5 % 2);

// const diameter = 287_460_000_000;

// console.log(diameter);

// console.log(2 ** 53 - 1);
// console.log(Number.MAX_SAFE_INTEGER);

// Create a Date

// console.log(new Date(account1.movementsDates[0]));

// console.log(new Date(1000));

// Working with date

// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth() + 1);
// console.log(future.getDate());
// console.log(future.getDay());
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString());
// console.log(future.getTime());

// console.log(Date.now());

// future.setFullYear(2040);

// console.log(future);

// const future = new Date(2037, 10, 19, 15, 23);
// console.log(+future);

// const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));

// console.log(days1);

// const num = 38884753.23;

// const NumberIntlOptions = {
//   style: 'currency',
//   unit: 'degree',
//   currency: 'EUR',
//   // useGrouping: false,
// };

// console.log(new Intl.NumberFormat('el-GR', NumberIntlOptions).format(num));

// const ingredients = ['olives', 'spinach'];
// const pizzaTimer = setTimeout(
//   (ing1, ing2) => console.log(`Here is your pizza ${ing1}`),
//   3000,
//   ...ingredients
// );
// console.log(`Waiting...`);

// if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval(() => {
//   const now = new Date();
//   console.log(now);
// }, 10000);
