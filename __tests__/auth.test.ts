import mongoose from 'mongoose';
import {app, server}  from '../app'
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;


beforeAll(async () => {
  // Start the in-memory MongoDB server
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // Connect Mongoose to this test database
  await mongoose.connect(mongoUri, { dbName: 'testdb' });
});

afterAll(async () => {
  // Close MongoDB connection and stop the test server
  await mongoose.disconnect();
  await mongoServer.stop();
});



describe('Test the signup route', () => {
  const newUser = {
     username: 'Jane Doe',
     password: 'test123!',
     role: 'Guest',
   };

  it('it should return 201, username, role', async () => {

      const response = await request(app)
      .post('/auth/signup')
      .send(newUser)
      expect(201)
      expect(response.body).toHaveProperty('_id')
      expect(response.body.username).toBe(newUser.username);
      expect(response.body.role).toBe(newUser.role);
  })


})

afterAll(done => {
  server.close()
  done()
})
