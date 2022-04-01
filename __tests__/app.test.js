const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const Post = require('../lib/models/Post');

jest.mock('../lib/utils/github');
const mockUser = {
  username: 'mockUser',
  photoUrl: 'mockPhotoUrl'
};


describe('gitty routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a user', async () => {
    const res = await request(app)
      .post('/api/v1/github')
      .send(mockUser);

    expect(res.body).toEqual({
      ...mockUser
    });
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
    console.log('|req.body', req.body);
    expect(req.body).toEqual([{
      id: '1',
      text: 'test post', 
      username: 'mockUser'
    }]);
  });

  it('logs a user out/deletes the session cookie', async () => {
    const agent = request.agent(app);
    const res = await agent.delete('/api/v1/github');
    const expected = {
      message: 'Signed out successfully',
      success: true
    };

    expect(res.body).toEqual(expected);
  });


  it('returns a list of posts for all users', async () => {
    // await Post.insert({ text: 'example' });
    const agent = request.agent(app);
    const res = await agent
      .get('/api/v1/posts');

    expect(res.body).toEqual([{
      id: expect.any(String),
      text: 'example',
    }]);
  });


  // it('creates a post via POST', async () => {
  //   await 
  // })
});
