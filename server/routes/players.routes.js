import express from 'express';
import {
  deletePlayer,
  getPlayer,
  getPlayers,
  postPlayer,
  updatePlayer,
} from '../controller/players.controller.js';

const router = express.Router();

router.get('/players', getPlayers);

router.get('/players/:playerId', getPlayer);

router.post('/players', postPlayer);

router.put('/players/:playerId', updatePlayer);

router.delete('/players/:playerId', deletePlayer);

export default router;
