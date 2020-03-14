import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var board = [];
for (let i = 0; i < 10; i++) board[i] = new Array(10).fill(0);

const GameSchema = new Schema({
  started_at: { type: Date, default: Date.now },
  start_state: { type: Array, of: Array },
  current_state: {
    type: Array,
    of: Array,
    default: board,
    validate: {
      validator: y => {
        return (
          y.length > 10 ||
          y.every(x => x.length > 10 || x.every(v => v >= 0 && v <= 5))
        );
      },
      message: () => `Ship position is invalid.`
    }
  },
  ended_at: { type: Date },
  attack_count: { type: Number, default: 0 },
  status: { type: String, default: 'placing_ships' },
  total_ships: {
    type: Number,
    default: 0,
    max: 10
  },
  battleship: {
    type: Number,
    default: 0,
    max: 1
  },
  cruiser: {
    type: Number,
    default: 0,
    max: 2
  },
  destroyer: {
    type: Number,
    default: 0,
    max: 3
  },
  submarine: {
    type: Number,
    default: 0,
    max: 4
  }
});

const Game = mongoose.model('Game', GameSchema);

export default Game;
