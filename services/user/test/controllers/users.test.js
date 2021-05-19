const mongoose = require('mongoose');
//const { ObjectId } = mongoose.Types;
//const { Binary } = mongoose.Types;
const { expect } = require('chai');

/*
test uuid
test tutor
test user
test student
test rest methods
*/

const { clearDatabase, initRouteParams } = require('../helpers');
const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../../controllers/users');
const ApplicationError = require('../../config/ApplicationError');
const User = require('../../models/User');
const Tutor = require('../../models/Tutor')
const Student = require('../../models/Student')

before(async () => {
  await clearDatabase();
});

describe('Users Controller', () => {
  describe('createUser() with valid body', () => {
    const expectedValues = { 'firstName' : 'test_firstName', 'lastName' : 'test_lastName' };

    let response;

   // Create new user
    before(async () => {
      const routeParams = initRouteParams();
      routeParams.req = { body: expectedValues };

      response = await createUser(...Object.values(routeParams));
    });

    // Remove all users from database
    after(async () => {
      await User.deleteMany();
    }); 

    it('should create a new user', async () => {
      const userCount = await User.countDocuments();
      expect(userCount).to.equal(1);
    });

    it('should store user with expected values', async () => {
      const user = await User.findOne(expectedValues);
      expect(user).to.not.be.null;
    });

    it('should return user with expected values', async () => {
      const user = response.user;
      expect(user).to.exist;
      expect(user.firstName).to.equal(expectedValues.firstName);
      expect(user.lastName).to.equal(expectedValues.lastName);
    });
  });

  describe('createUser() with tutor specific data', () => {
    const expectedValues = { 'firstName' : 'test_firstName', 'lastName' : 'test_lastName', "tutorSpecific" : {"testKey": "testValue","testKey2": "testValue2"}};

    let response;
    // Create new user
    before(async () => {
      const routeParams = initRouteParams();
      routeParams.req = { body: expectedValues };

      response = await createUser(...Object.values(routeParams));
    });

    // Remove all users from database
    after(async () => {
      await User.deleteMany();
      await Tutor.deleteMany();
    });

    it('should create a new user', async () => {
      const userCount = await User.countDocuments();
      expect(userCount).to.equal(1);
    });

    it('should create a new tutor', async () => {
      const tutorCount = await Tutor.countDocuments();
      expect(tutorCount).to.equal(1);
    });

    it('should store user with expected values', async () => {
      const user = await User.findOne({firstName: expectedValues.firstName, lastName: expectedValues.lastName});
      expect(user).to.not.be.null;
    });

    it('should store tutor with expected values', async () => {
      const tutor = await Tutor.findOne({tutorSpecific: expectedValues.tutorSpecific});
      expect(tutor).to.not.be.null;
    });

    it('should return user with expected values', async () => {//
      const user = response.user;
      expect(user).to.exist;
      expect(user.firstName).to.equal(expectedValues.firstName);
      expect(user.lastName).to.equal(expectedValues.lastName);
      expect(JSON.stringify(user.tutor.tutorSpecific)).to.equal(JSON.stringify(expectedValues.tutorSpecific));
    });
  });

  describe('createUser() with student specific data', () => {
    const expectedValues = { 'firstName' : 'test_firstName', 'lastName' : 'test_lastName', 'studentSpecific' : {'testKey': 'testValue','testKey2': 'testValue2'}};

    let response;
    // Create new user
    before(async () => {
      const routeParams = initRouteParams();
      routeParams.req = { body: expectedValues };

      response = await createUser(...Object.values(routeParams));
    });

    // Remove all users from database
    after(async () => {
      await User.deleteMany();
      await Student.deleteMany();
    });

    it('should create a new user', async () => {
      const userCount = await User.countDocuments();
      expect(userCount).to.equal(1);
    });

    it('should create a new student', async () => {
      const studentCount = await Student.countDocuments();
      expect(studentCount).to.equal(1);
    });

    it('should store user with expected values', async () => {
      const user = await User.findOne({firstName: expectedValues.firstName, lastName: expectedValues.lastName});
      expect(user).to.not.be.null;
    });

    it('should store student with expected values', async () => {
      const student = await Student.findOne({studentSpecific: expectedValues.studentSpecific});
      expect(student).to.not.be.null;
    });

    it('should return user with expected values', async () => {
      const user = response.user;
      expect(user).to.exist;
      expect(user.firstName).to.equal(expectedValues.firstName);
      expect(user.lastName).to.equal(expectedValues.lastName);
      expect(JSON.stringify(user.student.studentSpecific)).to.equal(JSON.stringify(expectedValues.studentSpecific));
    });
  });

  describe('createUser() with tutor and student specific data', () => {
    const expectedValues = { 'firstName' : 'test_firstName', 'lastName' : 'test_lastName', 'tutorSpecific' : { 'testKey1' : 'testValue1'}, 'studentSpecific' : { 'testKey2' : 'testValue2'} };
    
    let response;
    // Create new user
    before(async () => {
      const routeParams = initRouteParams();
      routeParams.req = { body: expectedValues };

      response = await createUser(...Object.values(routeParams));
    });

    // Remove all users from database
    after(async () => {
      await User.deleteMany();
      await Student.deleteMany();
      await Tutor.deleteMany();
    });

    it('should create a new user', async () => {
      const userCount = await User.countDocuments();
      expect(userCount).to.equal(1);
    });

    it('should create a new tutor', async () => {
      const tutorCount = await Tutor.countDocuments();
      expect(tutorCount).to.equal(1);
    });

    it('should create a new student', async () => {
      const studentCount = await Student.countDocuments();
      expect(studentCount).to.equal(1);
    });

    it('should store user with expected values', async () => {
      const user = await User.findOne({firstName: expectedValues.firstName, lastName: expectedValues.lastName});
      expect(user).to.not.be.null;
    });

    it('should store tutor with expected values', async () => {
      const tutor = await Tutor.findOne({tutorSpecific: expectedValues.tutorSpecific});
      expect(tutor).to.not.be.null;
    });

    it('should store student with expected values', async () => {
      const student = await Student.findOne({studentSpecific : expectedValues.studentSpecific});
      expect(student).to.not.be.null;
    });

    it('should return user with expected values', async () => {
      const user = response.user;
      expect(user).to.exist;
      expect(user.firstName).to.equal(expectedValues.firstName);
      expect(user.lastName).to.equal(expectedValues.lastName);
      expect(JSON.stringify(user.tutor.tutorSpecific)).to.equal(JSON.stringify(expectedValues.tutorSpecific));
      expect(JSON.stringify(user.student.studentSpecific)).to.equal(JSON.stringify(expectedValues.studentSpecific));
    });
  });  

  describe('createUser() with invalid body', () => {
    it('should not create a new user', async () => {
      const routeParams = initRouteParams();
      routeParams.req = { body: {} };
      await createUser(...Object.values(routeParams));
      const userCount = await User.countDocuments();
      expect(userCount).to.equal(0);
    });
  });

  describe('getAllUsers()', () => {//DOING
    const expectedValues = { 'firstName' : 'test_firstName', 'lastName' : 'test_lastName' };

    // Remove all users from database
    after(async () => {
      await User.deleteMany();
    });

    it('should get empty user list', async () => {
      const routeParams = initRouteParams();
      const response = await getAllUsers(...Object.values(routeParams));
      const users = response.users;
      expect(users).to.exist;
      expect(users.length).to.equal(0);
    });

    it('should get non-empty user list', async () => {
      let routeParams = initRouteParams();
      routeParams.req = { body: expectedValues };

      await createUser(...Object.values(routeParams));

      routeParams = initRouteParams();

      const response = await getAllUsers(...Object.values(routeParams));
      const users = response.users;
      expect(users).to.exist;
      expect(users.length).to.equal(1);

      const user = users[0];
      expect(user.firstName).to.equal(expectedValues.firstName);
      expect(user.lastName).to.equal(expectedValues.lastName);
    });
  });

  describe('getUser()', () => {
    const expectedValues = { 'firstName' : 'test_firstName', 'lastName' : 'test_lastName', 'tutorSpecific' : { 'testKey1' : 'testValue1'}, 'studentSpecific' : { 'testKey2' : 'testValue2'} };

    let userId;

    // Create new user
    before(async () => {
      const routeParams = initRouteParams();
      routeParams.req = { body: expectedValues };

      const response = await createUser(...Object.values(routeParams));
      userId = response.user._id;
    });

    // Remove all users from database
    after(async () => {
      await User.deleteMany();
    });

    it('should get user', async () => {
      const routeParams = initRouteParams();
      routeParams.req = { params: { id: userId } };

      const response = await getUser(...Object.values(routeParams));

      const user = response.user;
      expect(user).to.exist;
      expect(user.firstName).to.equal(expectedValues.firstName);
      expect(user.lastName).to.equal(expectedValues.lastName);
      expect(JSON.stringify(user.tutor.tutorSpecific)).to.equal(JSON.stringify(expectedValues.tutorSpecific));
      expect(JSON.stringify(user.student.studentSpecific)).to.equal(JSON.stringify(expectedValues.studentSpecific));
    });
  });

  describe('updateUser()', () => {
    const initialValues = { 'firstName' : 'test_firstName', 'lastName' : 'test_lastName', 'tutorSpecific' : { 'testKey1' : 'testValue1'}, 'studentSpecific' : { 'testKey2' : 'testValue2'} };
    const updateValues = { 'firstName' : 'test_firstName2', 'lastName' : 'test_lastName2', 'tutorSpecific' : { 'testKey1' : 'testValue1update'}, 'studentSpecific' : { 'testKey2' : 'testValue2update'} };
    const expectedValues = { ...initialValues, ...updateValues };

    let userId;

    // Create new user
    before(async () => {
      const routeParams = initRouteParams();
      routeParams.req = { body: initialValues };

      const response = await createUser(...Object.values(routeParams));
      userId = response.user._id;
    });

    // Remove all users from database
    after(async () => {
      await User.deleteMany();
    });

    it('should update user', async () => {
      const routeParams = initRouteParams();
      routeParams.req = { params: { id: userId }, body: updateValues };

      const response = await updateUser(...Object.values(routeParams));

      const user = response.user;
      expect(user).to.exist;
      expect(user.firstName).to.equal(expectedValues.firstName);
      expect(user.lastName).to.equal(expectedValues.lastName);
    });
  });

  describe('deleteUser()', () => {
    const initialValues = { 'firstName' : 'test_firstName', 'lastName' : 'test_lastName' };

    let userId;

    // Create new user
    before(async () => {
      const routeParams = initRouteParams();
      routeParams.req = { body: initialValues };

      const response = await createUser(...Object.values(routeParams));
      userId = response.user._id;
    });

    // Remove all users from database
    after(async () => {
      await User.deleteMany();
    });

    it('should delete user', async () => {
      const routeParams = initRouteParams();
      routeParams.req = { params: { id: userId } };

      const response = await deleteUser(...Object.values(routeParams));

      const success = response.success;
      expect(success).to.be.true;
    });
  });
});
