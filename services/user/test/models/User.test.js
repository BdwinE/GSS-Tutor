const mongoose = require('mongoose');
//const { ObjectId } = mongoose.Types;
const { v4: uuidv4 } = require('uuid');
const { expect } = require('chai');

const User = require('../../models/User');

describe('User Model', () => {

  it('should be invalid if _id is empty', (done) => {
    const user = new User({ 'firstName' : 'test_firstName', 'lastName' : 'test_lastName' });

    user.validate((err) => {
      expect(err.errors._id).to.exist;
      done();
    });
  });

  it('should be invalid if firstName is empty', (done) => {
    const user = new User({ _id: uuidv4(), 'lastName' : 'test_lastName' });

    user.validate((err) => {
      expect(err.errors.firstName).to.exist;
      done();
    });
  });

  it('should be invalid if lastName is empty', (done) => {
    const user = new User({ _id: uuidv4(), 'firstName' : 'test_firstName' });

    user.validate((err) => {
      expect(err.errors.lastName).to.exist;
      done();
    });
  });

  it('should be valid if has all required fields', (done) => {
    const user = new User({_id: uuidv4(), 'firstName' : 'test_firstName', 'lastName' : 'test_lastName' });

    user.validate((err) => {
      expect(err).to.be.null;
      done();
    });
  });
});
