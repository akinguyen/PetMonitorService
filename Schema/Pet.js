const moongoose = require("mongoose");
const Schema = moongoose.Schema;

const Pet = new Schema({
  distance: {
    type: Number,
    required: true
  },
  midX: {
    type: Number
  },
  midY: {
    type: Number
  },
  rate: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  },
  awake: {
    type: Number
  },
  activity: {
    type: Number
  }
});

module.exports = moongoose.model("Pet", Pet);
