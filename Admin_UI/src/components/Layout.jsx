import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import DesktopSidebar from './DesktopSidebar';

const Layout = ({children}) => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <MobileSidebar/>
        <DesktopSidebar/>
        <div className='flex-1 p-3'>{children}</div>
      </div>
    </div>
  );
}

export default Layout;