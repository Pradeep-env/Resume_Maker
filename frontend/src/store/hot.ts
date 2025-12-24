import { create } from "zustand";

interface hotty {
    dash: number;
    setDash: (x: number) => void;
   
}

export const hotStore = create<hotty>((set) => ({

  dash: 1,
  setDash: (x: number) => set({ dash: x }),
}));