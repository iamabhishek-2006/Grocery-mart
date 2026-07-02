import React, { useState } from "react";
import { Plus, X } from "lucide-react";

const ImageContainer = ({ productId ,limit}) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Select Images
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length === 0) return;

    if (files.length + selectedFiles.length > limit) {
      alert(`You can upload only ${limit} images.`);
      return;
    }

    for (const file of selectedFiles) {
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is larger than 5MB.`);
        return;
      }
    }

    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  // Remove Image
  const removeImage = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  // Upload Images
  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select images.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("product_id", productId);

      files.forEach((file) => {
        formData.append("images", file);
      });

      const serverUrl = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${serverUrl}/admin/product/images`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (!data.success) {
        alert(data.error);
        return;
      }
      alert("Images uploaded successfully");
      setFiles([]);

      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative my-5 p-4 rounded border-2 border-dashed border-gray-400 min-h-20">
      {/* Add Button */}
      <div className="absolute top-2 right-2">
        <label
          htmlFor="fileInput"
          className={`cursor-pointer bg-blue-500 hover:bg-blue-600 text-white rounded p-1 flex items-center ${
            files.length === limit ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <Plus size={14} />
        </label>

        <input
          id="fileInput"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {files.length === 0 && <p className="text-gray-500">No files selected</p>}

      {/* Preview */}

      <div className="flex flex-wrap gap-3 mt-2">
        {files.map((file, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="w-20 h-20 sm:w-20 sm:h-20 rounded object-cover border"
            />

            <button
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 bg-white rounded-full"
            >
              <X size={16} color="red" />
            </button>
          </div>
        ))}
      </div>

      {/* Upload Button */}

      {files.length > 0 && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-blue-900 text-white  px-2 py-1 sm:px-2 sm:py-0 rounded disabled:opacity-50 cursor-pointer "
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageContainer;


