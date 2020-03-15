import Game from '../models/game';
import { responseWithError, responseWithData } from '../utils/response';

export const attackShip = async (req, res) => {
  const _id = req.params.id;
  const game = await Game.findById(_id);
  const { status } = game;
  if (!game) {
    return res.status(404).send(responseWithError('Not Found.', 404));
  }
  if (status == 'ended')
    return res
      .status(400)
      .send(responseWithError('This game already finish.', 400));
  if (status != 'attacking')
    return res
      .status(400)
      .send(
        responseWithError('Cannot attack.Please place all you ships.', 400)
      );

  const { xPosition, yPosition } = req.body;

  return res.send(game);
};
