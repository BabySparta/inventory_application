const Type = require("../models/type");
const Item = require("../models/item");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.type_list = asyncHandler(async (req, res, next) => {
  const allTypes = await Type.find({}).exec();

  const typeCounts = {};

  for (const type of allTypes) {
    const count = await Item.countDocuments({ type: type._id }).exec();
    typeCounts[type.name] = count;
  }

  res.render("lists/type_list", {
    title: "Type List",
    allTypes: allTypes,
    typeCounts: typeCounts,  
  });
});

exports.type_detail = asyncHandler(async (req, res, next) => {
  const [type, typeItems] = await Promise.all([
    Type.findById(req.params.id).exec(),
    Item.find({ type: req.params.id }).sort({ name: 1 }).exec(),
  ]);

  if (type === null) {
    const err = new Error("Clothing type not found");
    err.status = 404;
    return next(err);
  }

  res.render("detail/type_detail", {
    title: type.name,
    typeItems: typeItems,
    type: type,
  });
});

exports.type_create_get = asyncHandler(async (req, res, next) => {
  res.render("forms/type_create", { title: "Create clothing type" });
});

exports.type_create_post = [
  body("name", "Type name must be at least 1 character")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const type = new Type({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render("forms/type_create", {
        title: "Create clothing type",
        type: type,
        errors: errors.array(),
      });
      return;
    } else {
      const typeExists = await Type.findOne({ name: req.body.name }).exec();
      if (typeExists) {
        res.redirect(typeExists.url);
      } else {
        await type.save();
        res.redirect(type.url);
      }
    }
  }),
];

exports.type_delete_get = asyncHandler(async (req, res, next) => {
  const [type, typeItems] = await Promise.all([
    Type.findById(req.params.id).exec(),
    Item.find({ type: req.params.id }).exec(),
  ]);

  if (type === null) {
    res.redirect("/inventory/types");
  }
  res.render("forms/type_delete", {
    title: "Delete clothing type",
    type: type,
    typeItems: typeItems,
  });
});

exports.type_delete_post = asyncHandler(async (req, res, next) => {
  const [type, typeItems] = await Promise.all([
    Type.findById(req.params.id).exec(),
    Item.find({ type: req.params.id }).exec(),
  ]);

  if (typeItems.length > 0) {
    res.render("forms/type_delete", {
      title: "Delete clothing type",
      type: type,
      typeItems: typeItems,
    });
    return;
  } else {
    await Type.findByIdAndRemove(req.body.typeid);
    res.redirect("/inventory/types");
  }
});

exports.type_update_get = asyncHandler(async (req, res, next) => {
  const type = Type.findById(req.params.id).exec();

  if (type === null) {
    res.redirect("/inventory/types");
  }

  res.render("forms/type_create", {
    title: "Update clothing type",
    type: type,
  });
});

exports.type_update_post = [
  body("name", "Type name must be at least 1 character")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const type = new Type({ name: req.body.name, _id: req.params.id });

    if (!errors.isEmpty()) {
      res.render("forms/type_create", {
        title: "Update clothing type",
        type: type,
        errors: errors.array(),
      });
      return;
    } else {
      const updatedType = await Type.findByIdAndUpdate(req.params.id, type, {});
      res.redirect(updatedType.url);
    }
  }),
];
