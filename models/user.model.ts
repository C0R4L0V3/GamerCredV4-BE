import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  username: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  displayName: { type: String },
  email: { type: String },
  role: { type: String, required: true, enum: ['Admin', 'Developer', 'Guest'] },
  //additional platform apis to link to user account e.g microsoft, xbox live, sony
  steamId: { type: String },
})

const User = model('User', userSchema)

export default User
