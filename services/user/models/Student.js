const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const studentSchema = new Schema(
  {
    _id : {type: String, required : true},
    studentSpecific: { type: Object, required: true },
  },
);

module.exports = model('student', studentSchema);