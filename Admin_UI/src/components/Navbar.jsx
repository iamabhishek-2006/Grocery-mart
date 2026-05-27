import { PanelRightClose, PanelRightOpen, ShieldUser } from 'lucide-react';
import { UserRoundPlus } from 'lucide-react';
import React, { useContext } from 'react'
import { appStore } from '../store/app.store';

const Navbar = () => {
  const {sidebar, closeSidebar,openSidebar}=useContext(appStore);

  return (
    <div className=" bg-white border-b border-gray-300 flex justify-between items-center p-3  select-none h-[50px]  ">
      <div className="flex items-center gap-2">
        <div className='sm:hidden cursor-pointer'>
          {sidebar ? <PanelRightOpen onClick={closeSidebar}/> : <PanelRightClose onClick={openSidebar}/> }
        </div>
        <h1 className='select-none font-bold'>Stay Admin</h1>
      </div>
       <div className="flex items-center gap-2">
        <UserRoundPlus />
        <button   className="bg-red-500 cursor-pointer p-1 text-xs px-2 rounded text-white font-semibold">LogOut</button>
        </div>
    </div>
  );
}

export default Navbar