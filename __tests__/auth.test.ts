import mongoose from 'mongoose';
import {app, server}  from '../app'
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import bcrypt from 'bcrypt'
import models from '../models';

let mongoServer: MongoMemoryServer;

// Tests Users
const hashedPassword = bcrypt.hashSync('test123!', 12);

const exsistingUser = {
  username: `Jane Doe`, 
  password: 'test123!', //stores plain text, hases before inserting
  role: 'Guest',
}

const newUser = {
  username: `user_${Date.now()}`, //this will generate a unique user for each test
  password: 'test123!',
  role: 'Guest',
};


// === BEFORE AllS ===

beforeAll(async () => {
  // Start the in-memory MongoDB server
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  // Connect Mongoose to this test database
  await mongoose.connect(mongoUri, { dbName: 'testdb' });

  //clears database is clean before inserting test users
  await models.User.deleteMany({})

  //hashes password and creates test user
  const createdUser = await models.User.create({ 
    username: exsistingUser.username,
    hashedPassword,
    role: exsistingUser.role
  });

  console.log("Test User Create:", createdUser);
  
});



// === TESTS ===

// siginup Test
describe('Test the signup route', () => {
  it('it should return 201, username, role', async () => {
      const response = await request(app)
      .post('/auth/signup')
      .send(newUser)
      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('_id')
      expect(response.body.username).toBe(newUser.username);
      expect(response.body.role).toBe(newUser.role);
  }, 10000)
})

//login test
describe('Test the login route', () => {
  it('if should return a 201, validate password and return username, role' , async () => {
    const response = await request(app)
    .post('/auth/login')
    .send({
      username: exsistingUser.username,
      password: 'test123!'
    });
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('_id');
    expect(response.body.username).toBe(exsistingUser.username);
    expect(response.body.role).toBe(exsistingUser.role)
  }, 10000)
})


//==== After alls =====

afterAll(async () => {
  // Close MongoDB connection and stop the test server
  await mongoose.disconnect();
  await mongoServer.stop();
  server.close();
});


