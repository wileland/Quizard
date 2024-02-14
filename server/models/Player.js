import { Schema, model } from 'mongoose';

const playerSchema = new Schema({
  hostId: String,
  playerId: String,
  name: String,
  gameData: String // Adjust the type according to your data structure
});

const Player = model('Player', playerSchema);

export default Player;