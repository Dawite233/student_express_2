let express = require('express')
let db = require('../models')
let Student = db.Student

let router = express.Router()

router.get('/students', function(req, res, next) {
    Student.findAll( {order: ['present', 'name'] }).then( students => {
        return res.json(students)
    }).catch (err => next(err))
})


router.post('/students', function(req, res, next) {
    Student.create( req.body).then( ( data ) => {
        return res.status(201).send('Created')
    }).catch ( err => { 
        // hand user errors, e.g. missing startID or name 
        if (err instanceof db.Sequelize.ValidationError) {
            // Response with 400 Bad Request code, included error messages 
            let messages = err.errors.map (e => e.message)
            return res.status(400).json(messages)
        }

        //Otherwise, something unexpected has gone wrong
        return next(err)
    })
})

// TODO edit a Student 
router.patch('/students/:id', function(req, res, next) {
    // if request id to /students/100
    // studentsID will be 100

    let studentsID = req.params.id
    let updatedStudent = req.body
    Student.update( updatedStudent, {where: {id: studentsID} })
    .then(() => {

        let numberOfRowsModified = rowModified[0] // Number of rows changed 

        if (numberOfRowsModified == 1 ) { // exaclty one row
            return res.send('ok')
  
        }  
        // What about student not found?
        else {
            return res.status(404).json([ 'Student with that id not found' ])
        }
        
        // What about a modification that violates a constraint?
        // for example, modifying a student to have no name 
    })
    .catch(err =>  {
        // If validation error that is a bad request - e-g. modfying student to have no name 
        if (err instanceof db.Sequelize.ValidationError ) {
            let message = err.errors.map ( e => e.message )
            return res.status(400).json(message)
        } else {
            // Unexpected error 
            return next(err)
        }
    })
})

// TODO delete Students and students/100
router.delete('/students/:id', function (req, res, next) {
    let studentsID = req.params.id
    Student.destroy ( {where: {id: studentsID} } )
        .then( (rowsDelete) => {
            if (rowsDelete == 1) {
                return res.send('OK')
            } else {
                return res.status(404).json([' Not found '])
            }
        })

        .catch ( err => next (err) )
})



module.exports = router

// DONT NOt write code here - it will be ignored