var expect = require('chai').expect;
var User = require('../../../lib/models/users');

describe('User', function() {

  describe('#create', function() {

    it('should create a new user', function() {
      return User.create({email: 'something3', passwordDigest: 'password'})
        .then(function(results) {
          expect(results).to.be.instanceof(Array);
          expect(results).to.have.length(1);
          expect(results[0].id).to.be.above(1);
        })
    });

  });

  describe('#findOne', function() {
    it('should retreive a user by its id');
  });

});