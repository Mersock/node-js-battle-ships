import express from 'express';
import { startGame } from '../controller/game';

const router = express.Router();

router.get('/game/start', startGame);

export default router;
