// import React from 'react'
// import Navbar from './Navbar'
// import Sidebar from './Sidebar';
// import MobileSidebar from './MobileSidebar';
// import DesktopSidebar from './DesktopSidebar';

// const Layout = ({children}) => {
//   return (
//     <div>
//       <Navbar />
//       <div className="flex">
//         <MobileSidebar/>
//         <DesktopSidebar/>
//         <div className='flex-1 p-3'>{children}</div>
//       </div>
//     </div>
//   );
// }

// export default Layout;

import React from "react";
import Navbar from "./Navbar";
import MobileSidebar from "./MobileSidebar";
import DesktopSidebar from "./DesktopSidebar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      <Navbar />

      <div className="flex w-full">
        {/* Mobile Sidebar */}
        <MobileSidebar />

        {/* Desktop Sidebar */}
        <DesktopSidebar />

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-3 md:p-5 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;