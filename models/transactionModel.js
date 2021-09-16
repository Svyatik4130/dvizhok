const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
    {
        orderName: { type: String, required: true },
        payerId: { type: String, required: true },
        amount: { type: Number, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);