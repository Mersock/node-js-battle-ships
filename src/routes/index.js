import express from 'express';
import { startGame, getGameStatus } from '../controller/game';
import { placeShip } from '../controller/place';
import { validatePlaceShip } from '../validations/place';
import { attackShip } from '../controller/attack';
import { validateAttackShip } from '../validations/attack';

const router = express.Router();

router.get('/game/start', startGame);
router.get('/game/:id/status', getGameStatus);
router.post('/game/:id/place', validatePlaceShip, placeShip);
router.post('/game/:id/attack', validateAttackShip, attackShip);

export default router;
