
const mongoose = require('mongoose');
const studentSchema = mongoose.Schema({
  name: {
     type: String,
     require: true
   },
   rollno: {
      type: Number,
      require: true
   },
   standard: {
       type: Number,
       require: false
   },
   isFeesPending: {
       type: Boolean,
       require: false
   }
})

const Student = mongoose.model("student", studentSchema);

module.exports = Student;