import useAuthStore from "../store/auth.store";

const Sidebar = () => {
  const toggleLogin = useAuthStore((state) => state.toggleLogin);

  return (
    <div>
      <button
        onClick={toggleLogin}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full"
      >
        Login
      </button>
    </div>
  );
};

export default Sidebar;
