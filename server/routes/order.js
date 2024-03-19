const express = require("express");
const router = express.Router();
const { submitOrder } = require("../controllers/orderController");
const requireAuth = require("../middleware/requreAuth");

router.get("/:id/:user", submitOrder);


module.exports = router;