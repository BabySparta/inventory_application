const Type = require("../models/type");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");

exports.type_list = asyncHandler(async (req, res, next) => {
  const allTypes = await Type.find({}).exec();

  res.render("lists/type_list", { title: "Type List", typeList: allTypes })
});

exports.type_detail = asyncHandler(async (req, res, next) => {
  const [type, typeItems] = await Promise.all([
    Type.findById(req.params.id).exec(),
    Item.find({ type: req.params.id }).sort({ name: 1 }).exec()
  ])

  if (type === null) {
    const err = new Error("Clothing type not found")
    err.status = 404;
    return next(err);
  }

  res.render("detail/type_detail", { title: type.name, typeItems: typeItems})
});

exports.type_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: type create get");
});

exports.type_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: type create post");
});

exports.type_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: type delete get");
});

exports.type_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: type delete post");
});

exports.type_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: type update get");
});

exports.type_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: type update post");
});