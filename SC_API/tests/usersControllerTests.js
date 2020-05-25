const should = require('should');                                           // import from package
const sinon = require('sinon');                                             // import from node
const userController = require('../controllers/usersController');     // import the controller to be tested

describe('User Controller Tests:', () => {                               // Describe test you are performing
  describe('Post', () => {                                                  // Method
    it('should not allow an empty password on post', () => {             // Expectation
      const User = function (user) { this.save = () => {}};     

      const req = {
        body: {

          username: 'Godwin'
        }
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };

     const controller = userController(User);
     controller.post(req, res);

      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('Password is Required').should.equal(false);
    });
  });
});