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

const getPages = async () => {
  try {
    return await noteModel.getPages()
  } catch (err) {
    throw err
  }
}


const getPagesSoftDeleted = async () => {
  try {
    return await noteModel.getPagesSoftDeleted()
  } catch (err) {
    throw err
  }
}


const updateNotePage = async (data) => {
  try {
    return await noteModel.updateNotePage(data)
  } catch (err) {
    throw err
  }
}

module.exports = {
  noteServices: {
    createNew,
    getNoteDetail,
    getPages,
    getPagesSoftDeleted,
    updateNotePage
  },
};
