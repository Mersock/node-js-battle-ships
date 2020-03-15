import express from 'express';
import { startGame, getGameStatus } from '../controller/game';
import { placeShip } from '../controller/place';
import { validatePlaceShip } from '../validations/place';

const router = express.Router();

router.get('/game/start', startGame);
router.get('/game/:id/status', getGameStatus);

router.post('/game/:id/place', validatePlaceShip, placeShip);
export default router;
