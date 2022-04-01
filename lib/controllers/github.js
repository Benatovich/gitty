const { Router } = require('express');
// const { sign } = require('../utils/jwt');
// const authenticate = require('../utils/jwt');


module.exports = Router()
  .get('/login', (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=http://localhost:7890/api/v1/auth/login/callback`
    );
  });
