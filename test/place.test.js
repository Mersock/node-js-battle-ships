import request from 'supertest';
import app from '../src/app';
import { connection } from 'mongoose';
import { sinkShip, ObjectId } from './fixtures/mock-game';

test('Place battleships', async () => {
  const startGame = await request(app)
    .get('/game/start')
    .send()
    .expect(200);

  const startGameBody = startGame.body;
  const { id } = startGameBody.data;

  let params = {
    yPosition: 0,
    xPosition: 0,
    ship: 'battleship',
    vertical: false
  };

  const battleshipMock = {
    total_ships: 1,
    battleship: 1
  };
  const placeBattleShip = await request(app)
    .post('/game/' + id + '/place')
    .send(params)
    .expect(200);
  expect([1, 1, 1, 1, 0, 0, 0, 0, 0, 0]).toEqual(
    expect.arrayContaining(placeBattleShip.body.data.current_state[0])
  );
  expect(battleshipMock.total_ships).toEqual(
    placeBattleShip.body.data.total_ships
  );
  expect(battleshipMock.battleship).toEqual(
    placeBattleShip.body.data.battleship
  );
});

test('Place cruiser', async () => {
  const startGame = await request(app)
    .get('/game/start')
    .send()
    .expect(200);

  const startGameBody = startGame.body;
  const { id } = startGameBody.data;

  let params = {
    yPosition: 0,
    xPosition: 5,
    ship: 'cruiser',
    vertical: false
  };

  const cruiserMock = {
    total_ships: 1,
    cruiser: 1
  };
  const placeCruiser = await request(app)
    .post('/game/' + id + '/place')
    .send(params)
    .expect(200);
  expect([0, 0, 0, 0, 0, 2, 2, 2, 0, 0]).toEqual(
    expect.arrayContaining(placeCruiser.body.data.current_state[0])
  );
  expect(cruiserMock.total_ships).toEqual(placeCruiser.body.data.total_ships);
  expect(cruiserMock.cruiser).toEqual(placeCruiser.body.data.cruiser);
});

test('Place destroyer', async () => {
  const startGame = await request(app)
    .get('/game/start')
    .send()
    .expect(200);

  const startGameBody = startGame.body;
  const { id } = startGameBody.data;

  let params = {
    yPosition: 0,
    xPosition: 5,
    ship: 'destroyer',
    vertical: false
  };

  const destroyerMock = {
    total_ships: 1,
    destroyer: 1
  };
  const placeDestroyer = await request(app)
    .post('/game/' + id + '/place')
    .send(params)
    .expect(200);
  expect([0, 0, 0, 0, 3, 3, 0, 0, 0, 0]).toEqual(
    expect.arrayContaining(placeDestroyer.body.data.current_state[2])
  );
  expect(destroyerMock.total_ships).toEqual(
    placeDestroyer.body.data.total_ships
  );
  expect(destroyerMock.destroyer).toEqual(placeDestroyer.body.data.destroyer);
});

test('Place submarine', async () => {
  const startGame = await request(app)
    .get('/game/start')
    .send()
    .expect(200);

  const startGameBody = startGame.body;
  const { id } = startGameBody.data;

  let params = {
    yPosition: 0,
    xPosition: 5,
    ship: 'submarine',
    vertical: false
  };

  const submarineMock = {
    total_ships: 1,
    submarine: 1
  };
  const placeSubmarine = await request(app)
    .post('/game/' + id + '/place')
    .send(params)
    .expect(200);
  expect([0, 0, 0, 4, 4, 4, 0, 0, 0, 0]).toEqual(
    expect.arrayContaining(placeSubmarine.body.data.current_state[4])
  );
  expect(submarineMock.total_ships).toEqual(
    placeSubmarine.body.data.total_ships
  );
  expect(submarineMock.submarine).toEqual(placeSubmarine.body.data.submarine);
});

test('Place occupied or overlap', async () => {
  const startGame = await request(app)
    .get('/game/start')
    .send()
    .expect(200);

  const startGameBody = startGame.body;
  const { id } = startGameBody.data;

  let params = {
    yPosition: 9,
    xPosition: 6,
    ship: 'battleship',
    vertical: true
  };
  const mockOccupied = {
    errors: {
      status_code: 422,
      message: 'Invalid value.',
      errors: { ship: ['Cannot place.The area is occupied or overlap.'] }
    }
  };

  const placeOccupied = await request(app)
    .post('/game/' + id + '/place')
    .send(params)
    .expect(422);
  expect(mockOccupied).toMatchObject(placeOccupied.body);
});

test('All Ship Place Already', async () => {
  let gameID = await sinkShip();

  let params = {
    yPosition: 0,
    xPosition: 5,
    ship: 'submarine',
    vertical: false
  };

  const mockAllPlace = {
    errors: {
      status_code: 422,
      message: 'Invalid value.',
      errors: { ship: ['All your ship been been placed.'] }
    }
  };
  const allPlaceShip = await request(app)
    .post('/game/' + gameID + '/place')
    .send(params)
    .expect(422);
  expect(mockAllPlace).toMatchObject(allPlaceShip.body);
});

afterAll(async () => {
  connection.db.dropDatabase();
});
