const { StatusCodes } = require("http-status-codes");
const { noteServices } = require("../services/noteServices");

const createNew = async (req, res, next) => {
  try {
    const createdNote = await noteServices.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createdNote);
  } catch (e) {
    next(e);
  }
};

const getNoteDetail = async (req, res, next) => {
  try {
    const note = await noteServices.getNoteDetail(req.params.id)
    res.status(StatusCodes.OK).json(note)
  } catch (err) {
    next(err)
  }
}

const getPages = async (req, res, next) => {
  try {
    const pages = await noteServices.getPages()
    res.status(StatusCodes.OK).json(pages)
  } catch (err) {
    next(err)
  }
}


const updateNotePage = async (req, res, next) => {
  try {
    const updateNotePage = await noteServices.updateNotePage(req.body)
    res.status(StatusCodes.OK).json(updateNotePage)
  } catch (err) {
    next(err)
  }
}


module.exports = {
  noteController: {
    createNew,
    getNoteDetail,
    getPages,
    updateNotePage
  },
};
