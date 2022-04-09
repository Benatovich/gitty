const fetch = require('cross-fetch');

module.exports = class Quote {
  author;
  content;

  constructor(row) {
    this.author = row.author;
    this.content = row.content;
  }

  static getQuoteOne(){
    return fetch('https://programming-quotes-api.herokuapp.com/quotes/random')
      .then(res => res.json())
      .then(data => {
        return { author: data.author, content: data.en };
      })
      // .then(quote => console.log('|q1', quote))
      .then(quote => new Quote(quote));
    // .then(quote => console.log('|!quote', quote));
  }
  static getQuoteTwo(){
    return fetch('https://futuramaapi.herokuapp.com/api/quotes/1')
      .then(res => res.json())
      .then(data => {
        return { author: data[0].character, content: data[0].quote };
      })
      // .then(quote => console.log('|q2', quote))
      .then(quote => new Quote(quote));
  }
  static getQuoteThree(){
    return fetch('https://api.quotable.io/random')
      .then(res => res.json())
      .then(data => {
        return { author: data.author, content: data.content };
      })
      // .then(quote => console.log('|q3', quote))
      .then(quote => new Quote(quote));
  }

};
