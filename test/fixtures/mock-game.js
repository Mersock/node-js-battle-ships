import Game from '../../src/models/game';

export async function placeShips() {
  const game = await new Game();
  const board = [
    [1, 1, 1, 1, 0, 2, 2, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 2, 2, 0, 3, 3, 0, 3, 3, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 3, 0, 4, 4, 4, 0, 4, 4, 4],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [4, 4, 4, 0, 4, 4, 4, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  game.start_state = board;
  game.current_state = board;
  game.battleship = 1;
  game.cruiser = 2;
  game.destroyer = 3;
  game.submarine = 4;
  game.total_ships = 10;
  game.status = 'attacking';

  return game.save().then(game => game.id);
}

export async function sinkShip() {
  const game = await new Game();
  const board = [
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 4]
  ];
  game.current_state = board;
  game.battleship = 1;
  game.cruiser = 0;
  game.destroyer = 0;
  game.submarine = 1;
  game.total_ships = 2;
  game.status = 'attacking';
  return game.save().then(game => game.id);
}
