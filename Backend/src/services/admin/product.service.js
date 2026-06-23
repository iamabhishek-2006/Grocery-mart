const Product = require("../../models/product")

const createProductDB=async(body,slug)=>{
    const product=await  Product.create({...body,slug:slug});
    console.log(product);
    return await product.populate("category");
}

// const updateProductDB = async (id,body) => {
//   return await Product.findOneAndUpdate(id,body,{new:true});
// };

const updateProductDB = async (id, body) => {
  return await Product.findOneAndUpdate({ _id: id }, body, { returnDocument:"after" });
};

const deleteProductDB=async(id)=>{
  return await Product.findByIdAndDelete(id);
}

const getProductDB=async()=>{
  const productsData=await Product.find().populate("category");
  return productsData;
}

module.exports={createProductDB,updateProductDB,deleteProductDB,getProductDB};