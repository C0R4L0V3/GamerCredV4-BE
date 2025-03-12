// dependancies
import dotenv from "dotenv";
dotenv.config();
import express from "express";
export const app = express();
import mongoose from "mongoose";
import cors from "cors";

const logger = require('./logger')
import routes from './routes'

// Models

// imports controllers

mongoose.connect(process.env.MONGODB_URI as string);
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
})
const PORT: string|number = process.env.PORT || 3000

// middleware
app.use(cors({origin: 'http://localhost:5173'}))

app.use(express.json())
//api routes
app.use('/api', routes)

app.use((err:any, req:any, res:any, next:any) => {
  logger.error(err.stack)
  res.status(err.statusCode || 500)
  .send({ error: err.message})
})

// approutes

//test routes
app.get('/', (req, res) => {
    res.json({Message: 'Hello GamerCred'})
})





export const server = app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);

})



module.exports = {app, server}
