const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/apiError")

const createNew = async (req, res, next) => {
  try {
    console.log(req.body);
    res.status(StatusCodes.CREATED).json({ message: "CREATED" });
  } catch (e) {
    next(e)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //   errors: e.message,
    // });
  }
};

module.exports = {
  noteController: {
    createNew,
  },
};
