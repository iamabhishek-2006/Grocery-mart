import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const handleChangeStatus=async(id,status)=>{
    try {
    const url=import.meta.env.VITE_SERVER_URL;
    const res = await fetch(`${url}/admin/order/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({orderStatus: status}),
    });
    const data=await res.json();
    if(!data.success){
      alert(data.error || "something went wrong");
      return;
    }
    setOrders((prev)=>prev.map((item)=>{
      if(item._id === id){
        return {...item,orderStatus:status}
      }
      return item;
    }));
    } catch (error) {
      console.log(error);
    }
  }

  const getOrders = async () => {
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const res = await fetch(`${url}/admin/order`, {
        method:"GET",
        credentials: "include",
        headers:{
          "Content-Type":"application/json"
        }
      });
      const data = await res.json();
      setOrders(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const codOrders = orders.filter((item) => item.paymentMethod === "COD");

  const onlineOrders = orders.filter((item) => item.paymentMethod === "Online");

  const changeOrderClass=(status)=>{
      switch (status) {
        case "processing":
          return "bg-gray-500 text-white";
        case "shipped":
          return "bg-blue-400 text-black";
        case "delivered":
          return "bg-green-400 text-green-00";
        case "cancelled":
          return "bg-red-500 text-white";
        default:
          return "bg-gray-200 text-gray-500";
      }
  };

  return (
    <Layout>
      <div className="p-5">
        {/* <div className="flex flex-col  sm:flex-row items-center justify-between gap-4 mb-5">
          <h1 className="font-semibold text-xl">Online Orders</h1>
          <div className="flex gap-4">
            <input
              className="bg-white  pr-11 h-10 pl-3 py-2  placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
              placeholder="Search for orders..."
            />
          </div>
        </div> */}

        {/* Responsive Table */}

        {/* <div className="overflow-x-auto border border-gray-400 rounded-lg h-50  ">
          <table className="min-w-full bg-white ">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                  Order No.
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                  OrderStatus
                </th>

                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                  Amount
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                  User
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {onlineOrders.map((order) => (
                <tr className=" hover:bg-gray-50" key={order._id}>
                  <td className="px-4 py-3 border-b">#{order._id}</td>

                  <td className="px-4 py-3 border-b ">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold leading-5 ${changeOrderClass(
                        order.orderStatus,
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b">{order.totalAmount}</td>
                  <td className="px-4 py-3 border-b text-sm ">
                    <div className="flex flex-col">
                      <span>{order.user.name}</span>
                      <span className="text-gray-600">{order.user.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 border-b">
                    <select
                      defaultValue={order.orderStatus}
                      onChange={(e) =>
                        handleChangeStatus(order._id, e.target.value)
                      }
                    >
                      <option value="processing">processing</option>
                      <option value="shipped">shipped</option>
                      <option value="delivered">delivered</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}

        {/* <div className="flex flex-col  sm:flex-row items-center justify-between gap-4 mb-5 p-2">
          <h1 className="font-semibold text-xl">COD Orders</h1>
        </div> */}

        {/* Responsive Table */}

        {/* <div className="overflow-x-auto border border-gray-400 rounded-lg h-50  ">
          <table className="min-w-full bg-white ">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                  Order No.
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                  OrderStatus
                </th>

                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                  Amount
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                  User
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {codOrders.map((order) => (
                <tr className=" hover:bg-gray-50" key={order._id}>
                  <td className="px-4 py-3 border-b">#{order._id}</td>

                  <td className="px-4 py-3 border-b ">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold leading-5 ${changeOrderClass(
                        order.orderStatus,
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b">{order.totalAmount}</td>
                  <td className="px-4 py-3 border-b text-sm ">
                    <div className="flex flex-col">
                      <span>{order.user.name}</span>
                      <span className="text-gray-600">{order.user.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 border-b">
                    <select
                      defaultValue={order.orderStatus}
                      onChange={(e) =>
                        handleChangeStatus(order._id, e.target.value)
                      }
                    >
                      <option value="processing">processing</option>
                      <option value="shipped">shipped</option>
                      <option value="delivered">delivered</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5">
          <h1 className="font-semibold text-xl">Online Orders</h1>
          <div className="flex gap-4 w-full sm:w-auto">
            <input
              className="w-full sm:w-64 bg-white pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
              placeholder="Search for orders..."
            />
          </div>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="w-full overflow-x-auto border border-gray-200 rounded-lg shadow-sm h-55">
          {/* YAHAN CHANGE KIYA: min-w-[800px] lagaya hai taaki table hamesha readable rahe */}
          <table className="min-w-200 w-full bg-white border-collapse ">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Order No.
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  OrderStatus
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Amount
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  User
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {onlineOrders.map((order) => (
                <tr
                  className="hover:bg-gray-50 transition-colors"
                  key={order._id}
                >
                  {/* font-mono lagane se ID badiya dikhegi */}
                  <td className="px-5 py-4 border-b text-sm font-mono text-gray-600 select-all">
                    #{order._id}
                  </td>

                  <td className="px-5 py-4 border-b">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold leading-5 ${changeOrderClass(
                        order.orderStatus,
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="px-5 py-4 border-b text-sm font-medium text-gray-900">
                    ₹{order.totalAmount}
                  </td>

                  <td className="px-5 py-4 border-b text-sm">
                    <div className="flex flex-col global-user-cell">
                      <span className="font-medium text-gray-800">
                        {order.user.name}
                      </span>
                      <span className="text-xs text-gray-500 break-all max-w-45">
                        {order.user.email}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 border-b">
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
                      defaultValue={order.orderStatus}
                      onChange={(e) =>
                        handleChangeStatus(order._id, e.target.value)
                      }
                    >
                      <option value="processing">processing</option>
                      <option value="shipped">shipped</option>
                      <option value="delivered">delivered</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5">
          <h1 className="font-semibold text-xl p-2">COD Orders</h1>
        
        </div>

        {/* Responsive Table Wrapper */}
        <div className="w-full overflow-x-auto border border-gray-200 rounded-lg shadow-sm h-55">
          {/* YAHAN CHANGE KIYA: min-w-[800px] lagaya hai taaki table hamesha readable rahe */}
          <table className="min-w-200 w-full bg-white border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Order No.
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  OrderStatus
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Amount
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  User
                </th>
                <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {codOrders.map((order) => (
                <tr
                  className="hover:bg-gray-50 transition-colors"
                  key={order._id}
                >
                  {/* font-mono lagane se ID badiya dikhegi */}
                  <td className="px-5 py-4 border-b text-sm font-mono text-gray-600 select-all">
                    #{order._id}
                  </td>

                  <td className="px-5 py-4 border-b">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold leading-5 ${changeOrderClass(
                        order.orderStatus,
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="px-5 py-4 border-b text-sm font-medium text-gray-900">
                    ₹{order.totalAmount}
                  </td>

                  <td className="px-5 py-4 border-b text-sm">
                    <div className="flex flex-col global-user-cell">
                      <span className="font-medium text-gray-800">
                        {order.user.name}
                      </span>
                      <span className="text-xs text-gray-500 break-all max-w-45">
                        {order.user.email}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 border-b">
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
                      defaultValue={order.orderStatus}
                      onChange={(e) =>
                        handleChangeStatus(order._id, e.target.value)
                      }
                    >
                      <option value="processing">processing</option>
                      <option value="shipped">shipped</option>
                      <option value="delivered">delivered</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default Orders