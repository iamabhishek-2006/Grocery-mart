import React from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { useFetch } from "../customhooks/useFetch";
import { type IProducts } from "../types";
import { Loader } from "lucide-react";

const CategoryProducts = () => {
  const { category } = useParams();
  const { data, loading } = useFetch<IProducts[]>( `http://localhost:9000/products/${category}`);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="animate-spin " size={40} />
      </div>
    );
  }

  return (
    <Layout>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {data?.map((product)=>(
          <div key={product._id} className="border rounded-lg p-2">
            <h2 className="font-semibold text-lg">{product.mrp}</h2>
            <h2 className="text-gray-600 ">{product.description}</h2>
            <h2 className="font-bold mt-2 ">{product.price}</h2>
            <h2 className="text-sm text-gray-500 ">MRP:₹{product.mrp}</h2>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default CategoryProducts;
