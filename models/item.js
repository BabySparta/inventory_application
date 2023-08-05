const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const genderEnum = ["male", "female", "unisex"];

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  gender: { type: String, required: true, enum: genderEnum },
  type: { type: Schema.Types.ObjectId, ref: "Type", required: true },
  price: { type: mongoose.Schema.Types.Decimal128, required: true },
  stock: { type: Number, required: true, min: 0 },
  image: { type: String }
});

ItemSchema.virtual("url").get(function () {
  return `/inventory/item/${this.id}`;
});

module.exports = mongoose.model("Item", ItemSchema);