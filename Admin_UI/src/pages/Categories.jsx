import React from 'react'
import Layout from '../components/Layout'

const Categories = () => {
  return (
    <Layout>
      <div className="p-5">
      
        <div className="flex flex-col  sm:flex-row items-center justify-between gap-4 mb-5">
          <h1 className="font-semibold text-xl">Product Categories</h1>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-1 rounded-lg">
            Add
          </button>
        </div>

        {/* Responsive Table */}

        <div className="overflow-x-auto border border-gray-400 rounded-lg max-h-[400px]  ">
          <table className="min-w-full bg-white">
          
            <thead className="bg-gray-100">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                  Category Name
                </th>

                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                  Slug
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              <tr className=" hover:bg-gray-50 ">
                <td className="px-4 py-3">Electronics</td>
                <td className="px-4 py-3">electronics</td>
              </tr>

             
            </tbody>
            
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default Categories