
const mongoose = require('mongoose');
const teacherSchema = mongoose.Schema({
  name: {
     type: String,
     require: true
   },
   tId: {
      type: Number,
      require: true
   },
   subject: {
       type: String,
       require: false
   },
   salary: {
       type: Number,
       require: false
   }
})

const Teacher = mongoose.model("teacher", teacherSchema);

module.exports = Teacher;