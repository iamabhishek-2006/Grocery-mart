const { generateSlug } = require("../../scripts/utils");
const { createProductDB, updateProductDB, deleteProductDB, getProductDB } = require("../../services/admin/product.service");

const createProduct = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.json({
      success: false,
      error: "all fields are required",
      required:["title","description","mrp","stock","category","weight","image"]
    });
  }

  const slug = generateSlug(body.title);

  try {
    const data = await createProductDB(body, slug);
    return res.status(201).json({
      success: true,
      message: "product added successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: "product already exists",
      });
    }

    return res.status(500).json({
      success: false,
      error: "something went wrong",
    });
  }
};

const getProduct=async(req,res)=>{
  try {
  const data=await getProductDB();
  if(!data){
    return res.json({
      success:false,
      error:"sorry data not fetched"
    });
  }
  return res.status(200).json({
    success:true,
    message:"products get successfully",
    data:data
  })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      error:"something went wrong"
    });
  }
}

const updateProduct=async(req,res)=>{
  const {id}=req.params;
  const body=req.body;

  const {title}=body;

  if(title){
    body.slug=generateSlug(title);
  }

    try {
      const data = await updateProductDB(id,body);
      return res.status(200).json({
        success: true,
        message: "product updated successfully",
        data: data,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        error: "something went wrong",
      });
    }
}

const deleteProduct=async(req,res)=>{
    const {id}=req.params;

    try {
    const data=await deleteProductDB(id);
    return res.status(200).json({
      success:true,
      message:"product deleted successfully",
    });
    } catch (error) {
      return res.status(500).json({
        success:false,
        error:"something went wrong"
      });
    }
}


module.exports = { createProduct ,updateProduct,deleteProduct,getProduct};
