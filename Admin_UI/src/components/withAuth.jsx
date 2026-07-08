import {useNavigate} from "react-router-dom"
import { useContext, useEffect } from "react";
import { authStore } from "../store/auth.store";
import { useAuth } from "../hooks/useAuth";

const withAuth=(WrapperComponent)=>(prop)=>{
    const {user,loading}=useAuth();

    console.log("withAuth user:", user);
    console.log("withAuth loading:", loading);

    const navigate=useNavigate();

    useEffect(()=>{
        if(!user && !loading){
            console.log("check the code")
            navigate("/login", { replace: true });
        }
    },[loading,user]);

    if (loading) {
      return <Loading />;
    }

    if (!user) {
      return null;
    }

    return <WrapperComponent {...prop} />;
}

const Loading=()=>{
    return (
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-center text-3xl ">Please wait... </h1>
        </div>
    )
}

export default withAuth;

