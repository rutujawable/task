
import Transaction from "../models/Transaction.js";

const getBarchart = async(req,res)=>{

    
   
        try {
          const { month } = req.query;
      
          
          if (!month) {
            return res.status(400).json({ error: "The 'month' parameter is required." });
          }
      
         
          const paddedMonth = month.toString().padStart(2, "0");
      
         
          const priceRanges = await Transaction.aggregate([
            {
              $match: {
                $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
              },
            },
            {
              $bucket: {
                groupBy: "$price",
                boundaries: [0, 101, 201, 301, 401, 501, 601, 701, 801, 901, Infinity],
                default: "Other",
                output: { count: { $sum: 1 } },
              },
            },
          ]);
      
          res.status(200).json(priceRanges);
        } catch (error) {
          console.error("Error generating bar chart data:", error);
          res.status(500).json({ error: "Failed to generate bar chart data." });
        }
      };
      
      
      
    

    export default getBarchart