// const fetch = require('cross-fetch');
// const Quote = require('../models/Quote');

// module.exports = class QuoteService {
//   static generate() {
//     return fetch('https://programming-quotes-api.herokuapp.com/quotes/random') 
//       .then((respOne) => {
//         // console.log('||resp', respOne.json());
//         return respOne.json();
//       })
//       .then((dataOne) => {
//         return Quote.insert({ author: dataOne.author, content: dataOne.en });
//       })
//       .then((quoteOne) => {
//         return quoteOne;
//       });
//     // console.log('|p1', promiseOne);
//     // return promiseOne;

//     const promiseTwo = fetch('https://futuramaapi.herokuapp.com/api/quotes/1') 
//       .then((respTwo) => {
//         // console.log('|resp', respTwo.json());
//         return respTwo.json();
//       })
//       .then((dataTwo) => {
//         return Quote.insert({ author: dataTwo[0].character, content: dataTwo[0].quote });
//       })
//       .then((quoteTwo) => {
//         return quoteTwo;
//       });

//     const promiseThree = fetch('https://api.quotable.io/random') 
//       .then((respThree) => {
//         // console.log('|resp', respThree.json());
//         return respThree.json();
//       })
//       .then((dataThree) => {
//         return Quote.insert({ author: dataThree.author, content: dataThree.content });
//       })
//       .then((quoteThree) => {
//         return quoteThree;
//       });

//     Promise.all([promiseOne, promiseTwo, promiseThree])
//       .then((quoteBlock) => {
//         // console.log(quoteBlock);
//       });
//   }
// };
