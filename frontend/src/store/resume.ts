import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// --- Types (Kept your existing interfaces) ---
export interface Basic {
    name: string; email: string; phone: string; location: string;
    summary: string; website: string; github: string; linkedin: string;
}
export interface Experience { title: string; company: string; startDate: string; endDate: string; description: string; }
export interface Education { school: string; degree: string; startDate: string; endDate: string; description: string; }
export interface TechSkill { skill: string; level: string; }
export interface NonTechSkill { skill: string; level: string; }
export interface Project { name: string; description: string; startDate: string; endDate: string; link: string; }
export interface Publication { title: string; topic: string; date: string; link: string; }

// --- Store Interface ---
interface ResumeState {
    basic: Basic;
    experience: Experience[];
    education: Education[];
    techskill: TechSkill[];
    nontechskill: NonTechSkill[];
    project: Project[];
    publication: Publication[];
    
    // Actions (Setters)
    setBasic: (data: Partial<Basic>) => void;
    addExperience: (item: Experience) => void;
    updateExperience: (index: number, item: Experience) => void;
    removeExperience: (index: number) => void;
    resetStore: () => void;
}

const initialData = {
    basic: { name: "", email: "", phone: "", location: "", summary: "", website: "", github: "", linkedin: "" },
    experience: [],
    education: [],
    techskill: [],
    nontechskill: [],
    project: [],
    publication: []
};

export const useResumeStore = create<ResumeState>()(
    persist(
        (set) => ({
            ...initialData,

            // Update Basic Info (Partial allowed for easy typing)
            setBasic: (data) => set((state) => ({ 
                basic: { ...state.basic, ...data } 
            })),

            // Experience Handlers
            addExperience: (item) => set((state) => ({ 
                experience: [...state.experience, item] 
            })),

            updateExperience: (index, item) => set((state) => ({
                experience: state.experience.map((exp, i) => i === index ? item : exp)
            })),

            removeExperience: (index) => set((state) => ({
                experience: state.experience.filter((_, i) => i !== index)
            })),

            // Resetting
            resetStore: () => set(initialData),
        }),
        {
            name: "resume-guest-data", // Unique key in LocalStorage
            storage: createJSONStorage(() => localStorage),
        }
    )
);