const User = require('../models/GithubUser');
const { exchangeCodeForToken, getUserProfile } = require('../utils/github');

module.exports = class UserService {
  static async create(code) {
    // step 2: exchange code for token
    const token = await exchangeCodeForToken(code);

    // step 3: use token to get user info from github
    const profile = await getUserProfile(token);

    // step 4: fetch/create user in db using github username
    let user = await User.findByUsername(profile.username);

    if (!user) {
      user = await User.insert(profile);
    }

    return user;
  }
};
