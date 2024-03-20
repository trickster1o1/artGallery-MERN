const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema(
  {
    status: {
      type: String,
      default: "pending",
    },
    total_amount: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    transaction_code: {
      type: String,
      required: true,
    },
    products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
