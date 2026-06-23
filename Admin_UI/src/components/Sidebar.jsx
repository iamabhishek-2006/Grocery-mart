import { Package, Blocks, List, User, Home } from "lucide-react";
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { appStore } from "../store/app.store";

const Sidebar = () => {
  return (
    <aside className="w-56 bg-white border-r border-slate-200 h-[calc(100vh-56px)]">
      {/* Header */}
      <div className="p-4 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
          Management
        </h2>
      </div>

      {/* Menu */}
      <div className="p-3 flex flex-col gap-1">
        <SidebarLinks icon={Home} link="/" label="Dashboard" />
        <SidebarLinks icon={List} link="/categories" label="Categories" />
        <SidebarLinks icon={Package} link="/products" label="Products" />
        <SidebarLinks icon={Blocks} link="/orders" label="Orders" />
        <SidebarLinks icon={User} link="/users" label="Users" />
      </div>
    </aside>
  );
};

const SidebarLinks = ({ link, label, icon }) => {
  const { closeSidebar } = useContext(appStore);
  const { pathname } = useLocation();

  const Icon = icon;
  const isActive = pathname === link;

  return (
    <Link
      to={link}
      onClick={closeSidebar}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
      ${
        isActive
          ? "bg-slate-100 text-slate-900 font-semibold"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
};

export default Sidebar;