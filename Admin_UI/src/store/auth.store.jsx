import { Cookie } from "lucide-react";
import { createContext, useEffect, useState } from "react";

export const authStore = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading,setLoading]=useState(true);
  console.log("authProvider user",user);
  console.log("authProvider loading",loading);
  
  const handleLogout = async () => {
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      await fetch(`${url}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null)
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };

  return <authStore.Provider value={{user,setUser,handleLogout,loading}} >{children}</authStore.Provider>;
};

export default AuthProvider;