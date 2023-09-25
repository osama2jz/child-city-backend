import order from "../models/model.order.js";

//get sales stats with mongo
export const viewSales = async (req, res) => {
  const endDate = new Date();

  const oneMonth = 30 * 24 * 60 * 60 * 1000;
  const startDate = new Date(new Date().getTime() - oneMonth);

  try {
    const stats = await order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $unwind: "$product",
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: { $toDate: "$createdAt" },
              },
            },
            category: "$product.product.category.title", // Group by productCategory
          },
          totalQuantitySold: { $sum: "$product.quantity" }, // Calculate total quantity sold
        },
      },
      {
        $sort: {
          "_id.date": 1,
        },
      },
    ]);

    const transformedData = {};

    // Loop through the given data to organize it by category
    stats.forEach((item) => {
      const category = item._id.category;
      const date = item._id.date;
      const quantitySold = item.totalQuantitySold;

      if (!transformedData[category]) {
        transformedData[category] = {
          name: category,
          data: [],
        };
      }

      transformedData[category].data.push(quantitySold);

      // Collect unique dates
      if (!transformedData.Dates) {
        transformedData.Dates = [];
      }
      if (!transformedData.Dates.includes(date)) {
        transformedData.Dates.push(date);
      }
    });

    // Convert the unique dates to the desired format
    transformedData.Dates = transformedData.Dates.map((date) => {
      return new Date(date).toLocaleDateString("en-US", { timeZone: "GMT" });
    });
    let dates = transformedData.Dates;
    delete transformedData.Dates;
    // Create a result object with separate arrays for Dates and other data
    const result = {
      dates: dates,
      data: Object.values(transformedData),
    };
    return res.json({
      message: "Stats fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get revenue stats with mongo
export const viewRevenue = async (req, res) => {
  const endDate = new Date();

  const oneMonth = 30 * 24 * 60 * 60 * 1000;
  const startDate = new Date(new Date().getTime() - oneMonth);

  try {
    const stats = await order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $unwind: "$product",
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: { $toDate: "$createdAt" },
              },
            },
            category: "$product.product.category.title", // Group by productCategory
          },
          revenue: { $sum: "$product.product.price" }, // Calculate total quantity sold
        },
      },
      {
        $sort: {
          "_id.date": 1,
        },
      },
    ]);

    const transformedData = {};

    // Loop through the given data to organize it by category
    stats.forEach((item) => {
      const category = item._id.category;
      const date = item._id.date;
      const revenue = item.revenue;

      if (!transformedData[category]) {
        transformedData[category] = {
          name: category,
          data: [],
        };
      }

      transformedData[category].data.push(revenue);

      // Collect unique dates
      if (!transformedData.Dates) {
        transformedData.Dates = [];
      }
      if (!transformedData.Dates.includes(date)) {
        transformedData.Dates.push(date);
      }
    });

    // Convert the unique dates to the desired format
    transformedData.Dates = transformedData.Dates.map((date) => {
      return new Date(date).toLocaleDateString("en-US", { timeZone: "GMT" });
    });
    let dates = transformedData.Dates;
    delete transformedData.Dates;
    // Create a result object with separate arrays for Dates and other data
    const result = {
      dates: dates,
      data: Object.values(transformedData),
    };
    return res.json({
      message: "Stats fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get top selling stats with mongo
export const viewTopSelling = async (req, res) => {
  const endDate = new Date();

  const oneMonth = 30 * 24 * 60 * 60 * 1000;
  const startDate = new Date(new Date().getTime() - oneMonth);

  try {
    const stats = await order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $unwind: "$product",
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: { $toDate: "$createdAt" },
              },
            },
            category: "$product.product.title", // Group by productCategory
          },
          revenue: { $sum: "$product.product.price" }, // Calculate total quantity sold
        },
      },
      {
        $sort: {
          "_id.date": 1,
        },
      },
    ]);

    const transformedData = {};

    // Loop through the given data to organize it by category
    stats.forEach((item) => {
      const category = item._id.category;
      const date = item._id.date;
      const revenue = item.revenue;

      if (!transformedData[category]) {
        transformedData[category] = {
          name: category,
          data: [],
        };
      }

      transformedData[category].data.push(revenue);

      // Collect unique dates
      if (!transformedData.Dates) {
        transformedData.Dates = [];
      }
      if (!transformedData.Dates.includes(date)) {
        transformedData.Dates.push(date);
      }
    });

    // Convert the unique dates to the desired format
    transformedData.Dates = transformedData.Dates.map((date) => {
      return new Date(date).toLocaleDateString("en-US", { timeZone: "GMT" });
    });
    let dates = transformedData.Dates;
    delete transformedData.Dates;
    // Create a result object with separate arrays for Dates and other data
    const result = {
      dates: dates,
      data: Object.values(transformedData),
    };
    return res.json({
      message: "Stats fetched successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
