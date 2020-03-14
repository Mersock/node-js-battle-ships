import Game from '../models/game';
import { responseWithData, responseWithError } from '../utils/response';

export const startGame = (req, res) => {
  return new Game()
    .save()
    .then(game => res.status(200).send(responseWithData({ _id: game.id })))
    .catch(err => res.status(500).send(responseWithError(err)));
};

export const getGameStatus = async (req, res) => {
  const _id = req.params.id;
  try {
    const _id = req.params.id;
    const game = await Game.findById(_id);
    if (!game) res.status(404).send(responseWithError('Not Found.', 404));
    return res.send(responseWithData({ status: game.status }));
  } catch (error) {
    res.status(400).send(responseWithError('Bad Request.', 400));
  }
};
