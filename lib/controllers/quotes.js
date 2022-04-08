const { Router } = require('express');
const QuoteService = require('../services/QuoteService');

module.exports = Router()
  .get('/', (req, res, next) => {
    QuoteService.generate()
      .then((quoteBlock) => res.send(quoteBlock))
      .catch(next);
  });

