const express = require("express");
const exitHook = require("async-exit-hook")
const { CONNECT_DB, GET_DB, CLOSE_DB } = require("./config/mongodb");
const {env} = require("./config/environment")

const START_SERVER = () => {
  const app = express();
  const port = 3001;

  app.get("/", async (req, res) => {
    res.send("Heelo");
  });

  app.listen(env.APP_PORT, () => {
    console.log(`3. Server is running on port: ${env.APP_PORT}`);
  });

  exitHook(() => {
    CLOSE_DB()
  })
};


// IIFE
(async () => {
  try {
    console.log("1. Connecting to DB");
    await CONNECT_DB();
    console.log("2. DB Connected!!!");
    START_SERVER();
  } catch (e) {
    console.error(e);
    process.exit(0);
  }
})();

// console.log("1. Connecting to DB");
// CONNECT_DB()
//   .then(() => console.log("2. DB Connected!!!!!"))
//   .then(() => START_SERVER())
//   .catch((e) => {
//     console.error(e);
//     process.exit(0);
//   });
