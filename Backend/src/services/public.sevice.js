const Category = require("../models/category");
const Product = require("../models/product");

const getCategoriesDB=async()=>{
    return await Category.find({});
}

const getProductsDB=async()=>{
    return await Product.find().populate("category");
}

const getProductsbySlugDB=async({slug})=>{
    const product=await Product.findOne({slug}).populate("category");
    return product;
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

