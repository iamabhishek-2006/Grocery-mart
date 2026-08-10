import { Mic, Search, ShoppingCart } from "lucide-react";
import Sidebar from "./Sidebar";

const Navbar = () => {

  return (
    <nav className="border-b border-gray-300  sticky top-0 w-full z-50 bg-white ">
      <div className="max-w-7xl  mx-auto px-4 h-16 flex items-center justify-between ">
        <a href="/" className="text-xl sm:text-2xl md:text-2xl font-bold">
          <span className="text-green-600">Grocery</span>
          <span className="text-gray-800">Mart</span>
        </a>

        {/* Desktop Search */}
        <div className="hidden  sm:flex flex-1 max-w-xl mx-8 relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />

          <input
            type="text"
            placeholder="Search vegetables, fruits, groceries..."
            className="w-full border rounded-xl py-2 pl-12 pr-12 outline-none focus:border-green-600"
          />

          <Mic
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <ShoppingCart className="h-7 w-7 cursor-pointer" />
          <Sidebar />
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3 ">
        <div className="relative ">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />

          <input
            type="text"
            placeholder='Search "Paneer"'
            className=" w-full border rounded-xl py-2 pl-12 pr-12 outline-none  "
          />

          <Mic
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 border-l "
            size={20}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


