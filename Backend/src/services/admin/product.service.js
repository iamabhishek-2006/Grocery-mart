const Product = require("../../models/product")

const createProductDB=async(body,slug)=>{
    const product=await  Product.create({...body,slug:slug});
    return await product.populate("category");
}

const updateProductDB = async (id,body) => {
  return await Product.findByIdAndUpdate(id,body,{new:true});
};

const deleteProductDB=async(id)=>{
  return await Product.findByIdAndDelete(id);
}

const getProductDB=async()=>{
  const getData=await Product.find();
  return getData;
}

module.exports={createProductDB,updateProductDB,deleteProductDB,getProductDB};