import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import clubsRoutes from './routes/clubs.routes.js';
import playersRoutes from './routes/players.routes.js';

dotenv.config();

const connectionString =
  process.env.DB_CONNECTION || 'mongodb://localhost:27017/football-trading';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.set('returnOriginal', false);

const server = express();

server.use(cors());
server.use(express.json());

server.get('/', (req, res) => res.json({ message: 'server is alive' }));

server.use(clubsRoutes);

server.use(playersRoutes);

server.listen(4000);
