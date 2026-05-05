const { generateSlug } = require("../../scripts/utils");
const {
  createCategoryDB,
  updateCategoryDB,
  deleteCategoryDB,
  getCategoryDB,
} = require("../../services/admin/category.service");

const getCategory = async (req, res) => {
  try {
    const data = await getCategoryDB();

    if (!data) {
      return res.json({
        success: false,
        error: "category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "get category successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      error: "Name is required",
    });
  }

  const slug = generateSlug(name);

  try {
    const data = await createCategoryDB({ name, slug });
    return res.status(201).json({
      success: true,
      message: "category added successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    if (error.code == 11000) {
      return res.status(409).json({
        success: false,
        error: "categoray already exists",
      });
    }
  }

  return res.status(500).json({
    success: true,
    error: "something went wrong",
  });
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id) {
    return res.json({
      success: false,
      error: "id is required",
    });
  }

  const slug = generateSlug(name);

  try {
    const data = await updateCategoryDB(id, { name, slug });
    return res.status(200).json({
      success: true,
      message: "category updated successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: "category already exists",
      });
    }

    return res.status(500).json({
      success: false,
      error: "something went wrong",
    });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await deleteCategoryDB(id);
    return res.status(200).json({
      success: true,
      message: "category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "something went wrong",
    });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
};
