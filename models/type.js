const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TypeSchema = new Schema({
  name: { type: String, required: true, maxLength: 100},
});

TypeSchema.virtual("url").get(function () {
  return `/inventory/type/${this._id}`;
});

module.exports = mongoose.model("Type", TypeSchema);