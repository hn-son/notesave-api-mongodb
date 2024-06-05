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

module.exports = {
  noteController: {
    createNew,
    getNoteDetail
  },
};
