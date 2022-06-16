//External Imports
const path = require("path");
const multer = require("multer");

//Custom Imports
const config = require("../configuration");

let upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `${path.resolve()}${config.get("multer.uploadDirectoryPath")}`);
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}.csv`);
        },
    }),
});

// to upload  documents  by employee  from dashboard 
let uploadQuizImage = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            const filetypes = "application/pdf";
            const filetypeImageJpeg = "image/jpeg";
            const filetypeImagePng = "image/png";
            if (filetypes !== file.mimetype && filetypeImageJpeg !== file.mimetype && filetypeImagePng !== file.mimetype) {

                cb("Error: Only pdf and image type file  is required");
            } else {
                console.log("inside multer")

                cb(null, `${path.resolve()}${config.get("multer.uploadQuizImagePath")}`);
            }
        },
        filename: function (req, file, cb) {
            const filetypePdf = "application/pdf";
            const filetypeImageJpeg = "image/jpeg";
            const filetypeImagePng = "image/png";
            let ext = file.mimetype.split("/")[1]
            if (filetypePdf !== file.mimetype && filetypeImageJpeg !== file.mimetype && filetypeImagePng !== file.mimetype) {
                cb("Error:  Hello Only pdf and image type file  is required");
            } else {
                cb(null, `${file.fieldname}.${Date.now()}.${ext}`);
            }
        },
    }),
});
module.exports = {
    upload: upload,
    uploadQuizImage: uploadQuizImage,
};