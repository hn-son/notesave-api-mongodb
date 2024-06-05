const Joi = require("joi");
const { ObjectId } = require("mongodb");
const { GET_DB } = require("../config/mongodb");

const NOTE_COLLECTION_NAME = "notes";
const NOTE_COLLECTION_SCHEMA = Joi.object()
  .keys({
    noteName: Joi.string().required().trim().strict(),
    active: Joi.boolean().default(false),
    _destroy: Joi.boolean().default(false),
  })
  .unknown(true);

const validateData = async (data) => {
  return await NOTE_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};

const createNote = async (data) => {
  try {
    const validData = await validateData(data);
    return await GET_DB().collection(NOTE_COLLECTION_NAME).insertOne(validData);
  } catch (err) {
    throw new Error(err);
  }
};

const getNoteDetail = async (id) => {
  try {
    return await GET_DB()
      .collection(NOTE_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id),
      });
  } catch (err) {
    throw new Error(err);
  }
};

const getPages = async () => {
  try {
    return await GET_DB()
      .collection(NOTE_COLLECTION_NAME)
      .find({ _destroy: false })
      .toArray();
  } catch (err) {
    throw new Error(err);
  }
};

const getPagesSoftDeleted = async () => {
  try {
    return await GET_DB()
      .collection(NOTE_COLLECTION_NAME)
      .find({ _destroy: true });
  } catch (err) {
    throw new Error(err);
  }
};

const updateNotePage = async (data) => {
  try {
    return await GET_DB()
      .collection(NOTE_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: ObjectId.createFromHexString(data._id) },
        { $set: { note: data.note } }
      );
  } catch (err) {
    throw new Error(err);
  }
};

const softDeletePage = async (id) => {
  try {
    return await GET_DB()
      .collection(NOTE_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: ObjectId.createFromHexString(id) },
        { $set: { _destroy: true } }
      );
  } catch (err) {
    throw new Error(err);
  }
};

const hardDeletePage = async (id) => {
  try {
    return await GET_DB()
      .collection(NOTE_COLLECTION_NAME)
      .deleteOne({ _id: ObjectId.createFromHexString(id) });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  noteModel: {
    NOTE_COLLECTION_NAME,
    NOTE_COLLECTION_SCHEMA,
    createNote,
    getNoteDetail,
    getPages,
    updateNotePage,
    softDeletePage,
    hardDeletePage,
    getPagesSoftDeleted,
  },
};
