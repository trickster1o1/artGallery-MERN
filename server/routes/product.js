const express = require("express");
const {
  getProducts,
  postProduct,
  deleteProduct,
  updateProduct,
  productDetail,
  deleteAll,
} = require("../controllers/productController");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Product = require("../models/product");

router.get("/", getProducts);
router.post("/", postProduct);
router.delete("/:id/delete", deleteProduct);
router.patch("/:id", updateProduct);
router.get("/:id", productDetail);
router.delete("/distruct", deleteAll);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

const mongoose = require("mongoose");

router.post("/:id/update", upload.single("file"), async (req, res) => {
//   if (req.file) {
//     console.log(req.file.filename);
//   }
  const { id } = req.params;
  const { price, description, title, image } = req.body;
  let error = "";
  if (!mongoose.Types.ObjectId.isValid(id)) {
    error = "Product not found";
  }
  try {
    const product = await Product.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          price,
          description,
          title,
          image: req.file
            ? process.env.API + "/images/" + req.file.filename
            : image,
        },
      }
    );
    if (!product) {
      error = "Product not found!";
    }
  } catch (error) {
    error = error.message;
  }
  if (error) {
    res.writeHead(301, {
      Location: "http://localhost:3000/admin?update=error",
    });
    res.end();
  } else {
    res.writeHead(301, {
      Location: "http://localhost:3000/admin?update=success",
    });
    res.end();
  }
});

module.exports = router;
