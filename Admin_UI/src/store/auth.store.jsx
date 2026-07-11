import { Cookie } from "lucide-react";
import { createContext, useEffect, useState } from "react";

export const authStore = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      await fetch(`${url}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:9000/admin/user/me", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (!data.success) {
          setUser(null);
          return;
        }
        setUser(data?.data);
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <authStore.Provider value={{ user, setUser, handleLogout, loading }}>
      {children}
    </authStore.Provider>
  );
};

export default AuthProvider;
