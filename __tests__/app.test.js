const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/login\/callback/i
    );

  });

  it('should login and test callback endpoint', async () => {
    const req = await request
      .agent(app)
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);

    expect(req.body).toEqual([{
      id: '1',
      text: 'test post', 
      user_id: expect.any(String),
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
    const agent = request.agent(app);
    const res = await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    expect(res.body).toEqual([{
      id: expect.any(String),
      text: 'test post',
      username: 'mockUser',
      user_id: expect.any(String)
    }]);
  });

  it('creates a new post', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);
    
    const res = await agent
      .post('/api/v1/posts')
      .send({
        text: 'testing, testing...',
        user_id: '1'
      });
    
    expect(res.body).toEqual({
      id: expect.any(String),
      text: 'testing, testing...',
      user_id: expect.any(String)
    });
  });

  it('returns an array of quote objects from 3 APIs', async () => {    
    const res = await request(app).get('/api/v1/quotes');

    expect(res.body).toEqual([
      { 
        author: expect.any(String),
        content: expect.any(String),  
      },
      { 
        author: expect.any(String),
        content: expect.any(String),  
      },
      { 
        author: expect.any(String),
        content: expect.any(String),  
      }
    ]);
  });
  


});
