const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

// jest.mock('../lib/middleware/authenticate.js', () => {
//   return (req, res, next) => {
//     req.user = {
//       username: 'test_user',
//       photoUrl: 'http://image.com/image.png',
//     };

//     next();
//   };
// });
jest.mock('../lib/utils/github');


describe('gitty routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('redirects to the github oauth page upon login', async () => {
    const req = await request(app).get('/api/v1/github/login');

    expect(req.header.location).toMatch(
      // /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/login\/callback/i
      'https://github.com/login/oauth/authorize?client_id=cacb474b27a5efc74450&scope=user&redirect_uri=http://localhost:7890/api/v1/auth/login/callback'
    );
  });

  it.only('should login and test callback endpoint', async () => {
    const req = await request
      .agent(app)
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);

    expect(req.body).toEqual({
      username: '',
      photoUrl: '',
    });
  });
});
