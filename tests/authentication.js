const should = require('chai').should();
const supertest = require('supertest');
const api = supertest('http://localhost:3000');

describe('authentication', () => {
  // it('errors if wrong basic auth', function(done) {
  //   api.get('/blog')
  //   .set('x-api-key', '123myapikey')
  //   .auth('incorrect', 'credentials')
  //   .expect(401, done);
  // });

  // it('errors if bad x-api-key header', function(done) {
  //   api.get('/blog')
  //   .auth('correct', 'credentials')
  //   .expect(401)
  //   .expect({error:"Bad or missing app identification header"}, done);
  // });
});