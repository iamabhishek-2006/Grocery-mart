import { X } from "lucide-react";
import React, { useState } from "react";

const EditCategory = ({category, id, edit,name }) => {
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
      <Dailog category={category} open={open} close={close} id={id} edit={edit} name={name} />
    </div>
  );
};

const Dailog = ({ open, close ,id , edit, name}) => {
  const [editCategory,setEditcateogry]=useState(name || "");

  const submitHandler = async (e) => {
    e.preventDefault(); 
   
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${url}/admin/category/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name:editCategory}),
        });
      const data= await res.json();
      if(!data.success){
        alert(data.error || "something went wrong");
        return;
      }

      edit(id,data.data);
      close();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`${open ? "flex" : "hidden"} fixed inset-0 bg-gray-500/50 z-100  justify-center items-center min-h-screen w-full`}
    >
      <div className=" bg-white w-120 p-5 mx-8   text-black relative rounded-lg ">
        <h1 className="text-center text-2xl text-sky-700 font-serif">
          Edit Cateogires
        </h1>

        <button className="absolute top-3 right-4 cursor-pointer">
          <X onClick={close} />
        </button>

        <form onSubmit={submitHandler} className="space-y-2 px-3">
          <div className="flex flex-col">
            <label className="font-medium text-gray-700 font-sans ml-1">
              Name
            </label>
            <input
              value={editCategory}
              onChange={(e)=>setEditcateogry(e.target.value)}
              className="border-2 border-gray-300 px-4 py-2 rounded-xl focus:outline-none  focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="category name"
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={close}
              className="w-full rounded-xl border border-gray-300 py-2 font-medium text-gray-700 transition hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>

            <button className="w-full rounded-xl bg-blue-500  font-medium text-white transition hover:bg-blue-600 cursor-pointer">
              Edit Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default EditCategory;
