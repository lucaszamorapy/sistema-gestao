const multer = require("multer");
const path = require("path");

const createMulterConfig = (isProductUpload = false) => {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const uploadPath = isProductUpload
          ? "./assets/upload/products"
          : "./assets/upload/users";
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        cb(null, Date.now().toString() + path.extname(file.originalname));
      },
      fileFilter: (req, file, cb) => {
        const allowedFormats = ["image/png", "image/jpg", "image/jpeg"];
        const isValidFormat = allowedFormats.includes(file.mimetype);
        if (isValidFormat) {
          return cb(null, true);
        }
        return cb(
          new Error(
            "Formato de imagem inválido, por favor importe nos formatos: .png, .jpg ou .jpeg"
          )
        );
      },
    }),
  });
};

module.exports = createMulterConfig;
