import express from 'express';
import { startGame, getGameStatus } from '../controller/game';
import { placeShip } from '../controller/place';
import { validatePlaceShip } from '../validations/place';
import { attackShip } from '../controller/attack';

const router = express.Router();

router.get('/game/start', startGame);
router.get('/game/:id/status', getGameStatus);
router.post('/game/:id/place', validatePlaceShip, placeShip);
router.post('/game/:id/attack', attackShip);

export default router;
