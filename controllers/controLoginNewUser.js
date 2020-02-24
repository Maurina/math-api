 const { validationResult } = require('express-validator')
 const bcrypt = require('bcryptjs')
 const jwt = require('jsonwebtoken')

 const User = require('../models/user')
 
 exports.createNewUser = (req, res, next) => {
     const errors = validationResult(req)
     if (!errors.isEmpty()){
         const error = new Error('Validation failed')
         error.statusCode = 422
         error.data = errors.array()
         throw error
     }
      const email = req.body.email
      const password = req.body.password
      bcrypt
      .hash(password, 12)
      .then( hashedPassword => {
        const user = new User({
            email: email,
            password: hashedPassword
        })
        return user.save()
      })
      .then(result => {
          res.status(201).json({message: 'User created', userId: result._id})
      })
      .catch(err =>{
        if (!err.statusCode){
            err.statusCode = 500
        }
        next(err)
      })
   
      user.save().then(result =>{
          console.log(result)
          res.status(201).json({
            message: "New User created sucessfully",
            user: result
        })
      }).catch(err => {
          if (!err.statusCode){
              err.statusCode = 500
          }
          next(err)
      })
     
  }

  exports.loginCheck = (req, res, next) => {
      const email = req.body.email
      const password = req.body.password
      res.status(201).json({
          message:"Login successful",
          post: {id: new Date().toLocaleDateString(), email: email, password: password}
      })
  }

  exports.getUser = (req, res, next) => {
      const userId = req.params.userId
      User.findById(userId)
      .then(user => {
          if (!user){
              const error = new Error('User does not exist')
              error.statusCode = 404
              throw error
          }
          res.statusCode(200).json({message: 'User Found', user: user })
      })
      .catch(err => {
          if (!err.statusCode) {
              err.statusCode = 500
          }
          next(err)
      })
  }

  