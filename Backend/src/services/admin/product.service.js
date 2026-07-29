const Images = require("../../models/Image");
const Product = require("../../models/product");
const { deletefolder } = require("../../utils/cloudinaryUploads");

const createProductDB=async(body,slug)=>{
    const product=await  Product.create({...body,slug:slug});
    return await product.populate("category");
}

const updateProductDB = async (id, body) => {
  return await Product.findOneAndUpdate({ _id: id }, body, { returnDocument:"after" });
};

const addProductImageDB = async (images) => {
  const data = await Images.insertMany(images);
  return data;
};

const getImageByIdDB = async (id) => {
  return await Images.findById(id);
};


const deleteProductDB= async (product_id) => {

  // folder path
  const images=await Images.find({product_id});

  if(images.length>0){
    const folderPath=`Grocery-mart/${product_id}`

    // delete Complete folder from cloudinary

    const cloudinaryRes=await deletefolder(folderPath);
    if(!cloudinaryRes.success){
      throw new Error(cloudinaryRes.error);
    }
  }
  // delete Images from Database
  await Images.deleteMany({product_id});

  return await Product.findByIdAndDelete(product_id);
};

const deleteProductImageDB = async (id) => {
  return await Images.findByIdAndDelete(id);
};


const getProductDB=async()=>{
  const productsData=await Product.find().populate("category");
  return productsData;
}

const getProductbySlugDB=async({slug})=>{
  const getProduct=await Product.findOne({slug}).populate("category");
  const images = await Images.find({ product_id: getProduct._id });
  return { ...getProduct._doc, images };
}

module.exports={createProductDB,updateProductDB,deleteProductDB,getProductDB,getProductbySlugDB,addProductImageDB,getImageByIdDB,deleteProductImageDB};