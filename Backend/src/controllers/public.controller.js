const { getProductDB } = require("../services/admin/product.service");
const { getCategoriesDB, getProductsDB,getProductsbySlugDB, getProductbyCategoriesDB } = require("../services/public.sevice");

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
      error: error.message
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const data = await getProductsDB();
    return res.status(200).json({
      success: true,
      message: "get Products successfully",
      data:data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "something went wrong",
    });
  }
};

const getProductsbySlug=async(req,res)=>{
  const {slug}=req.params;

  try {
  const data=await getProductsbySlugDB({slug});
  if(!data){
    return res.json({
      success:false,
      error:"data not found"
    })
  }

  return res.status(200).json({
    success:true,
    message:"get products details successfully",
    data:data
  })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      error:error.message
    });
  }
}

const getProductbyCategories=async(req,res)=>{
  const {category}=req.params;
  console.log(category,'this category');

  try {
  const data=await getProductbyCategoriesDB(category);
  return res.status(200).json({
    success:true,
    message:"get Products by categories",
    data:data
  })
  } catch (error) {
  console.log(error);
  return res.status(500).json({
    success:false,
    error:error.message
  })
  }
}

module.exports = { getCategories, getProducts, getProductsbySlug,getProductbyCategories };
