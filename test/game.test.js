import request from 'supertest';
import app from '../src/app';
import { connection } from 'mongoose';

test('Should start game', async () => {
  const response = await request(app)
    .get('/game/start')
    .expect(200);
});

afterAll(async () => {
  connection.db.dropDatabase();
});
