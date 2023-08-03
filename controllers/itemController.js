const Item = require("../models/item");
const Type = require("../models/type");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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

  res.render("lists/item_list", { title: "Item List", itemList: allItems });
});

exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate("type").exec();

  if (item === null) {
    const err = new Error("Item not found");
    err.status = 404;
    return next(err);
  }

  res.render("detail/item_detail", { title: item.name, item: item });
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
  const allTypes = await Type.find().exec();

  res.render("forms/item_create", {
    title: "Create clothing item",
    types: allTypes,
  });
});

exports.item_create_post = [
  // Validate and sanitize fields.
  body("title", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("type", "Type must be selected.").trim().isLength({ min: 1 }).escape(),
  body("gender", "Gender must be selected.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .custom((value) => {
      // Perform custom validation for price format
      const priceRegex = /^\d+(\.\d{1,2})?$/;
      if (!priceRegex.test(value)) {
        throw new Error(
          "Invalid price format. Please use a valid numeric format (e.g., 10 or 10.00)."
        );
      }
      return true;
    }),
    body("stock")
    .trim()
    .notEmpty().withMessage("Stock must not be empty")
    .escape()
    .custom(value => {
      // Perform custom validation for whole number format
      const stockValue = parseInt(value, 10); // Parse the value as an integer
      if (isNaN(stockValue) || stockValue !== Math.floor(stockValue)) {
        throw new Error("Invalid stock format. Please enter a whole number.");
      }
      return true; // Returning true means the validation passed
    }),
  
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const item = new Item({
      name: req.body.title,
      gender: req.body.gender,
      type: req.body.type,
      price: req.body.price,
      stock: req.body.stock,
    });

    if (!errors.isEmpty()) {

      const allTypes = await Type.find({}).exec();
      res.render("forms/item_create", {
        title: "Create clothing item",
        types: allTypes,
        item: item,
        errors: errors.array(),
      });
    } else {
      await item.save();
      res.redirect(item.url);
    }
  }),
];

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
