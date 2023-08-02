const Item = require("../models/item");
const Type = require("../models/type");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const [
    numClothes,
    numMens,
    numWomens,
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
    Item.countDocuments({ gender: "men" }).exec(),
    Item.countDocuments({ gender: "women" }).exec(),
    Type.countDocuments({ name: "t_shirt"}).exec(),
    Type.countDocuments({ name: "shorts"}).exec(),
    Type.countDocuments({ name: "shirt"}).exec(),
    Type.countDocuments({ name: "pants"}).exec(),
    Type.countDocuments({ name: "jacket"}).exec(),
    Type.countDocuments({ name: "dresses"}).exec(),
    Type.countDocuments({ name: "shoes"}).exec(),
    Type.countDocuments({ name: "socks"}).exec(),
  ]);

  res.render("index", {
    title: "Total Inventory",
    clothes_count: numClothes,
    mens_clothes_count: numMens,
    womens_clothes_count: numWomens,
    t_shirt_clothes_count: numTees,
    shorts_clothes_count: numShorts,
    shirt_clothes_count: numShirts,
    pants_clothes_count: numPants,
    jacket_clothes_count: numJackets,
    dresses_clothes_count: numDresses,
    shoes_clothes_count: numShoes,
    socks_clothes_count: numSocks
  })
});

exports.item_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Item list");
});

exports.item_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Item detail: ${req.params.id}`);
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
