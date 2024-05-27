const MONGODB_URI =
  "mongodb+srv://sonhn258:Binxeko2205@notesave.axb461w.mongodb.net/?retryWrites=true&w=majority&appName=notesave";

const DATABASE_NAME = "notesave";

const { MongoClient, ServerApiVersion } = require("mongodb");

let notesaveDBInstance = null;

const mongoClientInstance = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// connect to mongo altas
const CONNECT_DB = async () => {
  await mongoClientInstance.connect();
  notesaveDBInstance = mongoClientInstance.db(DATABASE_NAME);
};

const GET_DB = () => {
  if (!notesaveDBInstance) {
    throw new Error("Connect DB failed!");
  }
  return notesaveDBInstance;
};

const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}

module.exports = {
  CONNECT_DB,
  GET_DB,
  CLOSE_DB
};
