import order from "../models/model.order.js";

//get stats with mongo
export const viewStats = async (req, res) => {
  try {
    const stats = await order.aggregate([
      {
        $unwind: "$product",
      },
      {
        $group: {
          _id: "$product.categoryId", // Group by productCategory
          totalQuantitySold: { $sum: "$product.quantity" }, // Calculate total quantity sold
        },
      },
    ]);
    const result = {
      series: [],
      dates: [], // You can populate this with dates if needed
    };

    for (const category in stats) {
      if (stats.hasOwnProperty(category)) {
        result.series.push({
          name: category,
          data: stats[category],
        });
      }
    }
    return result;
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
