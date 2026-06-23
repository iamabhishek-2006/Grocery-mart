import { Trash, Trash2, X } from 'lucide-react';
import React, { useState } from 'react'

const DeleteProduct = ({ deleteD, id }) => {

  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <div>
      <Trash
        onClick={() => setOpen(true)}
        className="text-red-600 cursor-pointer"
      />
      <Dialog open={open} close={close} deleteD={deleteD} id={id} />
    </div>
  );
};


const Dialog = ({ open, close, deleteD, id }) => {

  const DeleteProduct = async (e) => {
    e.preventDefault();
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${url}/admin/product/${id}`, {
        method: "DELETE",
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

      deleteD(id);
      close();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`${
        open ? "flex" : "hidden"
      } fixed inset-0 bg-black/50 z-50 justify-center items-center px-4`}
    >
      <div className="bg-white w-full max-w-md rounded-xl p-5 sm:p-6 shadow-lg relative">
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X className='cursor-pointer' size={20} />
        </button>

        <h2 className="text-xl sm:text-2xl font-semibold text-center mt-2">
          Delete Category
        </h2>

        <p className="text-gray-600 text-center mt-2 text-sm sm:text-base">
          Are you sure you want to delete this category?
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={close}
            className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={DeleteProduct}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};



export default DeleteProduct;