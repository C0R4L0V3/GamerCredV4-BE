import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import models from '../models'


const index = async(req: Request, res: Response) => {
  try {
    const allUsers = await models.User.find({})

    res.status(200).send(allUsers)
  } catch (error :any) {
    res.status(500).json({ error: error.message })
  }
}

const signUp = async (req: Request, res: Response) => {

  try {
    const { username, password, role } = req.body

    const existingUser = await models.User.findOne({ username })

    if(existingUser) return res.status(409).json({ error: 'Username already taken.' })

    //create the user
    const user = await models.User.create({
      username,
      hashedPassword: bcrypt.hashSync(password, 12),
      role
    })

    console.log(user)

    //send something
    res.status(201).json({ success: true })

  } catch (error :any) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }

}

export default {
  signUp,
  index
}
