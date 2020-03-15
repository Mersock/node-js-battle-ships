import request from 'supertest';
import app from '../src/app';
import { connection } from 'mongoose';
import Game from '../src/models/game';

test('Should start game', async () => {
  const start = await request(app)
    .get('/game/start')
    .expect(200);
  const gameBody = start.body;
  const _id = gameBody.data.id;
  const game = await Game.findById(_id);
  expect(game).not.toBeNull();
  expect(game.id).toEqual(_id);

  const status = await request(app)
    .get(`/game/${_id}/status`)
    .expect(200);
  const statusBody = status.body.data;
  expect(game.status).toEqual(statusBody.status);
});

afterAll(async () => {
  connection.db.dropDatabase();
});
