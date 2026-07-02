import React, { useEffect } from "react";
import Layout from "../components/Layout";
import EditCategory from "../Dailogs/EditCategory";
import DeleteCategory from "../Dailogs/DeleteCategory";
import NewProducts from "../Dailogs/NewProducts";
import { Search } from "lucide-react";
import DeleteProduct from "../Dailogs/DeleteProduct";
import EditProduct from "../Dailogs/EditProduct";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  const addProduct = (newdata) => {
    setProducts([
      ...products,
      { ...newdata, category: categories.find((id) => id._id === newdata.category) },
    ]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((item) => item._id !== id));
  };


  const updateProduct = (id, newproduct) => {
    setProducts(
      products.map((item) => {
        if (item._id === id) {
          return {
            ...item,
            ...newproduct,
            category: categories.find((c) => c._id === newproduct.category),
          };
        }
        return item;
      }),
    );
  };


  async function Products() {
    const url = import.meta.env.VITE_SERVER_URL;
    try {
      const res = await fetch(`${url}/admin/product`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.error || "something went wrong");
        return;
      }
      setProducts(data.data);

      // fetch categories
      const res2 = await fetch("http://localhost:9000/admin/category", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data2 = await res2.json();
      if (!data2.success) {
        alert(data2.error || "somthing went wrong");
        return;
      }
      setCategories(data2.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    Products();
  }, []);

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 ">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
            <p className="text-sm text-gray-500">
              Manage all products from here
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search products..."
                className="w-full sm:w-72 pl-10 pr-4 py-2 bg-white border  border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            <NewProducts add={addProduct} categories={categories} />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm h-100">
          <table className="min-w-full">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Title
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Category
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Stock
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Price
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((item) => (
                <tr
                key={item._id}
                className="border-t hover:bg-gray-50 transition"
                >
                  {/* Product */}
                  <td className="px-5 py-4">
                    <div>
                      <h2 className="font-medium text-gray-900 line-clamp-1">
                        <Link to={`/product/${item.slug}`} >{item?.title}</Link>
                      </h2>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4 text-gray-600">
                    {item.category?.name || "-"}
                  </td>

                  {/* Stock */}
                  <td className="px-5 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.stock > 10
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.stock} Items
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-5 py-4">
                    <div className="flex items-end ">
                      <span className="font-bold  text-sm text-black">
                        ₹{item.price}/
                      </span>

                      <span className="text-sm text-gray-500 line-through">
                        ₹{item.mrp}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex justify-center gap-2">
                      <EditProduct update={updateProduct} item={item} categories={categories} id={item._id} />
                      <DeleteProduct deleteD={deleteProduct} id={item._id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="py-16 text-center">
              <h3 className="text-lg font-medium text-gray-600">
                No Products Found
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Add your first product to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
