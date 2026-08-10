import { useState } from "react";
import { useFetch } from "../customhooks/useFetch";
import { Link } from "react-router-dom";
import type { IProducts } from "../types";

const Products = () => {
  const { data: products, loading: ProductLoading } =useFetch<IProducts[]>("http://localhost:9000/products");

  if (ProductLoading) {
    return (
      <div className="flex justify-center items-center min-h-75">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="mt-6 max-w-7xl mx-auto p-2 sm:p-0 ">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
        {products?.map((item: any) => (
          <Link
            key={item._id}
            to={`/product/${item.slug}`}
            className="group bg-white rounded-xl border border-gray-100 shadow-sm transition-all duration-300 overflow-hidden relative flex flex-col justify-between hover:shadow-md cursor-pointer block"
          >
            <div className="relative overflow-hidden bg-gray-50 flex items-center justify-center">
              <img
                src={item.images?.[0]?.image_url}
                alt={item.title}
                className="w-full h-44 object-contain p-2 group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>

            <div className="p-3 flex flex-col grow justify-between">
              <div>
                <h3 className="font-medium text-gray-800 text-sm line-clamp-2 h-10 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 font-medium mt-1">
                  {item.weight || "1 unit"}
                </p>
              </div>

              <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-50">
                <div>
                  <p className="font-bold text-gray-900 text-base">
                    ₹{item.price}
                  </p>
                  <p className="text-xs text-gray-400 line-through">
                    ₹{item.mrp}
                  </p>
                </div>
                <button
                  className="border border-green-600 text-green-700 bg-green-50/50
                       hover:bg-green-600 hover:text-white px-4 py-1.5 rounded-lg text-xs 
                       font-bold transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
                >
                  Add
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;