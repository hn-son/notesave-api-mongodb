const admin = require("firebase-admin");

var serviceAccount = require("../servicesAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "notesave-fc61e.appspot.com"
});

const bucket = admin.storage().bucket()

module.exports = {
    bucket
}