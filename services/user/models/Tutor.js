const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const TutorSchema = new Schema(
  {
    _id : {type: String, required : true},
    tutorSpecific: { type: Object, required: true },
  },
);

module.exports = model('tutor', TutorSchema);