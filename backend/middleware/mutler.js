import mutler from "multer";

const storage = mutler.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = mutler({ storage: storage });
export default upload;
