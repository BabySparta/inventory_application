const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const typeEnum = [
  "t-shirt",
  "shorts",
  "shirt",
  "pants",
  "jacket",
  "dresses",
  "shoes",
  "socks",
];

const TypeSchema = new Schema({
  name: { type: String, required: true, maxLength: 100, enum: typeEnum },
  clothes: [{ type: Schema.Types.ObjectId, ref: "Item" }],
});

TypeSchema.virtual("url").get(function () {
  return `/catalog/type/${this._id}`;
});

module.exports = mongoose.model("Type", TypeSchema);