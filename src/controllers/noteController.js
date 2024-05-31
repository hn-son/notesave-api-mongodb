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

module.exports = {
  noteController: {
    createNew,
  },
};
