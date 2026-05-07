const { getProductDB } = require("../services/admin/product.service");
const { getCategoriesDB, getProductsDB } = require("../services/public.sevice");

const getCategories = async (req, res) => {
  try {
    const data = await getCategoriesDB();
    return res.status(200).json({
      success: true,
      message: "get categories successfully",
      data:data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "something went wrong",
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const data = await getProductsDB();
    return res.status(200).json({
      success: true,
      message: "get Products successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "something went wrong",
    });
  }
};

module.exports = { getCategories, getProducts };
