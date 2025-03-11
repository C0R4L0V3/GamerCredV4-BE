import mongoose from 'mongoose';
import {app, server}  from '../app'
import request from 'supertest';

beforeAll(async () => {
  // establish a mongodb before running tests
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log(`Connested to MongoDB ${mongoose.connection.name}`);
});

afterAll(async () => {
  //diconnect from DB after tests are done
  await mongoose.disconnect();
  console.log('Disconnected to MongoDB.');
});


// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello GamerCred' });
// });

describe('GET /', () => {
  it('should return a JSON response', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('Message', 'Hello GamerCred');
  });
});

afterAll(done => {
  server.close()
  done()
})