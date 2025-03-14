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

    //TODO TOKEN PASSING

    //send something
    res.status(201).json(user)

  } catch (error :any) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }

}

const userLogin = async ( req: Request, res: Response) => {
  

  const { username, password } = req.body
  try {

    const existingUser = await models.User.findOne({ username })

    if(!existingUser){
      console.log("no User Found for:", username);
      return res.status(409).json({ error: 'No User Found'})
    }

    console.log("user found:", existingUser);
    
    const validatePW = bcrypt.compareSync( password, existingUser.hashedPassword)
    console.log(`password Validationg (${password} vs ${existingUser.hashedPassword}):`, validatePW);
    
    if (!validatePW) return res.status(409).json({ error: "Incorrect password"})

      res.status(201).json({
        _id: existingUser._id,
        username:existingUser.username,
        role: existingUser.role
      })

    //TODO Create user session with Token

  } catch (error: any) {
    console.log("error in login:", error.message)
    res.status(500).json({ error: error.message})
    
  }
}

export default {
  signUp,
  index,
  userLogin
}
