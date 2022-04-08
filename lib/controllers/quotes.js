const { Router } = require('express');
const Quote = require('../models/Quote');

module.exports = Router()
  .get('/', (req, res, next) => {
    const promiseOne = Quote.getQuoteOne();
    const promiseTwo = Quote.getQuoteTwo();
    const promiseThree = Quote.getQuoteThree();

    Promise.all([promiseOne, promiseTwo, promiseThree])
      .then(values => res.json(values));


  });

