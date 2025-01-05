const { StatusCodes } = require("http-status-codes");
const { noteServices } = require("../services/noteServices");
const ApiError = require("../utils/ApiError");
const { bucket, storageRef } = require("../config/firebase");
const { format } = require("util");
const mime = require("mime-types");

const createNew = async (req, res, next) => {
  try {
    const createdNote = await noteServices.createNew(req.body);
    res.status(StatusCodes.CREATED).json(createdNote);
  } catch (e) {
    next(e);
  }
};

const getNoteDetail = async (req, res, next) => {
  try {
    const note = await noteServices.getNoteDetail(req.params.id);
    res.status(StatusCodes.OK).json(note);
  } catch (err) {
    next(err);
  }
};

const getPages = async (req, res, next) => {
  try {
    const pages = await noteServices.getPages();
    res.status(StatusCodes.OK).json(pages);
  } catch (err) {
    next(err);
  }
};

const updateNotePage = async (req, res, next) => {
  try {
    const updateNotePage = await noteServices.updateNotePage(req.body);
    res.status(StatusCodes.OK).json(updateNotePage);
  } catch (err) {
    next(err);
  }
};

const softDeletePage = async (req, res, next) => {
  try {
    await noteServices.softDeletePage(req.params.id);
    res.status(StatusCodes.OK).send(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

const hardDeletePage = async (req, res, next) => {
  try {
    await noteServices.hardDeletePage(req.params.id);
    res.status(StatusCodes.OK);
  } catch (err) {
    next(err);
  }
};

// upload storage firebase
const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "No File Found");
    }

    const fileName = Buffer.from(req.file.originalname, "latin1").toString(
      "utf8"
    );
    
    const blob = bucket.file(fileName);

    const blobWrite = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobWrite.on("error", (err) => {
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, err);
    });

    blobWrite.on("finish", () => {
      res.status(StatusCodes.OK).json({
        url: format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        ),
        title: fileName,
        size: req.file.size,
        extension: mime.extension(req.file.mimetype),
      });
    });
    blobWrite.end(req.file.buffer);
  } catch (err) {
    next(err);
  }
};

const fetchURL = async (req, res, next) => {
  try {
    console.log(req.params)
  } catch (err) {
    next(err)
  }
}


module.exports = {
  noteController: {
    createNew,
    getNoteDetail,
    getPages,
    updateNotePage,
    softDeletePage,
    hardDeletePage,
    uploadFile,
    fetchURL
  },
};
