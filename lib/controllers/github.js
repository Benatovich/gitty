const { Router } = require('express');
const { sign } = require('../utils/jwt');
// const authenticate = require('../utils/jwt');
const UserService = require('../services/UserService');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;


module.exports = Router()
  .get('/login', (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=http://localhost:7890/api/v1/auth/login/callback`
    );
  })

  .get('/login/callback', async (req, res, next) => {
      
    try {
      //   step 1: get code from query param, pass it to service to find/create user
      const user = await UserService.create(req.query.code);

      const payload = sign(user.toJSON(), process.env.JWT_SECRET, {
        expiresIn: '1 day'
      });
  
      res
        .cookie(process.env.COOKIE_NAME, payload, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .redirect('/');
      // .redirect('/api/v1/posts');
    } catch (error) {
      next(error);
    }
  });
