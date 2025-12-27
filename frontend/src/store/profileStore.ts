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
  updateProfile: () => Promise<any>;
  setName: (v: string) => void;
  setCity: (v: string) => void;
  setImage: (v: string) => void;
 
}

export const useProfileStore = create<ProfileState>((set, get) => ({
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
  setImage: (v) => set({ image: v }),

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

  updateProfile: async () => {
    const { name, city, image } = get();
    try {
      const res = await apiStack.profileupdate({"name": name, "city": city, "image": image});
      return res.data;
    } catch (err: any) {
      return err.response?.data;
    }
  },

}));