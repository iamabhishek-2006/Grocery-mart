const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadImage = (buffer, productId) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `Grocery-mart/${productId}/images`,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// Delete Single Image
const deleteImage = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// delete complete folder

const deletefolder = async (folderPath) => {
  try {
    // delete all images inside folder

    await cloudinary.api.delete_resources_by_prefix(folderPath);

    // delete folder

    await cloudinary.api.delete_folder(folderPath);

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
};

// const deletefolder = async (folderPath) => {
//   try {
//     await cloudinary.api.delete_resources_by_prefix(folderPath);
//     await cloudinary.api.delete_folder(folderPath);

//     return { success: true };
//   } catch (error) {
//     // Folder exist nahi karta
//     if (error.http_code === 404) {
//       return { success: true };
//     }

//     console.log(error);

//     return {
//       success: false,
//       error: error.message,
//     };
//   }
// };

module.exports = { uploadImage, deleteImage, deletefolder };
