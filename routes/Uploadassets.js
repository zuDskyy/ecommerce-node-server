const express = require("express");
const app = express();
const router = express.Router();
const morgan = require("morgan");
const helmet = require("helmet");
const multer = require("multer");
const { verifyTokenAndAdmin } = require("./verifyToken");

app.use(helmet());
app.use(morgan("common"));

const productImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/productassets");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const uploadProductImageStorage = multer({ storage: productImageStorage });

router.post(
  "/productassets",
  verifyTokenAndAdmin,
  uploadProductImageStorage.single("file"),
  async (req, res) => {
    try{
        const filename = req.file.filename;
        return res.status(200).json({filename: filename, message: "Product Image File Uploaded Successfully!"})
    }catch(err){
        return res.status(500).json(err)
    }
  }
);

module.exports = router;