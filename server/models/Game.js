//need pin, hostId, boolean value for gameActive
// also will need game data
import { Schema, SchemaTypes, model } from "mongoose";

const gameSchema = new Schema({
  hostId: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    unique: true,
    required: true,
  },
  gameLive: Boolean,
  gameData: SchemaTypes.Mixed,
});

const Game = model("Game", gameSchema);

export default Game;
