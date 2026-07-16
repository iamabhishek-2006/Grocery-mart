import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import withAuth from '../components/withAuth';
import ClipLoader from "react-spinners/ClipLoader";

const CODOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading,setLoading]=useState(false);

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
         setLoading(true);
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
      }finally{
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getOrders();
    }, []);
  
    const codOrders = orders.filter((item) => item.paymentMethod === "COD");

      const changeOrderClass = (status) => {
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5">
          <h1 className="font-semibold text-xl">Online Orders</h1>

          <div className="flex gap-4 w-full sm:w-auto">
            <input
              className="w-full sm:w-64 bg-white pr-11 h-10 pl-3 py-2 placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
              placeholder="Search for orders..."
            />
          </div>
        </div>

        <div className="flex justify-center items-center">
          {codOrders.length == 0 && loading && <h1>Loading...</h1>}
        </div>

        {codOrders.length > 0 && (
          <div className=" overflow-x-auto border border-gray-200  rounded-lg shadow-sm h-100">
            <table className="min-w-225 w-full border-collapse">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                    Order No.
                  </th>

                  <th className="px-5 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap">
                    Order Status
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
                    key={order._id}
                    className="hover:bg-gray-200 transition-colors"
                  >
                    <td className="px-5 py-4 border-b text-sm font-mono">
                      #{order._id}
                    </td>

                    <td className="px-5 py-4 border-b">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${changeOrderClass(
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
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">
                          {order.user?.name || "-"}
                        </span>

                        <span className="text-xs text-gray-500 break-all">
                          {order.user?.email || "-"}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 border-b">
                      <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-1"
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
        )}
      </div>
    </Layout>
  );
}

export default withAuth(CODOrders);