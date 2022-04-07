const { Router } = require('express');
const QuoteService = require('../services/QuoteService');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const quoteBlock = await QuoteService.generate();

      res.send(quoteBlock);
    } catch (error) {
      next(error);
    }
  });
