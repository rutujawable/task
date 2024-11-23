import Transaction from "../models/Transaction.js";

const getStatistics = async (req,res)=>{

    
        const { month } = req.query;
      
        try {
          
          const numericMonth = parseInt(month);
      
          
          const totalSoldItems = await Transaction.countDocuments({
            $expr: { $eq: [{ $month: "$dateOfSale" }, numericMonth] }, 
            sold: true,
          });
      
          
          const totalNotSoldItems = await Transaction.countDocuments({
            $expr: { $eq: [{ $month: "$dateOfSale" }, numericMonth] },
            sold: false,
          });
      
          
          const totalSaleAmount = await Transaction.aggregate([
            {
              $match: {
                $expr: { $eq: [{ $month: "$dateOfSale" }, numericMonth] },
                sold: true,
              },
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$price" },
              },
            },
          ]);
      
          res.status(200).json({
            totalSoldItems,
            totalNotSoldItems,
            totalSaleAmount: totalSaleAmount[0]?.total || 0,
          });
        } catch (error) {
          console.error(error);
          res.status(500).send({ error: "Failed to fetch statistics" });
        }
      };
      
  
  export default getStatistics
  







