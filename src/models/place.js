import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PlaceSchema = new Schema(
  {
    game_id: { type: mongoose.Types.ObjectId, required: true },
    move_at: { type: Date, default: Date.now },
    xPos: { type: Number, required: true },
    yPos: { type: Number, required: true },
    hit: { type: Boolean, required: true }
  },
  {
    toJSON: {
      transform: function(doc, place) {
        place.id = place._id;
        delete place._id;
        return place;
      }
    },
    toObject: {
      transform: function(doc, place) {
        place.id = place._id;
        delete place._id;
        return place;
      }
    }
  }
);

const place = mongoose.model('Place', PlaceSchema);

export default place;
