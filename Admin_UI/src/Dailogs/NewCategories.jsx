import { X } from "lucide-react";
import React, { useState } from "react";

const NewCategories = ({add}) => {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg cursor-pointer"
      >
        Add
      </button>
      <Dailog open={open} close={close} add={add} />
    </div>
  );
};

const Dailog = ({ open, close ,add}) => {
  const [categoryData,setCateogyData]=useState("");

  const submitHandler=async(e)=>{
    e.preventDefault();
    try {
    const url=import.meta.env.VITE_SERVER_URL;
    const res=await fetch(`${url}/admin/category/add`,{
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({name:categoryData})
    });
    const data=await res.json();

    if(!data.success){
      alert(data.error);
      return;
    }

    add(data.data);
    setCateogyData("");
    close();
    } catch (error) {
    console.log(error);
    }
  }

  return (
    <div
      className={`${open ? "flex" : "hidden"} fixed inset-0 bg-gray-500/50 z-100  justify-center items-center min-h-screen w-full`}
    >
      <form
        onSubmit={submitHandler}
        className=" bg-white w-120 p-5 mx-8   text-black relative rounded-lg "
      >
        <h1 className="text-center text-2xl text-black font-serif">
          Cateogires
        </h1>

        <button className="absolute top-3 right-4 cursor-pointer">
          <X onClick={close} />
        </button>

        <div className="space-y-2 px-3">
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 font-sans ml-1">
              Name
            </label>
            <input
              value={categoryData}
              onChange={(e) => setCateogyData(e.target.value)}
              className="w-full border-2 border-gray-300 px-4 py-2 rounded-lg  focus:outline-none focus:border-black transition-all duration-200  placeholder:text-gray-400"
              type="text"
              placeholder="enter category name"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={close}
              className="flex-1 rounded-lg border border-gray-300 py-2 font-medium  transition hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1  rounded-lg bg-blue-500  font-medium text-white transition hover:bg-blue-600 cursor-pointer"
            >
              Add Category
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewCategories;
