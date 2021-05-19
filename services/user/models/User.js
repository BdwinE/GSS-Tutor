const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    _id : {type: String, required : true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    tutor: {type:String, ref : "tutor"}, 
    student: {type:String, ref : "student"},
  },
);

module.exports = model('user', userSchema);
