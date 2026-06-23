import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

const EditProduct = ({ update,item,categories,id }) => {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <div>
      <h1
        onClick={() => setOpen(true)}
        className="text-blue-700 cursor-pointer"
      >
        Edit
      </h1>
      <Dailog update={update} open={open} close={close} categories={categories} id={id} item={item} />
    </div>
  );
};

const Dailog = ({ update,open, close ,categories , id ,item}) => {
  const [formPrevData,setFormPrevData]=useState({...item,category:item.id});

  const ChangeHandler=(e)=>{
    setFormPrevData({ ...formPrevData, [e.target.name]: e.target.value });
  }

    const updateHandler = async (e) => {
      e.preventDefault();
      try {
        const url = import.meta.env.VITE_SERVER_URL;
        const res = await fetch(`${url}/admin/product/${id}`, {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formPrevData),
        });
        const data = await res.json();
        if (!data.success) {
          alert(data.error);
          return;
        }

        update(id,data.data);
        setFormPrevData({title:"",description:"",price:0,mrp:0,stock:0,category:"" });
        close();
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(()=>{
      setFormPrevData({...item,category:item.id});
    },[item])

  return (
    <div
      className={`${open ? "flex" : "hidden"} fixed inset-0 bg-gray-500/50 z-50 justify-center items-center min-h-screen w-full`}
    >
      {/* headings */}
      <div className="bg-white p-4 space-y-2 rounded-xs ">
        <div className="flex justify-between ">
          <h1 className="font-semibold">Edit Products</h1>
          <X className="cursor-pointer" onClick={close} />
        </div>

        {/* inputs */}

        <div>
          <label className="block">Title</label>
          <input
            name="title"
            value={formPrevData.title}
            onChange={ChangeHandler}
            className="border border-gray-300 w-full p-1 rounded-xs"
            type="text"
            placeholder="enter Title"
          />
        </div>

        <div>
          <label className="block">Description</label>
          <textarea
            name="description"
            value={formPrevData.description}
            onChange={ChangeHandler}
            className="border w-full border-gray-300 p-1 rounded-xs"
            type="text"
            placeholder="enter description"
          />
        </div>

        <div className="flex gap-3">
          <div className="flex-1">
            <label className="">Price</label>
            <input
              name="price"
              value={formPrevData.price}
              onChange={ChangeHandler}
              className="w-full border p-1 border-gray-300 rounded-xs"
              type="text"
              placeholder="enter name"
            />
          </div>
          <div className="flex-1">
            <label>MRP </label>
            <input
              name="mrp"
              value={formPrevData.mrp}
              onChange={ChangeHandler}
              className="w-full border border-gray-300 p-1 rounded-xs"
              type="text"
              placeholder="enter name"
            />
          </div>
        </div>

        <div className=" gap-3">
          <div className="">
            <label className="">Stock</label>
            <input
              name="stock"
              value={formPrevData.stock}
              onChange={ChangeHandler}
              className="w-full border border-gray-300  p-1 rounded-xs"
              type="text"
              placeholder="enter name"
            />
          </div>
        </div>

        <div>
          <label> Category</label>
          <select
            name="category"
            value={formPrevData.category}
            onChange={ChangeHandler}
            className="w-full rounded-xs border text-sm border-gray-300 p-1"
          >
            <option>Select a Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3 py-2">
          <button
            onClick={updateHandler}
            className="bg-blue-600 rounded-lg px-3 py-1 cursor-pointer text-white"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
