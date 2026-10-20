const multer = require("multer");

const uploadMiddleware = require("../uploadMiddleware");
const upload = uploadMiddleware("Haileab");


async  function handleImageUpload(req, res, next) {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "Each image must be 5 MB or smaller.",
        });
      }

      if (err.code === "LIMIT_FILE_COUNT" ||
          err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
          message: "You can upload a maximum of 1 images.",
        });
      }

      return res.status(400).json({
        message: err.message,
      });
    }

    if (err) {
      return res.status(400).json({
        message: err.message,
      });
    }

    next();
  });
}
module.exports = {
    handleImageUpload
}