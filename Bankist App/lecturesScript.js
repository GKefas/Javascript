// let arr = ['a', 'b', 'c', 'd', 'e'];
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
// // NOT MUTATE
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));

// console.log([...arr]);

// // SPLICE - MUTATE

// console.log(arr.splice(2));
// console.log(arr);

// // REVERSE - MUTATE

// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());

// // CONCAT - NOT MUTATE

// const letters = arr.concat(arr2);
// console.log(letters);

// // JOIN
// console.log(letters.join('-'));

/////////////////////////////////////////////////

// const arr = [23, 11, 64];
// console.log(arr[0]);
// console.log(arr.at(0));

// console.log(arr.slice(-1));

// console.log(arr.at(-1));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) console.log(`Movement ${i + 1} You deposited ${movement}`);
//   else console.log(`Movement ${i + 1} You withdrew ${Math.abs(movement)}`);
// }

// console.log('----- FOREACH -----');

// movements.forEach(function (move, i, arr) {
//   if (move > 0) console.log(`Movement ${i + 1} You deposited ${move}`);
//   else console.log(`Movement ${i + 1} You withdrew ${Math.abs(move)}`);
// });

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCopy = [].concat(dogsJulia);
//   dogsJuliaCopy.splice(0, 1);
//   dogsJuliaCopy.splice(-2);

//   const BothDogs = dogsJuliaCopy.concat(dogsKate);

//   console.log(BothDogs);

//   BothDogs.forEach(function (dog, i) {
//     if (dog >= 3)
//       console.log(
//         `Dog number is ${i + 1} is an adult, and is ${dog} years old`
//       );
//     else console.log(`Dog number ${dog} is still a puppy`);
//   });
// };
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// const deposits = movements.filter(move => move > 0);

// const withdrawal = movements.filter(move => move < 0);
// console.log(deposits, withdrawal);

// accumulator -> SNOWBALL
// const balance = movements.reduce((acc, cur) => acc + cur, 0);

// console.log(balance);

// // Maximum value
// const max = movements.reduce((acc, move) => {
//   if (acc > move) return acc;
//   else return move;
// }, movements[0]);

// // PIPELINE
// const eurToUsd = 1.1;
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, move) => acc + move, 0);

// console.log(totalDepositsUSD);

// const calcAverageHumanAge = ages => {
//   // const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   // const adultHumanAges = ;
//   // const averageHumanAge =humanAges.filter(age => age >= 18)
//   //   adultHumanAges.;
//   // return averageHumanAge;

//   let filterCounter = 0;

//   const averageHumanAge = ages
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
//   return averageHumanAge;
// };

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

// const firstWithdrawal = movements.find(move => move < 0);

// console.log(movements);
// console.log(firstWithdrawal);

// console.log(accounts);

// const account = accounts.find(acc => acc.deposit);
// console.log(account);

// console.log(movements);
// console.log(movements.includes(-130));

// const AnyDeposits = movements.some(move => move > 5000);

// // EVERY

// console.log(account4.movements.every(mov => mov > 0));

// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];

// const overallBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, move) => acc + move, 0);
// console.log(overallBalance);

// const overallBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, move) => acc + move, 0);
// console.log(overallBalance);

// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];

// console.log(movements);

// movements.sort((i, j) => i - j);
// console.log(movements);

// const x = new Array(7);

// x.fill(1);

// console.log(x);

// // Array from

// const y = Array.from({ length: 7 }, () => 1);
// console.log(y);

// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => el.textContent.replace('€', '')
//   );

//   console.log(movementsUI);
// });

// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];

// dogs.forEach(dog => {
//   dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
// });

// console.log(dogs);

// const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));

// const { curFood: sarahDogCurFood, recommendedFood: sarahDogRecFood } = sarahDog;

// console.log(
//   `Dog is eat too ${sarahDogCurFood > sarahDogRecFood ? 'much' : 'low'}`
// );

// const ownersEatTooMuch = dogs
//   .filter(dog => dog.curFood > dog.recommendedFood)
//   .flatMap(dog => dog.owners);
// const ownersEatTooLittle = dogs
//   .filter(dog => dog.curFood < dog.recommendedFood)
//   .flatMap(dog => dog.owners);

// console.log(ownersEatTooMuch, ownersEatTooLittle);

// console.log(`${ownersEatTooMuch.join(' and ')} dogs eat too much!`);
// console.log(`${ownersEatTooLittle.join(' and ')} dogs eat too little!`);

// const eatingExactly = dogs.some(dog => dog.curFood === dog.recommendedFood);

// console.log(eatingExactly);

// const isOkayAmount = dog => {
//   const { curFood, recommendedFood: recFood } = dog;
//   return curFood > recFood * 0.9 && curFood < recFood * 1.1;
// };

// console.log(dogs.some(isOkayAmount));

// const eatingOkay = dogs.filter(isOkayAmount);

// console.log(eatingOkay);

// const sortedDogs = []
//   .concat(dogs)
//   .sort((a, b) => a.recommendedFood - b.recommendedFood);

// console.log(sortedDogs);
