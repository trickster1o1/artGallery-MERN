const express = require("express");
const router = express.Router();
const { submitOrder } = require("../controllers/orderController");
const requireAuth = require("../middleware/requreAuth");

router.post("/", requireAuth, submitOrder);


module.exports = router;