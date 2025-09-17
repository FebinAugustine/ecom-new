import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // We don't need a unique suffix here as Cloudinary will handle uniqueness.
    // Using the original name is fine for the temporary local storage.
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });
