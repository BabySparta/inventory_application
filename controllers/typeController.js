const Type = require("../models/type");
const asyncHandler = require("express-async-handler");

exports.type_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: type list");
});

exports.type_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: type detail: ${req.params.id}`);
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