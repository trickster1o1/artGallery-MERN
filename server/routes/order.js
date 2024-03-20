const express = require("express");
const router = express.Router();
const { submitOrder, getOrders, cancelOrder } = require("../controllers/orderController");
const requireAuth = require("../middleware/requreAuth");

router.get("/:id/:user", submitOrder);
router.get("/", requireAuth, getOrders);
router.delete("/:id/cancel", requireAuth, cancelOrder);


module.exports = router;