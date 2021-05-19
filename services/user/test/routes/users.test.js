const mongoose = require('mongoose');
//const { ObjectId } = mongoose.Types;
const { String } = mongoose.Types;
const { expect } = require('chai');
const request = require('supertest');
const { v4: uuidv4 } = require('uuid');

const { clearDatabase } = require('../helpers');
const User = require('../../models/User');
const app = require('../../app');

before(async () => {
  await clearDatabase();
});

describe('Users Routes', () => {
  describe('/POST', () => {
    // Remove all users from database
    after(async () => {
      await User.deleteMany();
    });

    it('should return new user', (done) => {
      const expectedValues = { 'firstName' : 'test_firstName', 'lastName' : 'test_lastName' };
      request(app)
        .post('/')
        .send(expectedValues)
        .then((res) => {
          const user = res.body.user;
          expect(user).to.exist;
          expect(user._id).to.exist;
          expect(user.firstName).to.equal(expectedValues.firstName);
          expect(user.lastName).to.equal(expectedValues.lastName);
          done();
        })
        .catch((err) => done(err));
    });

    it('should return invalid error', (done) => {
      request(app)
        .post('/')
        .send({})
        .then((res) => {
          const error = res.body.error;
          expect(error).to.exist;
          expect(error.message).to.equal('Invalid fields.');
          expect(error.fields).to.deep.equal({ firstName: 'required', lastName: 'required' });
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('/GET', () => {
    // Remove all users from database
    after(async () => {
      await User.deleteMany();
    });

    it('should return empty user list', (done) => {
      request(app)
        .get('/')
        .then((res) => {
          const users = res.body.users;
          expect(users).to.exist;
          expect(users.length).to.equal(0);
          done();
        })
        .catch((err) => done(err));
    });

    it('should return non-empty user list', (done) => {
      const expectedValues = { 'firstName' : 'test_firstName', 'lastName' : 'test_lastName' };
      request(app)
        .post('/')
        .send(expectedValues)
        .then(() =>
          request(app)
            .get('/')
            .then((res) => {
              const users = res.body.users;
              expect(users).to.exist;
              expect(users.length).to.equal(1);

              const user = users[0];

              expect(user.firstName).to.equal(expectedValues.firstName);
              expect(user.lastName).to.equal(expectedValues.lastName);
              done();
            })
            .catch((err) => done(err)),
        )
        .catch((err) => done(err));
    });
  });

  describe('/GET id', () => {
    // Remove all users from database
    after(async () => {
      await User.deleteMany();
    });

    it('should get user', (done) => {
      const expectedValues = { 'firstName' : 'test_firstName', 'lastName' : 'test_lastName' };
      request(app)
        .post('/')
        .send(expectedValues)
        .then((response) => {
          const userId = response.body.user._id;

          request(app)
            .get(`/${userId}`)
            .then((res) => {
              const user = res.body.user;
              expect(user).to.exist;
              expect(user.firstName).to.equal(expectedValues.firstName);
              expect(user.lastName).to.equal(expectedValues.lastName);
              done();
            })
            .catch((err) => done(err));
        })
        .catch((err) => done(err));
    });

    it('should return invalid error', (done) => {
      const userId = uuidv4();
      request(app)
        .get(`/${userId}`)
        .then((res) => {
          const status = res.status;
          const error = res.body.error;
          expect(status).to.equal(404);
          expect(error).to.exist;
          expect(error.message).to.equal('User not found.');
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('/PUT id', () => {
    // Remove all users from database
    after(async () => {
      await User.deleteMany();
    });

    it('should update user', (done) => {
      const initialValues = { 'firstName' : 'test_firstName', 'lastName' : 'test_lastName' };
      const updateValues = { 'firstName' : 'test_firstName2', 'lastName' : 'test_lastName2' };
      const expectedValues = { ...initialValues, ...updateValues };
      request(app)
        .post('/')
        .send(initialValues)
        .then((response) => {
          const userId = response.body.user._id;

          request(app)
            .put(`/${userId}`)
            .send(updateValues)
            .then((res) => {
              const user = res.body.user;
              expect(user).to.exist;
              expect(user.firstName).to.equal(expectedValues.firstName);
              expect(user.lastName).to.equal(expectedValues.lastName);
              done();
            })
            .catch((err) => done(err));
        })
        .catch((err) => done(err));
    });

    it('should return invalid error', (done) => {
      const userId = uuidv4();
      request(app)
        .put(`/${userId}`)
        .send({})
        .then((res) => {
          const status = res.status;
          const error = res.body.error;
          expect(status).to.equal(404);
          expect(error).to.exist;
          expect(error.message).to.equal('User not found.');
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('/DELETE id', () => {
    // Remove all users from database
    after(async () => {
      await User.deleteMany();
    });

    it('should delete user', (done) => {
      const initialValues = { 'firstName' : 'test_firstName', 'lastName' : 'test_lastName' };
      request(app)
        .post('/')
        .send(initialValues)
        .then((response) => {
          const userId = response.body.user._id;

          request(app)
            .delete(`/${userId}`)
            .then((res) => {
              const success = res.body.success;
              expect(success).to.be.true;
              done();
            })
            .catch((err) => done(err));
        })
        .catch((err) => done(err));
    });

    it('should return invalid error', (done) => {
      const userId = uuidv4();
      request(app)
        .delete(`/${userId}`)
        .then((res) => {
          const status = res.status;
          const error = res.body.error;
          expect(status).to.equal(404);
          expect(error).to.exist;
          expect(error.message).to.equal('User not found.');
          done();
        })
        .catch((err) => done(err));
    });
  });
});
