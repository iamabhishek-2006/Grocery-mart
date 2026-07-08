import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import ImageContainer from "../components/ImageContainer";
import { LoaderCircle, X } from "lucide-react";
import withAuth from "../components/withAuth";

const Product = () => {
  const { slug } = useParams();
  const [data, setData] = useState([]);
  const [images,setImages]=useState([]);
  const [imgDeleting, setImgDeleting] = useState(null);
  

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch("http://localhost:9000/admin/product/" + slug, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setData(data.data);
        setImages(data.data.images);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [slug]);

  const handleDeleteImg = async (id) => {
    try {
      setImgDeleting(id);

      const serverUrl = import.meta.env.VITE_SERVER_URL;

      const res = await fetch(`${serverUrl}/admin/product/image/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.error);
        return;
      }

      alert("Image deleted successfully");
      // Remove image from UI
      setImages((prev) => prev.filter((img) => img._id !== id));
    } catch (error) {
      console.log(error);
      alert("Failed to delete image");
    } finally {
      setImgDeleting(null);
    }
  };

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold">Product Details</h1>
        <div className="pt-5">
          <div className="flex gap-2">
            {images?.map((img) => (
              <div key={img._id} className="relative">
                {imgDeleting === img._id && (
                  <div className="absolute inset-0 w-full h-full bg-black/50 flex items-center justify-center ">
                    <LoaderCircle className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}
                <img
                  src={img.image_url}
                  alt=""
                  key={img}
                  className="w-20 h-20 object-cover"
                />
                <X
                  className="absolute top-0 right-2 cursor-pointer"
                  size={20}
                  color="red"
                  onClick={() => handleDeleteImg(img._id)}
                />
              </div>
            ))}
          </div>

          {images?.length < 5 && (
            <ImageContainer productId={data._id} limit={ 5- images.length} />
             )}

          <div className="pt-5">
            <label className="block font-semibold">Title</label>
            <input
              className="w-full border border-gray-300 p-1 rounded-xs focus:outline-none "
              type="text"
              placeholder="enter title"
              value={data.title ?? ""}
              readOnly
            />
          </div>

          <div className="pt-4">
            <label className="block font-semibold">Description</label>
            <textarea
              className="w-full border border-gray-300 p-1 rounded-xs focus:outline-none"
              type="text"
              placeholder="enter title"
              value={data.description ?? ""}
              readOnly
            />
          </div>
        </div>
        <div className="flex gap-3 ">
          <div className="flex-1">
            <label className="font-semibold ">Price</label>
            <input
              className="w-full border p-1 border-gray-300 rounded-xs focus:outline-none"
              type="text"
              placeholder="enter name"
              value={data.price ?? ""}
              readOnly
            />
          </div>
          <div className="flex-1">
            <label className="font-semibold">MRP </label>
            <input
              className="w-full border border-gray-300 p-1 rounded-xs focus:outline-none"
              type="text"
              placeholder="enter name"
              value={data.mrp ?? ""}
              readOnly
            />
          </div>
        </div>
        <div className="">
          <label className="block font-semibold">Category</label>
          <input
            className="w-full border border-gray-300 p-1 rounded-xs focus:outline-none"
            type="text"
            placeholder="enter title"
            value={data.category?.name || ""}
            readOnly
          />
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(Product);
