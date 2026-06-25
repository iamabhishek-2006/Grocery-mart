import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";

const Product = () => {
  const { slug } = useParams();
  const [data, setData] = useState([]);

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
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, []);

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold">Product Details</h1>
        <div className="pt-5">
          <div className="border-dashed border-2 border-red-600 w-full h-20 rounded-xs p-2">
            No select files
          </div>
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
        <div className="flex gap-3 pt-3">
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
        <div className="pt-3">
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

export default Product;
