const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../utils/ApiError");

const createNew = async (req, res, next) => {
  const correct = Joi.object()
    .keys({
      id: Joi.string().required().trim().strict(),
      name: Joi.string().required().trim().strict(),
    })
    .unknown(true);
  try {
    await correct.validateAsync(req.body);
    next();
  } catch (e) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(e).message));
  }
};

module.exports = {
  noteValidation: {
    createNew: createNew,
  },
};
