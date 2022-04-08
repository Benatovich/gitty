const { Router } = require('express');
const { sign } = require('../utils/jwt');
const UserService = require('../services/UserService');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;


module.exports = Router()
  // sign in user
  .get('/login', (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=http://localhost:7890/api/v1/github/login/callback`
    );
  })

  .get('/login/callback', (req, res, next) => {
    UserService.create(req.query.code)
      .then((user) => sign(user.toJSON(), process.env.JWT_SECRET, {
        expiresIn: '1 day'
      }))
      .then((payload) => 
        res.cookie(process.env.COOKIE_NAME, payload, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        }).redirect('/api/v1/posts'))
      .catch(next);
  })

  // sign out user
  .delete('/', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ message: 'Signed out successfully', success: true });
  });
