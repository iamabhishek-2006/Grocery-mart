import { Package } from 'lucide-react';
import { Blocks } from 'lucide-react';
import { List } from 'lucide-react';
import { User } from 'lucide-react';
import { Home } from 'lucide-react';
import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { appStore } from '../store/app.store';

const Sidebar = () => {
  return (
    <div className="w-[200px] border-r border-gray-300 h-[calc(100vh-50px)] overflow-hidden bg-white">
      <div className="flex flex-col gap-5 p-3">
        <SidebarLinks icon={Home} link="/" label="Home" />
        <SidebarLinks icon={List} link="/categories" label="Categories" />
        <SidebarLinks icon={Package} link="/products" label="Products" />
        <SidebarLinks icon={Blocks} link="/orders" label="Orders" />
        <SidebarLinks icon={User} link="/users" label="Users" />
      </div>
    </div>
  );
}

const SidebarLinks=({link,label,icon})=>{
    const {closeSidebar}=useContext(appStore);
    const {pathname}=useLocation();
    const Icon=icon;

    const isActive = pathname === link;

 return (
      <Link to={link} className={` text-gray-700 flex items-center  gap-2 ${isActive && "text-gray-950 font-semibold" }`} onClick={closeSidebar}>
        <Icon className="w-5 h-5"/> {label}
    </Link>
)
}

export default Sidebar;