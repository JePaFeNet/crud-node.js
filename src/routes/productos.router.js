const express = require("express");
const router = express.Router();

const path = require("path");
const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // if (path.extname(file.originalname) != ".jpg") {
    //   return cb(new Error("Only image are allowed"));
    // }

    // if (file.mimetype != "image/jpg" && file.mimetype != "image/jpeg") {
    //   return cb(new Error("Only image are allowed"));
    // }

    const fileTypes = /jpeg|jpg|png/;

    const mimetype = fileTypes.test(file.mimetype);

    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    // console.log(mimetype, extname);

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb(new Error("Only image are allowed"), false);
  },
  limits: { fileSize: 1024 * 1024 * 3 }, // 1 Mb
});

const controller = require("../controllers/productos.controller");

router.get("/create", controller.create);
router.post("/", upload.single("image"), controller.store);

router.get("/", controller.index);
router.get("/:id", controller.show);

router.get("/:id/edit", controller.edit);
router.put("/:id", upload.single("image"), controller.update);

router.delete("/:id", controller.destroy);

module.exports = router;
