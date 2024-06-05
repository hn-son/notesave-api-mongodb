const ApiError = require("../utils/ApiError");
const { noteModel } = require("../models/noteModel");
const { StatusCodes } = require("http-status-codes");

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

const getNoteDetail = async (id) => {
  try {
    const note = await noteModel.getNoteDetail(id)
    if (!note) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Note not found")
    }
    return note
  } catch (err) {
    throw err
  }
}

module.exports = {
  noteServices: {
    createNew,
    getNoteDetail
  },
};
