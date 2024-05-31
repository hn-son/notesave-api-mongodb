const { noteModel } = require("../models/noteModel");

const createNew = async (reqBody) => {
  try {
    const newNote = {
      ...reqBody,
    };

    return await noteModel.createNote(newNote);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  noteServices: {
    createNew,
  },
};
