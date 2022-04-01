/* eslint-disable no-console */
const exchangeCodeForToken = async (code) => {
  console.log(`MOCK INVOKED: exchangeCodeForToken(${code})`);
  return `MOCK_TOKEN_FOR_CODE_${code}`;
};
  
const getUserProfile = async (token) => {
  console.log(`MOCK INVOKED: getUserProfile(${token})`);
  return {
    username: 'mockUser',
    photoUrl: 'https://www.placecage.com/gif/300/300',
  };
};
  
module.exports = { exchangeCodeForToken, getUserProfile };
  
