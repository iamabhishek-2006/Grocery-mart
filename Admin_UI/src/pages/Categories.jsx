import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useState } from "react";
import { Trash } from "lucide-react";
import NewCategories from "../Dailogs/NewCategories";
import DeleteCategory from "../Dailogs/DeleteCategory";
import EditCategory from "../Dailogs/EditCategory";

const Categories = () => {
  const [categories, setCateogires] = useState([]);

  // add
  const addCategory=(newCategory)=>{
    setCateogires([...categories,newCategory]);
  }

  // delete

  const deleteCategory=(id)=>{
    setCateogires(categories.filter((item)=>item._id !== id));
  }
  
  // update

  const updateCategory=(id,updatedata)=>{
    setCateogires((prev)=>prev.map((item)=>item._id === id ? {...item,...updatedata} : item))
  }


  async function Categories() {
    const url = import.meta.env.VITE_SERVER_URL;
    try {
      const res = await fetch(`${url}/admin/category`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCateogires(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    Categories();
  },[]);

  return (
    <Layout>
      <div className="p-5">
        <div className="flex flex-col  sm:flex-row items-center justify-between gap-4 mb-5">
          <h1 className="font-semibold text-xl">Product Categories</h1>
          <div className="flex gap-4">
            <input
              className="bg-white  pr-11 h-10 pl-3 py-2  placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
              placeholder="Search for categories..."
            />
            <NewCategories add={addCategory} />
          </div>
        </div>

        {/* Responsive Table */}

        <div className="overflow-x-auto border border-gray-400 rounded-lg max-h-110  ">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                  Category Name
                </th>

                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                  Slug
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.map((item) => (
                <tr className=" hover:bg-gray-50" key={item._id}>
                  <td className="px-4 py-3 border-b">{item.name}</td>
                  <td className="px-4 py-3 border-b">{item.slug}</td>
                  <td>
                    <div className="flex  px-4 py-3  gap-2 border-b ">
                      <EditCategory category={categories} id={item._id} name={item.name} edit={updateCategory} />
                      <DeleteCategory deleteD={deleteCategory} id={item._id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
