import express from 'express';
import { startGame, getGameStatus } from '../controller/game';

const router = express.Router();

router.get('/game/start', startGame);
router.get('/game/:id/status', getGameStatus);

export default router;
