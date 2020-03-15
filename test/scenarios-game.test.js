import request from 'supertest';
import app from '../src/app';
import { connection } from 'mongoose';
import { sinkShip, placeShips } from './fixtures/mock-game';

test('Attack Hit Ships', async () => {
  let gameID = await placeShips();

  let xPosition = 0;
  let yPosition = 0;
  const mockHit = {
    data: { status: 'Hit' }
  };
  const attackHit = await request(app)
    .post('/game/' + gameID + '/attack')
    .send({
      xPosition,
      yPosition
    })
    .expect(200);
  expect(mockHit).toMatchObject(attackHit.body);
});

test('Attack Miss Ships', async () => {
  let gameID = await placeShips();

  let xPosition = 9;
  let yPosition = 9;
  const mockMiss = {
    data: { status: 'Miss' }
  };
  const attackMiss = await request(app)
    .post('/game/' + gameID + '/attack')
    .send({
      xPosition,
      yPosition
    })
    .expect(200);
  expect(mockMiss).toMatchObject(attackMiss.body);
});

test('Attack Invalid Point', async () => {
  let gameID = await placeShips();
  let xPosition = 10;
  let yPosition = 10;
  const mockError = {
    errors: {
      status_code: 422,
      message: 'Invalid value.',
      errors: {
        xPosition: ['xPosition must be numeric between 0-9'],
        yPosition: ['yPosition must be numeric between 0-9']
      }
    }
  };
  const attackInvalid = await request(app)
    .post('/game/' + gameID + '/attack')
    .send({
      xPosition,
      yPosition
    })
    .expect(422);
  expect(mockError).toMatchObject(attackInvalid.body);
});

test('Attack With Sink Ship and Win Game', async () => {
  let gameID = await sinkShip();
  let xPosition = 3;
  let yPosition = 0;
  const mockSunk = { data: { status: 'You just sank a battleship' } };
  const attackSinkShip = await request(app)
    .post('/game/' + gameID + '/attack')
    .send({
      xPosition,
      yPosition
    })
    .expect(200);
  expect(mockSunk).toMatchObject(attackSinkShip.body);

  xPosition = 9;
  yPosition = 9;
  const mockWingame = {
    data: { status: 'Win !You have completed the game in 2 moves' }
  };
  const winGame = await request(app)
    .post('/game/' + gameID + '/attack')
    .send({
      xPosition,
      yPosition
    })
    .expect(200);
  expect(mockWingame).toMatchObject(winGame.body);
});

afterAll(async () => {
  connection.db.dropDatabase();
});
