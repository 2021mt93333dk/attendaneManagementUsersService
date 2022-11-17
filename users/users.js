require("dotenv").config();
const express = require('express');

// Connect
require('../db/db');

const Student = require('./Student');
const Teacher = require("./Teacher");

const app = express();
const port = 3001;
app.set('port', port);
app.use(express.json())

// ==================== STUDENT APIs ===============================
app.get('/hello', function(req, res){
    res.send('Hello world from Node Js');
  });

app.post('/create/student', (req, res) => {
    const newStudent = new Student({...req.body});
    newStudent.save().then(() => {
          res.send(`New Student added successfully!`)
    }).catch((err) => {
         res.status(500).send('Internal Server Error!');
    })
})

app.get("/students", (req, res) => {
    Student.find().then((students) => {
        if (students.length !== 0) {
              res.json(students)
        } else {
            res.status(404).send('students not found');
       }
    }).catch((err) => {
         res.status(500).send('Internal Server Error!');
    });
})

app.get("/student/:rollno", (req, res)=> {
    Student.find({rollno: req.params.rollno}).then((student) => {
        if (student && student.length > 0) {
           res.status(200).json(student)
        } else {
            res.status(404).send('student not found');
        }
     }).catch((err) => {
        res.status(500).send('Internal Server Error!');
    });
})

app.delete('/students/deleteAll', (req, res) => {
    Student.deleteMany().then((student) 	=> {
        if (student) {
             res.json('student deleted Successfully!')
        } else {
            res.status(404).send('student Not found!'); 
        }
    }).catch((err) => {
         res.status(500).send('Internal Server Error!');
    });
});
app.delete('/student/:rollno', (req, res) => {
    Student.findOneAndRemove({rollno: req.params.rollno}).then((student) 	=> {
        if (student) {
             res.json('student deleted Successfully!')
        } else {
            res.status(404).send('student Not found!'); 
        }
    }).catch((err) => {
         res.status(500).send('Internal Server Error!');
    });
});

app.put('/student/update/:rollno', async function (req, res) {
    const rollno = req.params.rollno;
    try{
        const data = await Student.updateOne({ rollno }, {...req.body});
        res.json(data);
    }catch(e){
        res.staus(500).send("Internal server error!!!");
    }
});

// ==================== TEACHER APIs ===============================
app.post('/create/teacher', (req, res) => {
    const newTeacher = new Teacher({...req.body});
    newTeacher.save().then(() => {
          res.send(`New Teacher added successfully!`)
    }).catch((err) => {
         res.status(500).send('Internal Server Error!');
    })
})

app.get("/teachers", (req, res) => {
    Teacher.find().then((students) => {
        if (students.length !== 0) {
              res.json(students)
        } else {
            res.status(404).send('teachers not found');
       }
    }).catch((err) => {
         res.status(500).send('Internal Server Error!');
    });
})

app.get("/teacher/:tId", (req, res)=> {
    Teacher.find({tId: req.params.tId}).then((teacher) => {
        if (teacher && teacher.length > 0) {
           res.status(200).json(teacher)
        } else {
            res.status(404).send('teacher not found');
        }
     }).catch((err) => {
        res.status(500).send('Internal Server Error!');
    });
})

app.delete('/teacher/deleteAll', (req, res) => {
    Teacher.deleteMany().then((teacher) 	=> {
        if (teacher) {
             res.json('teacher deleted Successfully!')
        } else {
            res.status(404).send('teacher Not found!'); 
        }
    }).catch((err) => {
         res.status(500).send('Internal Server Error!');
    });
});
app.delete('/teacher/:tId', (req, res) => {
    Teacher.findOneAndRemove({tId: req.params.tId}).then((teacher) 	=> {
        if (teacher) {
             res.json('teacher deleted Successfully!')
        } else {
            res.status(404).send('teacher Not found!'); 
        }
    }).catch((err) => {
         res.status(500).send('Internal Server Error!');
    });
});

app.put('/teacher/update/:tId', async function (req, res) {
    const tId = req.params.tId;
    try{
        const data = await Teacher.updateOne({ tId }, {...req.body});
        res.json(data);
    }catch(e){
        res.staus(500).send("Internal server error!!!");
    }
});

app.listen(port, () => {
    console.log(`Up and Running on port ${port} - This is User service`);
})
