const User = require('../models/GithubUser');
const { exchangeCodeForToken, getUserProfile } = require('../utils/github');

module.exports = class UserService {
  static create(code) {
    let profile;
    return exchangeCodeForToken(code)
      .then((token) => getUserProfile(token))
      .then((userProfile) => {
        profile = userProfile;
        return User.findByUsername(profile.username);
      })
      .then((user) => {
        if (!user) {
          return User.insert(profile);
        } else {
          return user;
        }
      });
  }

};
