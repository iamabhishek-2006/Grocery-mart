import { PanelRightClose, PanelRightOpen, ShieldUser } from "lucide-react";
import { UserRoundPlus } from "lucide-react";
import React, { useContext } from "react";
import { appStore } from "../store/app.store";

const Navbar = () => {
  const { sidebar, closeSidebar, openSidebar } = useContext(appStore);

  const handleLogout = async () => {
    try {
      const url=import.meta.env.VITE_SERVER_URL;
      await fetch(`${url}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" bg-white border-b border-gray-300 flex justify-between items-center p-5  select-none h-12.5  ">
      <div className="flex items-center gap-2">
        <div className="sm:hidden cursor-pointer">
          {sidebar ? (
            <PanelRightOpen onClick={closeSidebar} />
          ) : (
            <PanelRightClose onClick={openSidebar} />
          )}
        </div>
        <h1 className="select-none font-bold">Stay Admin</h1>
      </div>
      <div className="flex items-center gap-2">
        <UserRoundPlus />
        <button
          onClick={handleLogout}
          className="bg-red-500 cursor-pointer p-1 text-xs px-2 rounded text-white font-semibold"
        >
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Navbar;


// import {PanelRightClose,PanelRightOpen,ShieldUser,Bell,LogOut} from "lucide-react";
// import React, { useContext } from "react";
// import { appStore } from "../store/app.store";

// const Navbar = () => {
//   const { sidebar, closeSidebar, openSidebar } = useContext(appStore);

//   const handleLogout = async () => {
//     try {
//       const url = import.meta.env.VITE_SERVER_URL;

//       await fetch(`${url}/auth/logout`, {
//         method: "POST",
//         credentials: "include",
//       });

//       window.location.href = "/login";
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <header className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-50">
//       {/* Left */}
//       <div className="flex items-center gap-3">
//         <button className="sm:hidden">
//           {sidebar ? (
//             <PanelRightOpen className="cursor-pointer" onClick={closeSidebar} />
//           ) : (
//             <PanelRightClose className="cursor-pointer" onClick={openSidebar} />
//           )}
//         </button>

//         <div>
//           <h1 className="font-bold text-lg text-slate-800">Stay Admin</h1>
//           <p className="text-[11px] text-slate-500 hidden sm:block">
//             E-Commerce Management
//           </p>
//         </div>
//       </div>

//       {/* Right */}
//       <div className="flex items-center gap-4">
//         {/* Notification */}
//         <div className="relative cursor-pointer">
//           <Bell size={20} />
//           <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500"></span>
//         </div>

//         {/* Admin */}
//         <div className="hidden sm:flex items-center gap-2 border-l pl-4">
//           <ShieldUser size={20} />
//           <div>
//             <p className="text-sm font-medium">Admin</p>
//             <p className="text-xs text-slate-500">Dashboard Access</p>
//           </div>
//         </div>

//         {/* Logout */}
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-2 rounded-md transition cursor-pointer"
//         >
//           <LogOut size={16} />
//           <span className="hidden sm:inline ">Logout</span>
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
