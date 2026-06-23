import { X } from "lucide-react";
import React, { useState } from "react";

const NewProducts = ({add, categories }) => {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <div >
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer"
      >
        NewProducts
      </button>
      <Dailog open={open} close={close} categories={categories} add={add} />
    </div>
  );
};

const Dailog = ({ open, close ,categories ,add}) => {
  const [input,setInput]=useState({
    title:"",
    description:"",
    price:0,
    mrp:0,
    stock:0,
    category:""
  });

  const SubmitHandler=(e)=>{
    const eleName=e.target.name;
    const eleValue=e.target.value;
    setInput({...input,[eleName]:eleValue});
  }

    const formHandler = async (e) => {
      e.preventDefault();
      try {
        const url = import.meta.env.VITE_SERVER_URL;
        const res = await fetch(`${url}/admin/product/add`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        });
        const data = await res.json();
        if (!data.success) {
          alert(data.error);
          return;
        }

        add(data.data);
        setInput({title:"",description:"",price:"",mrp:"",stock:"",category:"" });
        close();
      } catch (error) {
        console.log(error);
      }
    };


  return (
    <div
      className={`${open ? "flex" : "hidden"} fixed inset-0 bg-gray-500/50 z-50 justify-center items-center min-h-screen w-full`}
    >
      {/* headings */}
      <div className="bg-white p-4 space-y-2 rounded-xs ">
        <div className="flex justify-between ">
          <h1 className="font-semibold">New Products</h1>
          <X className="cursor-pointer" onClick={close} />
        </div>

        {/* inputs */}

        <div className=" ">
          <label className="block">Title</label>
          <input
            name="title"
            value={input.title}
            onChange={SubmitHandler}
            className="border border-gray-300 w-full p-1 rounded-xs"
            type="text"
            placeholder="enter Title"
          />
        </div>

        <div>
          <label className="block">Description</label>
          <textarea
            name="description"
            value={input.description}
            onChange={SubmitHandler}
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
              value={input.price}
              onChange={SubmitHandler}
              className="w-full border p-1 border-gray-300 rounded-xs"
              type="text"
              placeholder="enter name"
            />
          </div>
          <div className="flex-1">
            <label>MRP </label>
            <input
              name="mrp"
              value={input.mrp}
              onChange={SubmitHandler}
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
              value={input.stock}
              onChange={SubmitHandler}
              className="w-full border border-gray-300  p-1 rounded-xs"
              type="text"
              placeholder="enter name"
            />
          </div>
         
        </div>

        <div>
          <label> Category</label>
          <select name="category" value={input.category} onChange={SubmitHandler} className="w-full rounded-xs border text-sm border-gray-300 p-1">
            <option >Select a Category</option>
            {categories.map((category)=>(
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="mt-3 py-2">
          <button onClick={formHandler} className="bg-blue-600 rounded-lg px-3 py-1 cursor-pointer text-white">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProducts;
