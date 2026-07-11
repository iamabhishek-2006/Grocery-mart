import {useNavigate} from "react-router-dom"
import { useContext, useEffect } from "react";
import { authStore } from "../store/auth.store";

const withAuth=(WrapperComponent)=>(prop)=>{
    const {user,loading}=useContext(authStore);
    const navigate=useNavigate();

    useEffect(()=>{
        if(!user && !loading){
            navigate("/login", { replace: true });
        }
    },[loading,user,navigate]);

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

