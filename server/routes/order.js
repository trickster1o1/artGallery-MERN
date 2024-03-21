const express = require("express");
const router = express.Router();
const { submitOrder, getOrders, cancelOrder, checkout } = require("../controllers/orderController");
const requireAuth = require("../middleware/requreAuth");

router.get("/", requireAuth, getOrders);
router.delete("/:id/cancel", requireAuth, cancelOrder);
router.get('/:user/checkout', checkout);
router.get("/:id/:user", submitOrder);


module.exports = router;