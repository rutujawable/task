import { Schema,model } from "mongoose";

const TransactionSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    category: String,
    dateOfSale: Date,
    sold: Boolean,
});

const Transaction = model('Transaction', TransactionSchema);

export default Transaction;
