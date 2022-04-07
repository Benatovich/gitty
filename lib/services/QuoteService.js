const fetch = require('cross-fetch');
const Quote = require('../models/Quote');

module.exports = class QuoteService {
  static async generate() {
    const respOne = await fetch('https://programming-quotes-api.herokuapp.com/quotes/random');
    const respTwo = await fetch('https://futuramaapi.herokuapp.com/api/quotes/1');
    const respThree = await fetch('https://api.quotable.io/random');

    const dataOne = await respOne.json();
    const dataTwo = await respTwo.json();
    const dataThree = await respThree.json();

    
    const quoteOne = await Quote.insert({ author: dataOne.author, content: dataOne.en });
    const quoteTwo = await Quote.insert({ author: dataTwo[0].character, content: dataTwo[0].quote });
    const quoteThree = await Quote.insert({ author: dataThree.author, content: dataThree.content });
    
    const quoteBlock = [quoteOne, quoteTwo, quoteThree];

    console.log('block', quoteBlock);
    
    return quoteBlock;
  }
};
