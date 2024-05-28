const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");

const createNew = async (req, res, next) => {
  const correct = Joi.object().keys({
    id: Joi.string().required().trim().strict(),
    name: Joi.string().required().trim().strict(),
  }).unknown(true);
  try {
    await  correct.validateAsync(req.body)
    next() 
  } catch (e) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(e).message
    });
  }
};

module.exports = {
  noteValidation: {
    createNew: createNew,
  },
};
