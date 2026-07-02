const {uploadImage,deleteImage} = require("../../utils/cloudinaryUploads");
const { generateSlug } = require("../../utils/scripts");
const {createProductDB,updateProductDB,deleteProductDB,getProductDB,getProductbySlugDB,addProductImageDB,getImageByIdDB,deleteProductImageDB} = require("../../services/admin/product.service");

const createProduct = async (req, res) => {
  const body = req.body;
  const { title, description, price, mrp, stock, category, weight, image } =
    body;

  if (!body) {
    return res.json({
      success: false,
      error: "all fields are required",
    });
  }

  // if (mrp < price) {
  //   return res.json({
  //     success: false,
  //     error: "MRP should be greater than price",
  //   });
  // }

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

const addProductImagebyMulter = async (req, res) => {
  try {
    const { product_id } = req.body;
    //  Cloudinary Upload 

    const uploadPromises = req.files.map((file) =>
      uploadImage(file.buffer, product_id),
    );

    const result= await Promise.allSettled(uploadPromises);

    const uploadedImages = [];

    result.forEach((result) => {
      if (result.status === "fulfilled") {
        uploadedImages.push({
          image_url: result.value.secure_url,
          public_id: result.value.public_id,
          product_id,
        });
      } else {
        console.log("Upload Failed :", result.reason.message);
      }
    });

    if (uploadedImages.length === 0) {
      return res.status(400).json({
        success: false,
        error: "All image uploads failed",
      });
    }

    //MongoDB 

    const data = await addProductImageDB(uploadedImages);

    return res.status(200).json({
      success: true,
      message: `${uploadedImages.length} images uploaded successfully`,
      data,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const data = await getProductDB();
    if (!data) {
      return res.json({
        success: false,
        error: "data not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "products get successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "something went wrong",
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const { title } = body;

  if (title) {
    body.slug = generateSlug(title);
  }

  try {
    const data = await updateProductDB(id, body);
    return res.status(200).json({
      success: true,
      message: "product updated successfully",
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

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await deleteProductDB(id);
    return res.status(200).json({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "something went wrong",
    });
  }
};

const getProductbySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const data = await getProductbySlugDB({ slug });
    console.log(data);
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProductImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await getImageByIdDB(id);

    if (!image) {
      return res.status(404).json({
        success: false,
        error: "Image not found",
      });
    }

    // Delete from Cloudinary
    const cloudinaryRes = await deleteImage(image.public_id);

    if (!cloudinaryRes.success) {
      return res.status(500).json({
        success: false,
        error: "Cloudinary image delete failed",
      });
    }

    // Delete from Database
    await deleteProductImageDB(id);

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",

    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProductbySlug,
  addProductImagebyMulter,
  deleteProductImage,
};
