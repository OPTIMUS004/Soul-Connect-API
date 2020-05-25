require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';

const app = require('../server.js');

const User = mongoose.model('User');
const agent = request.agent(app);

describe('User CRUD Test', () => {
  it('should allow a user to be posted with username password and _id', (done) => {
    const userPost = {
      username: 'Cyan', 
      password: 'GDG2200o',
      firstname: 'April',
      lastname: 'Julian.',
      dob: '12/12/1993',
    };

    agent.post('/api/users')
    .send(userPost)
    .expect(200)
    .end((err, results) => {
      console.log(results.body);
      results.body.username.should.not.equal(undefined);
      results.body.password.should.not.equal(undefined);
      results.body.should.have.property('_id');
      done();
    });
  });
  afterEach((done)=> {
    User.deleteMany({}).exec();
    done();
  });
  after((done) =>{
    mongoose.connection.close();
    app.server.close(done());
  });
});