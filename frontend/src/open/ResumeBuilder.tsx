import { useState } from "react";
import { 
  User, Briefcase, GraduationCap, Code, 
  Layout, Eye, Download, Sparkles, FolderKanban, Book, Plus, Trash2
} from "lucide-react";
import { useResumeStore } from "../store/resume"; // Adjust path as needed

const ResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState("basics");
  
  // Connect Zustand Store
  const { 
    basic, setBasic, 
    experience, addExperience, removeExperience,
   
  } = useResumeStore();

  const sections = [
    { id: "basics", label: "Basics", icon: <User size={18} />, title: "Personal Details", sub: "How should recruiters reach you?" },
    { id: "experience", label: "Experience", icon: <Briefcase size={18} />, title: "Work History", sub: "Describe your professional journey" },
    { id: "education", label: "Education", icon: <GraduationCap size={18} />, title: "Education", sub: "Your academic background" },
    { id: "skills", label: "Skills", icon: <Code size={18} />, title: "Technical Skills", sub: "What are you an expert in?" },
    { id: "projects", label: "Projects", icon: <FolderKanban size={18} />, title: "Projects", sub: "Showcase your best work" },
    { id: "publications", label: "Publications", icon: <Book size={18} />, title: "Publications", sub: "Articles and Research" },
    { id: "layout", label: "Templates", icon: <Layout size={18} />, title: "Visual Design", sub: "Choose your resume's look" },
  ];

  const currentSectionInfo = sections.find(s => s.id === activeSection);

  return (
    <div className="flex h-[calc(100vh-80px)] w-full bg-[#050505] text-slate-300 overflow-hidden">
      
      {/* 1. SECTION NAVIGATOR */}
      <div className="w-20 lg:w-64 border-r border-white/5 flex flex-col bg-[#080808]">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
            </div>
            <span className="hidden lg:block font-bold text-white tracking-tight">Builder v1.0</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${
                activeSection === s.id 
                ? "bg-blue-600/10 text-blue-400 border border-blue-500/20" 
                : "hover:bg-white/5 text-slate-500"
              }`}
            >
              {s.icon}
              <span className="hidden lg:block font-medium text-sm capitalize">{s.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* 2. ACTIVE EDITOR */}
      <div className="flex-1 flex flex-col bg-[#050505] overflow-y-auto scrollbar-hide">
        <header className="p-8 sticky top-0 bg-[#050505]/80 backdrop-blur-md z-10 flex justify-between items-center border-b border-white/5">
            <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">{currentSectionInfo?.title}</h2>
                <p className="text-sm text-slate-500">{currentSectionInfo?.sub}</p>
            </div>
            <div className="flex gap-2">
                <button className="p-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10"><Eye size={18}/></button>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-white font-bold text-sm transition-all">
                    <Download size={16}/> Export
                </button>
            </div>
        </header>

        <main className="p-8 max-w-2xl mx-auto w-full space-y-8 pb-32">
          {/* DYNAMIC FORM RENDERING */}
          {activeSection === "basics" && (
            <div className="grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="col-span-2 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</label>
                    <input 
                      type="text" 
                      value={basic.name}
                      onChange={(e) => setBasic({ name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-blue-500 outline-none transition-all" 
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</label>
                    <input 
                      type="email" 
                      value={basic.email}
                      onChange={(e) => setBasic({ email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-blue-500 outline-none transition-all" 
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Phone</label>
                    <input 
                      type="text" 
                      value={basic.phone}
                      onChange={(e) => setBasic({ phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-blue-500 outline-none transition-all" 
                    />
                </div>
                <div className="col-span-2 space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Professional Summary</label>
                    <textarea 
                      rows={4}
                      value={basic.summary}
                      onChange={(e) => setBasic({ summary: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-blue-500 outline-none transition-all resize-none" 
                    />
                </div>
            </div>
          )}

          {activeSection === "experience" && (
            <div className="space-y-6">
                {experience.map((exp, idx) => (
                   <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded-2xl relative group">
                       <button 
                         onClick={() => removeExperience(idx)}
                         className="absolute top-4 right-4 text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                       >
                           <Trash2 size={16}/>
                       </button>
                       <h4 className="font-bold text-white">{exp.title || "Position Title"}</h4>
                       <p className="text-sm text-slate-500">{exp.company || "Company Name"}</p>
                   </div>
                ))}
                <button 
                  onClick={() => addExperience({ title: "", company: "", startDate: "", endDate: "", description: "" })}
                  className="w-full py-4 border-2 border-dashed border-white/10 rounded-2xl text-slate-500 hover:border-blue-500/50 hover:text-blue-400 transition-all font-medium flex items-center justify-center gap-2"
                >
                    <Plus size={18}/> Add Experience
                </button>
            </div>
          )}
        </main>
      </div>

      {/* 3. LIVE PREVIEW */}
      <div className="hidden xl:flex w-[45%] bg-[#0A0A0A] border-l border-white/5 items-start justify-center p-12 overflow-y-auto">
        <div className="sticky top-0 w-full">
            <div className="mb-4 flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-slate-600">
                <span>Live Preview</span>
                <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" /> 
                    Ready to Save
                </span>
            </div>
            
            <div className="w-full aspect-[1/1.414] bg-white shadow-2xl shadow-black rounded-sm p-12 origin-top transform scale-[0.95]">
                {/* DYNAMIC PAPER CONTENT */}
                <div className="h-full w-full text-slate-900 font-serif">
                    <h1 className="text-3xl font-bold uppercase tracking-tight text-black">{basic.name || "YOUR NAME"}</h1>
                    <div className="flex gap-4 text-[10px] font-sans text-slate-500 border-b border-slate-200 pb-4 mt-2 mb-6">
                        <span>{basic.email}</span>
                        <span>{basic.phone}</span>
                        <span>{basic.location}</span>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xs font-bold border-b border-slate-900 mb-2 uppercase italic">Professional Summary</h2>
                        <p className="text-[10px] leading-relaxed text-slate-700">{basic.summary || "Summary will appear here..."}</p>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xs font-bold border-b border-slate-900 mb-2 uppercase italic">Experience</h2>
                        {experience.length > 0 ? experience.map((exp, i) => (
                           <div key={i} className="mb-3">
                               <div className="flex justify-between font-bold text-[10px]">
                                   <span>{exp.company}</span>
                                   <span>{exp.startDate} - {exp.endDate}</span>
                               </div>
                               <p className="italic text-[9px]">{exp.title}</p>
                           </div>
                        )) : (
                            <div className="h-20 w-full bg-slate-50 rounded animate-pulse border border-slate-100" />
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;