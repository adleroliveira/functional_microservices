var request = require('supertest');
var app = require('./example3');

describe('GET /', function() {
  it('respond with json', function(done) {
    request(app)
      .get('/jack')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err,res)=>{
      	console.log('test suite recieved : ',res.body);
       if (err) return done(err);
        done();
      })
  });
});