const express = require("express");
const { noteRoutes } = require("./noteRoutes");
const url = require("url");

const router = express.Router();

router.get("/status", (req, res) => {
  res.status(200).json({ message: "APIs v1" });
});

router.use("/notes", noteRoutes);

router.use("/fetchUrl", (req, res) => {
  const url_parts = url.parse(req.url, true);
  const query = url_parts.query;
  console.log(url_parts)
  console.log(query)
  res.status(200).json({
    "success": 1,
    "link": query.url,
    "meta": {}
  });
});

module.exports = {
  APIs_V1: router,
};
