const express = require("express");
const exitHook = require("async-exit-hook");
const { CONNECT_DB, GET_DB, CLOSE_DB } = require("./config/mongodb");
const { env } = require("./config/environment");
const { APIs_V1 } = require("./routes/v1/index");
const {
  errorHandleMiddleware,
} = require("./middlewares/errorHandleMiddleware");
const cors = require("cors");
const { corsOptions } = require("./config/cors");
const multer = require("multer");

const START_SERVER = () => {
  const app = express();
  const upload = multer({
    storage: multer.memoryStorage()
  })

  app.use(cors(corsOptions));

  app.use(express.json());

  app.use(upload.single("file"));

  app.use("/api/v1", APIs_V1);

  app.use(errorHandleMiddleware);

  app.listen(env.APP_PORT, () => {
    console.log(`3. Server is running on port: ${env.APP_PORT}`);
  });

  exitHook(() => {
    CLOSE_DB();
  });
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
