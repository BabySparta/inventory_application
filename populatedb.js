const Item = require("./models/item");
const Type = require("./models/type");
require('dotenv').config();

const items = [];
const types = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGO_URI;

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createTypes();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// types[0] will always be the T-shirt genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function itemCreate(index, name, gender, type, price, stock) {
  const item = new Item({
    name: name,
    gender: gender,
    type: type,
    price: price,
    stock: stock,
  });
  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function typeCreate(index, name) {
  const type = new Type({ name: name });

  await type.save();
  types[index] = type;
  console.log(`Added type: ${name}`);
}

async function createItems() {
  console.log("Adding items");
  await Promise.all([
    itemCreate(0, 'Tattered white tee', 'male', types[0], 17.39, 291),
    itemCreate(1, 'Polka dot shorts', 'female', types[1], 12.99, 305),
    itemCreate(2, 'Flannel lumberjack shirt', 'male', types[2], 27.59, 184),
    itemCreate(3, 'Cargo pants', 'unisex', types[3], 19.19, 468),
    itemCreate(4, 'Neon green biker jacket', 'unisex', types[4], 137.99, 83),
    itemCreate(5, 'Rose short dress', 'female', types[5], 74.29, 97),
    itemCreate(6, 'Graffiti pattern shoes', 'unisex', types[6], 107.39, 162),
    itemCreate(7, "Women's black stockings", 'female', types[7], 45.89, 421),
    itemCreate(8, "Women's pink leggings", 'female', types[3], 32.19, 356),
    itemCreate(9, "Paint sploch socks", 'unisex', types[7], 16.39, 412),
  ]);
}

async function createTypes() {
  console.log("Adding types");
  await Promise.all([
    typeCreate(0, allTypes[0]),
    typeCreate(1, allTypes[1]),
    typeCreate(2, allTypes[2]),
    typeCreate(3, allTypes[3]),
    typeCreate(4, allTypes[4]),
    typeCreate(5, allTypes[5]),
    typeCreate(6, allTypes[6]),
    typeCreate(7, allTypes[7]),
  ]);
}

const allTypes = [
  "t_shirt",
  "shorts",
  "shirt",
  "pants",
  "jacket",
  "dresses",
  "shoes",
  "socks",
];
