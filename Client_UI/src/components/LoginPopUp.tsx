import { Link } from "react-router-dom";
import { User, ShoppingBag, LogIn, UserPlus, X } from "lucide-react";
import useAuthStore from "../store/auth.store";

const LoginPopup = () => {
  const isLoginOpen = useAuthStore((state) => state.isLoginOpen);
  const closeLogin = useAuthStore((state) => state.closeLogin);

  if (!isLoginOpen) return null;

  return (
    <div className="fixed top-15 right-3 w-72 bg-white rounded-2xl shadow border border-gray-200 overflow-hidden z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4  text-black">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full  bg-gray-100  flex items-center justify-center">
            <User size={22} />
          </div>

          <div>
            <h2 className="font-semibold">Welcome</h2>
            <p className="text-xs text-black">Login to continue</p>
          </div>
        </div>

        <button onClick={closeLogin}>
          <X size={20} />
        </button>
      </div>

      {/* Menu */}
      <div className="p-4 flex flex-col gap-3">
        <Link
          to="/signIn"
          onClick={closeLogin}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
        >
          <LogIn size={18} />
          Sign In
        </Link>

        <Link
          to="/signUp"
          onClick={closeLogin}
          className="flex items-center justify-center gap-2 border border-green-600 text-green-600 hover:bg-green-50 py-2 rounded-lg transition"
        >
          <UserPlus size={18} />
          Create Account
        </Link>

        <hr />

        <Link
          to="/orders"
          onClick={closeLogin}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition border"
        >
          <ShoppingBag size={20} />
          <span>My Orders</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginPopup;