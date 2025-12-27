import { create } from "zustand";
import apiStack from "../api/apiStack";

interface ProfileState {
  name: string | " ";
  city: string | " ";
  email: string | " ";
  plan_start: string | " ";
  created: string | " ";
  plan: string | " ";
  plan_info: string ;
  image: string | null;
  subscription: Boolean;
  
  

  fetchProfile: () => Promise<void>;
  setName: (v: string) => void;
  setCity: (v: string) => void;
 
}

export const useProfileStore = create<ProfileState>((set) => ({
  name: " ",
  city: " ",
  email: " ",
  plan_start: " ",
  created: " ",
  plan: " ",
  plan_info: " ",
  image: "",
  subscription: false,
  

  
  setName: (v) => set({ name: v }),
  setCity: (v) => set({ city: v }),

  fetchProfile: async () => {
    try {
      

      const res = await apiStack.profileinfo();
      const data = res.data.data;

      set({
        name: data.name,
        city: data.city,
        plan: data.plan,
        plan_info: data.plan_info,
        plan_start: data.plan_start,
        subscription: data.subscription,
        image: data.image,
        email: data.email,
        created: data.created,
       
      });

    } catch (err: any) {
     return err.response?.data?.msg
    }
  },

  

}));