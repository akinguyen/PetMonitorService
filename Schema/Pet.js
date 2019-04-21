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
  timestamp: {
    type: String
  },
  awake: {
    type: Number
  },
  activity: {
    type: Number
  },
  date: {
    type: String
  },
  time: {
    type: String
  },
  activity0Counter: {
    type: Number
  },
  activity1Counter: {
    type: Number
  },
  activity2Counter: {
    type: Number
  },
  activity3Counter: {
    type: Number
  }
});

module.exports = moongoose.model("Pet", Pet);
