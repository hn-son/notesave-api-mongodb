const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { noteValidation } = require("../../validations/noteValidation");
const { noteController } = require("../../controllers/noteController");

const Router = express.Router();

Router.route("/")
  .get(noteController.getPages)
  .post(noteValidation.createNew, noteController.createNew)
  .put(noteController.updateNotePage);

Router.route("/:id")
  .put(noteController.softDeletePage)
  .delete(noteController.hardDeletePage);

module.exports = {
  noteRoutes: Router,
};
