import request from 'supertest';
import app from '../src/app';
import { connection } from 'mongoose';

test('Start Game', async () => {
  await request(app)
    .get('/game/start')
    .send()
    .expect(200);
});

afterAll(async () => {
  connection.db.dropDatabase();
});

test('Game Status', async () => {
  const gameStart = await request(app)
    .get('/game/start')
    .send()
    .expect(200);
  const GameBody = gameStart.body;
  const { id } = GameBody.data;
  const mockStatus = {
    data: {
      status: 'placing_ships'
    }
  };
  const gameStatus = await request(app)
    .get(`/game/${id}/status`)
    .send()
    .expect(200);
  expect(mockStatus).toMatchObject(gameStatus.body);
});

afterAll(async () => {
  connection.db.dropDatabase();
});
