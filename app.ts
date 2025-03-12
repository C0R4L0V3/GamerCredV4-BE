// dependancies
import dotenv from "dotenv";
dotenv.config();
import express from "express";
export const app = express();
import mongoose from "mongoose";
import cors from "cors";

import routes from './routes'

// Models

// imports controllers

if(process.env.NODE_ENV !== 'test') {

  mongoose.connect(process.env.MONGODB_URI as string);
  mongoose.connection.on('connected', () => {
      console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  })
  
}



const PORT: string|number = process.env.PORT || 3000

// middleware
app.use(cors({origin: 'http://localhost:5173'}))

app.use(express.json())

// approutes

app.get('/', (req, res) => {
    res.json({Message: 'Hello GamerCred'})
})

app.use('/api', routes)

export const server = app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);

})



module.exports = {app, server}
