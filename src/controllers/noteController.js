const { StatusCodes } = require("http-status-codes");

const createNew = async (req, res, next) => {
  try {
    console.log(req.body);
    res.status(StatusCodes.CREATED).json({ message: "CREATED" });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: e.message,
    });
  }
};

module.exports = {
  noteController: {
    createNew,
  },
};
