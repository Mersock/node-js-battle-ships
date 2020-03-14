import Game from '../models/game';
import { responseWithData, responseWithError } from '../utils/response';

export const startGame = async (req, res) => {
  return new Game()
    .save()
    .then(game => res.status(200).send(responseWithData({ _id: game.id })))
    .catch(err => res.status(500).send(responseWithError(err)));
};
