import Game from '../models/game';
import Place from '../models/place';
import { getShipById } from '../utils/ship';
import { responseWithError, responseWithData } from '../utils/response';

export const attackShip = async (req, res) => {
  const _id = req.params.id;
  const game = await Game.findById(_id);
  if (!game) {
    return res.status(404).send(responseWithError('Not Found.', 404));
  }
  if (game.status == 'ended')
    return res
      .status(400)
      .send(responseWithError('This game already finish.', 400));
  if (game.status != 'attacking')
    return res
      .status(400)
      .send(
        responseWithError('Cannot attack.Please place all you ships.', 400)
      );

  const { xPosition, yPosition } = req.body;
  const point = game.current_state[yPosition]?.[xPosition];

  if (!point && point != 0)
    return res.status(400).send(responseWithError('Invalid Positions.', 400));

  game.attack_count++;

  let status;
  if (point == 0) status = 'Miss';
  else {
    // Checks remaining ship is left.
    if (
      game.current_state[yPosition - 1]?.[xPosition] === point ||
      game.current_state[yPosition]?.[xPosition - 1] === point ||
      game.current_state[yPosition + 1]?.[xPosition] === point ||
      game.current_state[yPosition]?.[xPosition + 1] === point
    )
      status = 'Hit';

    // ship has been sunk.
    if (!status) {
      const ship = getShipById(point);
      status = 'You just sank a ' + ship;
      game[ship]--;
      game.total_ships--;
    }

    // when all ships have been sunk.
    if (game.total_ships == 0) {
      status =
        'Win !You have completed the game in ' + game.attack_count + ' moves';
      game.status = 'ended';
    }

    game.current_state[yPosition][xPosition] = 0;
    game.markModified('current_state');
  }
  await game.save();

  const place = new Place();
  place.game_id = game._id;
  place.xPosition = xPosition;
  place.yPosition = yPosition;
  place.hit = point === 0;
  await place.save();

  return res.send(responseWithData({ status }));
};
