const moongoose = require("mongoose");
const Schema = moongoose.Schema;

const Act = new Schema({
  activity: { type: String }
});

module.exports = moongoose.model("Act", Act);
