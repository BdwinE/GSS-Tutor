const ApplicationError = require('../config/ApplicationError');
const User = require('../models/User');
const Tutor = require('../models/Tutor');
const Student = require('../models/Student');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  /**
   * Create new user and save to database.
   *
   * @param {Request} req
   * @param {Response} res
   */
   async createUser(req, res, next) {
    let payload = {};
    try {
      const auth0_id = req.body.auth0;
      let userInfo = req.body;
      userInfo._id = auth0_id;

      if(req.body.hasOwnProperty('tutorSpecific')){
        const {tutorSpecific} = req.body;
        const tutorId = uuidv4()
        userInfo.tutor = tutorId
        const newTutor = new Tutor({_id: tutorId, tutorSpecific})
        await newTutor.save();
      }
      if(req.body.hasOwnProperty('studentSpecific')){
        const {studentSpecific} = req.body;
        const studentId = uuidv4()
        userInfo.student = studentId
        const newStudent = new Student({_id : studentId, studentSpecific})
        await newStudent.save();
      }

      const newUser = new User(userInfo);
      
      const savedUser = await newUser.save().then(savedUser => savedUser.populate('tutor').populate("student").execPopulate())
      payload = {user : savedUser};

    } catch (err) {
      return next(err);
    }
    return res.json(payload);
  },

  /**
   * Create new user and save to database.
   *
   * @param {Request} req
   * @param {Response} res
   *
  async createUser(req, res, next) {
    let payload = {};
    console.log("This route is currently deprecated, Try using post(/:id) or createUserId instead");
    payload.warning = "This route is currently deprecated, Try using post(/:id) or createUserId instead";
    return res.json(payload);
    try {
      const _id = uuidv4();
      let userInfo = req.body;
      userInfo._id = _id;

      if(req.body.hasOwnProperty('tutorSpecific')){
        const {tutorSpecific} = req.body;
        const tutorId = uuidv4()
        userInfo.tutor = tutorId
        const newTutor = new Tutor({_id: tutorId, tutorSpecific})
        await newTutor.save();
      }
      if(req.body.hasOwnProperty('studentSpecific')){
        const {studentSpecific} = req.body;
        const studentId = uuidv4()
        userInfo.student = studentId
        const newStudent = new Student({_id : studentId, studentSpecific})
        await newStudent.save();
      }

      const newUser = new User(userInfo);
      
      const savedUser = await newUser.save().then(savedUser => savedUser.populate('tutor').populate("student").execPopulate())
      payload = {user : savedUser};

    } catch (err) {
      return next(err);
    }
    return res.json(payload);
  },*/

    /**
   * Create new user and save to database.
   *
   * @param {Request} req
   * @param {Response} res
   */
     async createUserId(req, res, next) {
      console.log("here1")
      let payload = {};
      try {
        const auth0_id = req.params.id;
        //TODO: ensure auth0 id is valid
        let userInfo = req.body;
        userInfo._id = auth0_id;
  
        if(req.body.hasOwnProperty('tutorSpecific')){
          const {tutorSpecific} = req.body;
          const tutorId = uuidv4()
          userInfo.tutor = tutorId
          const newTutor = new Tutor({_id: tutorId, tutorSpecific})
          await newTutor.save();
        }
        if(req.body.hasOwnProperty('studentSpecific')){
          const {studentSpecific} = req.body;
          const studentId = uuidv4()
          userInfo.student = studentId
          const newStudent = new Student({_id : studentId, studentSpecific})
          await newStudent.save();
        }
  
        const newUser = new User(userInfo);
        
        const savedUser = await newUser.save().then(savedUser => savedUser.populate('tutor').populate("student").execPopulate())
        payload = {user : savedUser};
  
      } catch (err) {
        console.log(err)
        return next(err);
      }
      return res.json(payload);
    },

  /**
   * Get all user from database all avaible user services.
   *
   * @param {Request} req
   * @param {Response} res
   */
  async getAllUsers(req, res, next) {
    let payload = {};
    try {

      //const { id } = req.params;

      const user = await User.find().
      populate("tutor").populate("student");

      if (!user) throw new ApplicationError({ message: 'User not found.', statusCode: 404 });
      payload = {users : user}
    } catch (err) {
      return next(err);
    }

    return res.json(payload);
  },

  /**
   * Get a user from the database by id.
   *
   * @param {Request} req
   * @param {Response} res
   */
  async getUser(req, res, next) {
    let payload = {};

    try {
      const { id } = req.params;

      const user = await User.findById(id).
      populate("tutor").populate("student");

      if (!user) throw new ApplicationError({ message: 'User not found.', statusCode: 404 });

      payload = {user}

    } catch (err) {
      //console.log(err)
      return next(err);
    }
    
    return res.json(payload);
  },

  /**
   * Update a user in the database by id.
   *
   * @param {Request} req
   * @param {Response} res
   */
  async updateUser(req, res, next) {
    let payload = {};

    try {
      const { id } = req.params;
      const { firstName, lastName } = req.body;

      const updates = {};

      if (!!firstName) updates.firstName = firstName;
      if (!!lastName) updates.lastName = lastName;

      const user = await User.findById(id);

      if (!user) throw new ApplicationError({ message: 'User not found.', statusCode: 404 });
      
      if(req.body.hasOwnProperty('tutorSpecific')){
        const {tutorSpecific} = req.body;
        let tutorId = user.tutor
        if(!tutorId){//new tutor
          tutorId = uuidv4()
          const newTutor = new Tutor({_id: tutorId, tutorSpecific})
          await newTutor.save();
          updates.tutor = tutorId;
        }
        else{
          const updatedTutor = await Tutor.findByIdAndUpdate(tutorId, {tutorSpecific}, {
            new: true,
            runValidators: true,
          });
        }
      }
      if(req.body.hasOwnProperty('studentSpecific')){
        const {studentSpecific} = req.body;
        let studentId = user.student//contains student id
        if(!studentId){//new tutor
          studentId = uuidv4()
          const newStudent = new Student({_id: studentId, studentSpecific})
          await newStudent.save();
          updates.student = studentId;
        }
        else{
          const updatedStudent = await Student.findByIdAndUpdate(studentId, {studentSpecific}, {
            new: true,
            runValidators: true,
          });
        }
      }

      const updatedUser = await User.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      }).populate("tutor").populate("student");

      payload = {user : updatedUser}
    } catch (err) {
      //console.log(err)
      return next(err);
    }

    return res.json(payload);
  },

  /**
   * Delete a user in the database by id.
   *
   * @param {Request} req
   * @param {Response} res
   */
  async deleteUser(req, res, next) {
    let payload = {};

    try {
      const { id } = req.params;

      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) throw new ApplicationError({ message: 'User not found.', statusCode: 404 });

      if(deletedUser.tutor){
        const tutorId = deletedUser.tutor;
        await Tutor.findByIdAndDelete(tutorId);
      }
      if(deletedUser.student){        
        const studentId = deletedUser.tutor;
        await Student.findByIdAndDelete(studentId);
      }

      payload = { success: true };
    } catch (err) {
      //console.log(err)
      return next(err);
    }

    return res.json(payload);
  },
};
