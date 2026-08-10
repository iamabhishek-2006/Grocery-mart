import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFetch } from '../customhooks/useFetch';
import ImageContainer from '../components/ImageContainer';
import Layout from '../components/Layout';
import { Loader } from 'lucide-react';
import type { IProducts } from '../types';

const ProductDetails = () => {
  const {slug}=useParams();
  // const { data, loading } = useFetch(`http://localhost:9000/public/product/${slug}`);
  const { data, loading } = useFetch<IProducts>(`http://localhost:9000/product/${slug}`);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader size={40} className="animate-spin " />
      </div>
    );
  }

  if (!data) {
    return <h1>Product Not Found</h1>;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto ">
        <div className="flex flex-col md:flex-row gap-2 mt-10">
          <div className="w-full rounded-lg bg-gray-50 border border-white shadow-sm ">
            <ImageContainer data={data.images} />
          </div>

          <div className="w-full p-2  rounded-lg bg-gray-50">
            <Link
              className="text-blue-500 font-semibold "
              to={`/products/${data.category.slug}`}
            >
              {data.category.name}
            </Link>
            <h1 className="text-3xl font-bold ">{data.title}</h1>
            <div className="mt-2">
              <span className="text-2xl font-semibold text-black">
                ₹{data.price}{" "}
              </span>
              <span className=" line-through text-lg "> ₹{data.mrp}</span>
              <div>
                <span className="font-semibold">⭐⭐⭐⭐⭐ 5+ review</span>
                <h1> <i>inclusive all taxes</i></h1>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold text-lg">About Product</h3>
              <p className="text-gray-600 mt-3 leading-7">{data.description}</p>

              <div className="flex gap-4 mt-10">
                <button className="flex-1 h-10 rounded-lg  bg-[#FF9A00] font-semibold hover:bg-orange-400 cursor-pointer">
                  Add To Cart
                </button>

                <button className="flex-1 h-10 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 cursor-pointer">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetails