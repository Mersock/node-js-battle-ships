import express from 'express';
import { startGame, getGameStatus } from '../controller/game';
import { placeShip } from '../controller/defender';
import { validatePlaceShip } from '../validations/defender';

const router = express.Router();

router.get('/game/start', startGame);
router.get('/game/:id/status', getGameStatus);

router.post('/game/:id/place', validatePlaceShip, placeShip);
export default router;
