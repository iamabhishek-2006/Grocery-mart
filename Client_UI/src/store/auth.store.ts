import {create} from "zustand"

interface AuthStore{

    isLoginOpen:boolean;

    openLogin:()=>void;
    closeLogin:()=>void;
    toggleLogin:()=>void;
}

const useAuthStore = create<AuthStore>((set)=> ({
    isLoginOpen:false,

    openLogin:()=>set({isLoginOpen:true}),

    closeLogin:()=>set({isLoginOpen:false}),

    toggleLogin:()=>set((state)=>({isLoginOpen : !state.isLoginOpen})),
}));

export default useAuthStore;