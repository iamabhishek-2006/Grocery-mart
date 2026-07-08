import { useContext, useEffect, useState } from "react";
import { authStore } from "../store/auth.store";

export const useAuth = () => {
  const { user, setUser } = useContext(authStore);
  const [loading, setLoading] = useState(true);
  console.log("useAuth user",user);
  console.log("useAuth loading",loading);

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
  return { user, loading };
};
