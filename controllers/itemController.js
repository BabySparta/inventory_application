const Item = require("../models/item");
const Type = require("../models/type");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
  const allTypes = await Type.find().exec();
  const [numClothes, numMens, numWomens, numUnisex] = await Promise.all([
    Item.countDocuments({}).exec(),
    Item.countDocuments({ gender: "male" }).exec(),
    Item.countDocuments({ gender: "female" }).exec(),
    Item.countDocuments({ gender: "unisex" }).exec(),
  ]);

  const typeCounts = {};

  for (const type of allTypes) {
    const count = await Item.countDocuments({ type: type._id }).exec();
    typeCounts[type.name] = count;
  }

  res.render("index", {
    title: "Total Inventory",
    typeCounts: typeCounts,
    clothes_count: numClothes,
    mens_clothes_count: numMens,
    womens_clothes_count: numWomens,
    unisex_clothes_count: numUnisex,
  });
});

exports.item_list = asyncHandler(async (req, res, next) => {
  const allItems = await Item.find({}, "name stock image")
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
    title: "Create Clothing Item",
    types: allTypes,
  });
});

exports.item_create_post = [
  // Validate and sanitize fields.
  body("title", "Name must not be empty.").trim().not().isEmpty().escape(),
  body("type", "Type must be selected.").trim().not().isEmpty().escape(),
  body("gender", "Gender must be selected.").trim().not().isEmpty().escape(),
  body("price", "Price must not be empty").trim().isFloat({ min: 0 }).toFloat(),
  body("stock").isInt({ min: 0 }).toInt(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    let image;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else if (req.body.usePrev === "on") {
      image = req.body.image;
    } else {
      image = "/uploads/placeholder.png";
    }

    const item = new Item({
      name: req.body.title,
      gender: req.body.gender,
      type: req.body.type,
      price: req.body.price,
      stock: req.body.stock,
      image,
    });

    console.log(req.body)

    if (!errors.isEmpty()) {
      const allTypes = await Type.find({}).exec();
      res.render("forms/item_create", {
        title: "Create Clothing Item",
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
  const item = await Item.findById(req.params.id).exec();
  if (item === null) {
    res.redirect("inventory/items");
  }

  res.render("forms/item_delete", {
    title: "Delete Clothing Item",
    item: item,
  });
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  await Item.findByIdAndRemove(req.body.itemid);
  res.redirect("/inventory/items");
});

exports.item_update_get = asyncHandler(async (req, res, next) => {
  const [item, allTypes] = await Promise.all([
    Item.findById(req.params.id).exec(),
    Type.find({}).exec(),
  ]);

  if (item === null) {
    res.redirect("inventory/items");
  }

  res.render("forms/item_create", {
    title: "Update Clothing Item",
    types: allTypes,
    item: item,
  });
});

exports.item_update_post = [
  // Validate and sanitize fields.
  body("title", "Name must not be empty.").trim().not().isEmpty().escape(),
  body("type", "Type must be selected.").trim().not().isEmpty().escape(),
  body("gender", "Gender must be selected.").trim().not().isEmpty().escape(),
  body("price", "Price must not be empty").trim().isFloat({ min: 0 }).toFloat(),
  body("stock").isInt({ min: 0 }).toInt(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    let image;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else if (req.body.usePrev === "on") {
      image = req.body.usePrev;
    } else {
      image = "/uploads/placeholder.png";
    }

    const item = new Item({
      name: req.body.title,
      gender: req.body.gender,
      type: req.body.type,
      price: req.body.price,
      stock: req.body.stock,
      _id: req.params.id,
      image,
    });

    if (!errors.isEmpty()) {
      const allTypes = await Type.find({}).exec();
      res.render("forms/item_create", {
        title: "Update Clothing Item",
        types: allTypes,
        item: item,
        errors: errors.array(),
      });
    } else {
      const updatedItem = await Item.findByIdAndUpdate(req.params.id, item, {});
      res.redirect(updatedItem.url);
    }
  }),
];
