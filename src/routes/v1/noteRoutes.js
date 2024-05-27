const express = require("express");
const { StatusCodes } = require("http-status-codes");

const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: "get" });
  })
  .post((req, res) => {
    res.status(StatusCodes.CREATED).json({message: "post"})
  });

module.exports = {
    noteRoutes: Router
}
