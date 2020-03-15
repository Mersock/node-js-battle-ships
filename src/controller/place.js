import Game from '../models/game';
import { getShipByName } from '../utils/ship';
import {
  responseWithData,
  responseWithError,
  responseValidateError
} from '../utils/response';

export const placeShip = async (req, res) => {
  try {
    const _id = req.params.id;

    const game = await Game.findById(_id);

    if (!game)
      return res.status(404).send(responseWithError('Not Found.', 404));

    if (game.status != 'placing_ships')
      return res.status(422).send(
        responseValidateError('Invalid value.', 422, {
          ship: ['All your ship been been placed.']
        })
      );

    const { xPosition, yPosition, vertical, ship } = req.body;
    const { id, size } = getShipByName(ship);
    // Checks area is empty before placing the ship.
    for (let i = 0; i < size; i++)
      for (let j = -1; j < 2; j++)
        for (let k = -1; k < 2; k++) {
          let value;
          // console.log('y', game.current_state[yPosition + i + j]);
          // console.log('x', [xPosition + k]);
          // console.log(
          //   'xy',
          //   game.current_state[yPosition + i + j]?.[xPosition + k]
          // );
          if (vertical)
            value = game.current_state[yPosition + i + j]?.[xPosition + k];
          else value = game.current_state[yPosition + j]?.[xPosition + i + k];
          if (
            (j == 0 && k == 0 && value != 0) || // coordinates to place the ship is not 0 (current_state) .
            (value != null && value > 0 && value <= 4) // if points not clear or overlap
          )
            return res.status(422).send(
              responseValidateError('Invalid value.', 422, {
                ship: ['cannot place.The area is occupied or overlap.']
              })
            );
        }

    // add ship placed by current_state.
    for (let i = 0; i < size; i++)
      if (vertical) game.current_state[yPosition + i][xPosition] = id;
      else game.current_state[yPosition][xPosition + i] = id;
    game[ship]++;
    game.total_ships++;

    // All ships have been placed.
    if (game.total_ships == 10) {
      game.status = 'attacking';
      game.start_state = game.current_state;
    }
    // current_state pending
    game.markModified('current_state');
    const setGame = await game.save();
    return res.send(responseWithData(setGame));
  } catch (error) {
    return res.status(400).send(responseWithError(error.message, 400));
  }
};
