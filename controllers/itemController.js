const Item = require("../models/item");
const Type = require("../models/type");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const [
    numClothes,
    numMens,
    numWomens,
    numUnisex,
    numTees,
    numShorts,
    numShirts,
    numPants,
    numJackets,
    numDresses,
    numShoes,
    numSocks,
  ] = await Promise.all([
    Item.countDocuments({}).exec(),
    Item.countDocuments({ gender: "male" }).exec(),
    Item.countDocuments({ gender: "female" }).exec(),
    Item.countDocuments({ gender: "unisex" }).exec(),
    Item.countDocuments({ type: await Type.find({ name: "t_shirt" }) }).exec(),
    Item.countDocuments({ type: await Type.find({ name: "shorts" }) }).exec(),
    Item.countDocuments({ type: await Type.find({ name: "shirt" }) }).exec(),
    Item.countDocuments({ type: await Type.find({ name: "pants" }) }).exec(),
    Item.countDocuments({ type: await Type.find({ name: "jacket" }) }).exec(),
    Item.countDocuments({ type: await Type.find({ name: "dresses" }) }).exec(),
    Item.countDocuments({ type: await Type.find({ name: "shoes" }) }).exec(),
    Item.countDocuments({ type: await Type.find({ name: "socks" }) }).exec(),
  ]);

  res.render("index", {
    title: "Total Inventory",
    clothes_count: numClothes,
    mens_clothes_count: numMens,
    womens_clothes_count: numWomens,
    unisex_clothes_count: numUnisex,
    t_shirt_clothes_count: numTees,
    shorts_clothes_count: numShorts,
    shirt_clothes_count: numShirts,
    pants_clothes_count: numPants,
    jacket_clothes_count: numJackets,
    dresses_clothes_count: numDresses,
    shoes_clothes_count: numShoes,
    socks_clothes_count: numSocks,
  });
});

exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({}, "name stock")
    .sort({ name: 1 })
    .populate("type")
    .exec();
  
  res.render("lists/item_list", {title: "Item List", itemList: allItems});
});

exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("type").exec();

  if (item === null) {
    const err = new Error("Item not found")
    err.status = 404;
    return next(err);
  }

  res.render("detail/item_detail", { title: item.name, item: item })
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item create get");
});

exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item create post");
});

exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item delete get");
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item delete post");
});

exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item update get");
});

exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item update post");
});
