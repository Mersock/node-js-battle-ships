import Game from '../models/game';
import { responseWithError } from '../utils/response';

export const attackShip = async (req, res) => {
  const _id = req.params.id;
  const game = await Game.findById(_id);
  if (!game) {
    return res.status(404).send(responseWithError('Not Found.', 404));
  }
  return res.send(game);
};
