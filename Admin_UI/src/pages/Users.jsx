import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [admin,setAdmin]=useState([])

  async function Users() {
    const url = import.meta.env.VITE_SERVER_URL;
    try {
      const res = await fetch(`${url}/admin/user`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if(!data.success){
        alert(data.error || "failed to fetch users");
        return;
      }
      setAdmin(data.data.filter((admin) => admin.role === "admin"));
      setUsers(data.data.filter((user)=>user.role === "user"));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    Users();
  }, []);


  return (
    <Layout>
      {/* admin table */}

      <div className="p-2 overflow-x-hidden">
        <div className="flex flex-col  sm:flex-row items-center justify-between gap-4 mb-5">
          <h1 className="font-semibold text-xl">Admin</h1>
          <div className="flex gap-4">
            <input
              className="bg-white hidden sm:block  pr-11 h-10 pl-3 py-2  placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
              placeholder="Search for Users..."
            />
          </div>
        </div>

        {/* Responsive Table */}

        <div className="overflow-x-auto border border-gray-400 rounded-lg   ">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>

                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                  Role
                </th>
              </tr>
            </thead>

            <tbody>
              {admin.map((data) => (
                <tr className=" hover:bg-gray-50" key={data._id}>
                  <td className="px-4 py-3 ">{data.name}</td>
                  <td className="px-4 py-3 ">{data.email}</td>
                  <td className="px-4 py-3">{data.role}✅</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-2">
        <div className="flex flex-col  sm:flex-row items-center justify-between gap-4 mb-5">
          <h1 className="font-semibold text-xl">Users</h1>
        
        </div>

        {/* Responsive Table */}

        <div className="overflow-hidden border border-gray-400 rounded-lg max-h-110  ">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>

                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                  Role
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((data) => (
                <tr className=" hover:bg-gray-50" key={data._id}>
                  <td className="px-4 py-3 border-b">{data.name}</td>
                  <td className="px-4 py-3 border-b">{data.email}</td>
                  <td className="px-4 py-3 border-b">{data.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
