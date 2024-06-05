const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { noteValidation } = require("../../validations/noteValidation");
const { noteController } = require("../../controllers/noteController");

const Router = express.Router();

Router.route("/")
  .get(noteController.getPages)
  .post(noteValidation.createNew, noteController.createNew);

Router.route("/:id").get(noteController.getNoteDetail).put(noteController.updateNotePage);

module.exports = {
  noteRoutes: Router,
};
