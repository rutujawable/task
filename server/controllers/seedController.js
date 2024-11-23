import axios from "axios";
import Transaction from "../models/Transaction.js";

const seedDatabase = async (req, res) => {
    try {
        const { data } = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
        await Transaction.deleteMany({});
        await Transaction.insertMany(data);
        res.status(200).send("Database initialized successfully!");
      } catch (error) {
        res.status(500).send({ error: "Failed to initialize database" });
      }
    };

export default seedDatabase;