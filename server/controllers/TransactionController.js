import Transaction from "../models/Transaction.js";
import bodyParser from "body-parser";

const getTransactions =  async (req, res) => {
    const { page = 1, perPage = 10, search = "", month } = req.query;
    const start = (page - 1) * perPage;
    const regex = new RegExp(search, "i");
  
    try {
      const filters = [];
  
      
      filters.push({
        $expr: {
          $eq: [{ $month: "$dateOfSale" }, parseInt(month)], 
        },
      });
  
     
      if (search) {
        const searchFilters = [
          { title: regex }, 
          { description: regex }, 
        ];
  
        // Only match `price` if the search value is a valid number
        const searchNumber = parseFloat(search);
        if (!isNaN(searchNumber)) {
          searchFilters.push({ price: searchNumber }); 
        }
  
        filters.push({ $or: searchFilters });
      }
  
      // Combine filters
      const filter = filters.length ? { $and: filters } : {};
  
      // Fetch transactions with pagination
      const transactions = await Transaction.find(filter)
        .skip(start)
        .limit(parseInt(perPage));
      res.status(200).json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Failed to fetch transactions" });
    }
  };
  


export default getTransactions;