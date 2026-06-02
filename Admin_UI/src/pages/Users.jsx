import React from 'react'
import Layout from '../components/Layout'

const Users = () => {
  return (
    <Layout>

    </Layout>
  );
}

export default Users

// import React from "react";

// const users = [
//   {
//     id: 1,
//     name: "Olivia Bennett",
//     email: "olivia@example.com",
//     role: "Admin",
//     status: "Active",
//     joined: "2024-03-12",
//   },
//   {
//     id: 2,
//     name: "Liam Carter",
//     email: "liam@example.com",
//     role: "Editor",
//     status: "Active",
//     joined: "2024-04-08",
//   },
//   {
//     id: 3,
//     name: "Emma Dawson",
//     email: "emma@example.com",
//     role: "Viewer",
//     status: "Invited",
//     joined: "2024-06-21",
//   },
//   {
//     id: 4,
//     name: "Noah Evans",
//     email: "noah@example.com",
//     role: "Editor",
//     status: "Suspended",
//     joined: "2024-07-15",
//   },
//   {
//     id: 5,
//     name: "Ava Foster",
//     email: "ava@example.com",
//     role: "Admin",
//     status: "Active",
//     joined: "2024-08-30",
//   },
// ];

// const statusColor = {
//   Active: "bg-green-500/20 text-green-400",
//   Invited: "bg-cyan-500/20 text-cyan-400",
//   Suspended: "bg-gray-500/20 text-gray-300",
// };

// const App = () => {
//   return (
//     <div className="min-h-screen bg-[#111827] p-6 text-white">
//       <div className="rounded-xl border border-gray-700 bg-[#1f2937] overflow-hidden">
//         {/* Top Buttons */}
//         <div className="flex gap-3 p-4 border-b border-gray-700">
//           <button className="border border-gray-600 px-4 py-2 rounded-md hover:bg-gray-700">
//             Export CSV
//           </button>

//           <button className="border border-gray-600 px-4 py-2 rounded-md hover:bg-gray-700">
//             Export JSON
//           </button>

//           <button className="border border-gray-600 px-4 py-2 rounded-md hover:bg-gray-700">
//             Print
//           </button>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="border-b border-gray-700">
//               <tr className="text-left">
//                 <th className="p-4">#</th>
//                 <th className="p-4">Name</th>
//                 <th className="p-4">Email</th>
//                 <th className="p-4">Role</th>
//                 <th className="p-4">Status</th>
//                 <th className="p-4">Joined</th>
//               </tr>

//               {/* Search Inputs */}
//               <tr>
//                 <th></th>

//                 <th className="p-2">
//                   <input
//                     type="text"
//                     placeholder="Search Name"
//                     className="w-full rounded-md border border-gray-600 bg-[#374151] px-3 py-2 outline-none"
//                   />
//                 </th>

//                 <th className="p-2">
//                   <input
//                     type="text"
//                     placeholder="Search Email"
//                     className="w-full rounded-md border border-gray-600 bg-[#374151] px-3 py-2 outline-none"
//                   />
//                 </th>

//                 <th className="p-2">
//                   <input
//                     type="text"
//                     placeholder="Role"
//                     className="w-full rounded-md border border-gray-600 bg-[#374151] px-3 py-2 outline-none"
//                   />
//                 </th>

//                 <th className="p-2">
//                   <input
//                     type="text"
//                     placeholder="Status"
//                     className="w-full rounded-md border border-gray-600 bg-[#374151] px-3 py-2 outline-none"
//                   />
//                 </th>

//                 <th></th>
//               </tr>
//             </thead>

//             <tbody>
//               {users.map((user) => (
//                 <tr
//                   key={user.id}
//                   className="border-b border-gray-700 hover:bg-gray-800"
//                 >
//                   <td className="p-4">{user.id}</td>

//                   <td className="p-4">{user.name}</td>

//                   <td className="p-4">{user.email}</td>

//                   <td className="p-4">{user.role}</td>

//                   <td className="p-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[user.status]}`}
//                     >
//                       {user.status}
//                     </span>
//                   </td>

//                   <td className="p-4">{user.joined}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex items-center justify-between border-t border-gray-700 p-4">
//           <div className="flex items-center gap-2">
//             <span>Page Size</span>

//             <select className="bg-[#374151] border border-gray-600 rounded-md px-3 py-2 outline-none">
//               <option>10</option>
//               <option>20</option>
//               <option>50</option>
//             </select>
//           </div>

//           <div className="flex gap-2">
//             <button className="px-4 py-2 rounded-md bg-gray-700">Prev</button>

//             <button className="px-4 py-2 rounded-md bg-blue-600">1</button>

//             <button className="px-4 py-2 rounded-md bg-gray-700">2</button>

//             <button className="px-4 py-2 rounded-md bg-gray-700">Next</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;