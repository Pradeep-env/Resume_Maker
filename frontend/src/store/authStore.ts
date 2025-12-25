import { create } from "zustand";
import { persist } from "zustand/middleware";
import apiStack from "../api/apiStack";

interface AuthState {
  name: string;
  email: string;
  password: string;
  isAuthenticated: boolean;
  

  setName: (v: string) => void;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  loginUser: () => Promise<void>;
  signupUser: () => Promise<void>;
  logout: () => void;
 
}

const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      name: "",
      
      
      email: "",
      password: "",
      isAuthenticated: false,
     

      setEmail: (v) => set({ email: v }),
      setPassword: (v) => set({ password: v }),
      setName: (v) => set({ name: v }),
      

      loginUser: async () => {
        const { email, password } = get();
        try {
          
          const res = await apiStack.login({ email, password });

          set({
          
           
            isAuthenticated: true,
            email: "",
            password: ""
          });
          return res.data;
        } catch (err: any) {
          set({
           
            isAuthenticated: false
          });
          return err.response.data;
        }
      },
       checkAuth: async () => {
        try {
          const res = await apiStack.getUser(); // IMPORTANT
          set({ isAuthenticated: res.data.success });
          return res.data;
        } catch (err: any) {
          set({ isAuthenticated: false });
          return err.response.data;
        }
      },
    
      signupUser: async () => {
        const { name, email, password } = get();
        try {
        
          const res = await apiStack.register({ name, email, password });
          set({
           
            isAuthenticated: true,
            email: "",
            password: ""
          });
          return res.data;
        } catch (err: any) {
          set({
           
            isAuthenticated: false
          });
          return err.response.data;
        }
      },
     logout: async () => {
  try {
    // call backend to clear httpOnly cookie
     await apiStack.logout();

    // clear in-memory state
    set({
      isAuthenticated: false,
      email: "",
      password: "",
      
    });
     
    // remove persisted localStorage entry (replace 'auth-store' with your persist name)
    try { localStorage.removeItem("auth-store"); } catch(e) {}
    
    // optional: force checkAuth to run or navigate from component
  } catch (err) {
    // still clear local state even if backend fails
    set({
      isAuthenticated: false,
      email: "",
      password: "",
      
    });
    localStorage.removeItem("auth-store");
  }
}
    }),
    
    {
      name: "auth-store", // localStorage key
      partialize: (state) => ({
        email: state.email,
        password: state.password,
      }),
    }
  )
);

export default useAuth;