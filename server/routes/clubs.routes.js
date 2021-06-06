import express from 'express';
import {
  deleteClub,
  getClub,
  getClubs,
  postClub,
  updateClub,
} from '../controller/clubs.controller.js';

const router = express.Router();

router.get('/clubs', getClubs);

router.get('/clubs/:clubId', getClub);

router.post('/clubs', postClub);

router.put('/clubs/:clubId', updateClub);

router.delete('/clubs/:clubId', deleteClub);

export default router;
