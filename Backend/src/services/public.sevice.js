const Category = require("../models/category");
const Images = require("../models/Image");
const Product = require("../models/product");

const getCategoriesDB=async()=>{
    return await Category.find({});
}

const getProductsDB = async () => {
  const products = await Product.find().populate("category");
  const images = await Images.find();

  const result = products.map((product) => {
    const productImages = images.filter((image) => image.product_id.toString() === product._id.toString() );
    return {...product.toObject(),images: productImages,
    };
  });
  return result;
};

const getProductsbySlugDB=async({slug})=>{
    const product=await Product.findOne({slug}).populate("category");
    const images=await Images.find({product_id:product._id});
    return {...product._doc,images}
}

const getProductbyCategoriesDB=async(slug)=>{
    // get categories data
    const cd=await Category.findOne({slug});
    if(!cd){
        return res.json({
            success:false,
            error:"category not found"
        });
    }
    return await Product.find({category:cd._id});
}

module.exports = { getCategoriesDB, getProductsDB, getProductsbySlugDB ,getProductbyCategoriesDB};

