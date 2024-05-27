const express = require("express");
const { noteRoutes } = require("./noteRoutes");

const router = express.Router();

router.get("/status", (req, res) => {
  res.status(200).json({ message: "APIs v1" });
});

router.use("/notes", noteRoutes)

module.exports = {
  APIs_V1: router,
};
