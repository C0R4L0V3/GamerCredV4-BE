import models  from '../models'
import { Request, Response } from 'express';
const { errorHandler, withTransaction } = require('../utils')

const signUp =  errorHandler(withTransaction(async (req:any, res:any, session:any) => {

  try {
    const { username, password, confirmPass } = req.body

    //find a user by username
    const existingUser = await models.User.findOne({ username })

    if(existingUser) {
      res.status(404)
      throw new Error('username already taken')
    }

    //password
    if(password !== confirmPass) {
      res.status(400)
      throw new Error('passwords does not match')
    }

    if(password.length < 8) {
      res.status(400)
      throw new Error('password must be greater than 8 characters')
    }

    //TODO  1 special characters, 1 lowercase, 1 uppercase

    // res.status(200).json(existingUser)


  } catch (error:any) {

    if(error.statusCode === 404) res.json({ error: error.message})

    console.log(error)
  }

}))


export { signUp }
