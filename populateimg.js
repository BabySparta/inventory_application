const Item = require("./models/item");

require("dotenv").config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGO_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);

  const cargoItem = await Item.findOne({ name: "Cargo pants" });
  const lumberItem = await Item.findOne({ name: "Flannel lumberjack shirt" });
  const graffitiItem = await Item.findOne({ name: "Graffiti pattern shoes" });
  const bikerItem = await Item.findOne({ name: "Neon green biker jacket" });
  const swimItem = await Item.findOne({ name: "Orange Blue Swim Trunks" });
  const socksItem = await Item.findOne({ name: "Paint sploch socks" });
  const polkaItem = await Item.findOne({ name: "Polka dot shorts" });
  const roseItem = await Item.findOne({ name: "Rose short dress" });
  const tatteredItem = await Item.findOne({ name: "Tattered white tee" });
  const teddyItem = await Item.findOne({ name: "Teddy bear back print hoodie" });
  const stockingsItem = await Item.findOne({ name: "Women's black stockings" });
  const leggingsItem = await Item.findOne({ name: "Women's pink leggings" });

  setPath(cargoItem, "cargo_pants.jpg");
  setPath(lumberItem, "flannel_lumberjack_shirt.jpeg");
  setPath(graffitiItem, "graffiti_pattern_shoes.jpg");
  setPath(bikerItem, "neon_green_biker_jacket.jpg");
  setPath(swimItem, "orange_swim_trunks.jpg");
  setPath(socksItem, "paint_sploch_socks.jpeg");
  setPath(polkaItem, "polka_dot_shorts.jpg");
  setPath(roseItem, "rose_short_dress.jpg");
  setPath(tatteredItem, "tattered_whute_tee.jpg");
  setPath(teddyItem, "teddy_bear_hoodie.jpeg");
  setPath(stockingsItem, "black_stockings.jpg");
  setPath(leggingsItem, "pink_leggings.jpg");

  async function setPath(item, path) {
    item.image = `/uploads/${path}`;
    await item.save();
  }
}
