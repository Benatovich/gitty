// alternate version of quotes controller
const { Router } = require('express');
const fetch = require('cross-fetch');

module.exports = Router()

  .get('/', (req, res) => {
    const urlArray = [
      'https://programming-quotes-api.herokuapp.com/quotes/random',
      'https://futuramaapi.herokuapp.com/api/quotes/1',
      'https://api.quotable.io/random'
    ];

    function fetchQuotes(urlArray) {
      return Promise.all(urlArray.map((url) => fetch(url)))
        .then((responses) => {
          return Promise.all(responses.map((response) => response.json()));
        });
    }

    function mungeData(quote) {
      if (quote.en) return quote.en;
      if (quote.content) return quote.content;
      if (quote[0].quote) return quote[0].quote;
    }

    fetchQuotes(urlArray).then((rawQuotes) =>
      rawQuotes.map((quote) => {
        return {
          author: quote.author || quote[0].character,
          content: mungeData(quote)
        };
      })).then((mungedQuotes) => res.send(mungedQuotes));



  });
