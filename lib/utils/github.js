const fetch = require('cross-fetch');

const exchangeCodeForToken = (code) => {
  return fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
    }),
  })
    .then(resp => resp.json())
    .then(access_token => {
      return access_token;
    });
};

const getUserProfile = (token) => {
  return fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
    },
  })
    .then(profileResp => profileResp.json())
    .then(profile => {
      return { username: profile.login, photoUrl: profile.avatar_url };
    });
};

module.exports = { exchangeCodeForToken, getUserProfile };
