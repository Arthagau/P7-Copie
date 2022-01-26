const multer = require("multer");
const path = require("path");

const whitelist = ["image/png", "image/jpeg", "image/jpg"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "postImage") cb(null, "./images/posts");
    else if (file.fieldname === "profil_image") cb(null, "./images/profil");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.split(" ").join("_");
    cb(null, Date.now() + name);
  },
});

const fileFilter = (req, file, cb) => {
  if (whitelist.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Format de l'image non compatible`));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
  fileFilter: fileFilter,
});

module.exports = upload;
