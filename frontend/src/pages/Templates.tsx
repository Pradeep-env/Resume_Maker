import { useState, useEffect } from "react"
import { Search, Sparkles } from "lucide-react"

const Templates = () => {
    const [item, Sitem] = useState(1);
    const [loading, setLoading] = useState(true); // Added for Skeleton demo
   
    // Simulate a loading state for 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const changeItem = (x: number) => { Sitem(x) }
    const items = ["Manager", "HR", "Developer", "Designer", "Sales", "Accountant", "Secretary", "Receptionist", "Teacher", "Engineer"]

  return (
    <div className="w-full h-full p-6 md:p-12 overflow-y-auto scroll-smooth bg-[#050505] text-slate-200">
        
        <div className="text-center mb-10">
            <h1 className="text-2xl lg:text-4xl font-bold tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                Most viewed templates
            </h1>
            <p className="text-slate-500 mt-2 text-sm lg:text-base">Hand-picked styles used by industry leaders</p>
        </div>

        {/* Horizontal Card Scroll with Hover Zoom & Skeleton */}
        <div className="w-full h-[40vh] md:h-[48vh] flex gap-8 overflow-x-auto pb-10 xl:w-[85%] mx-auto no-scrollbar snap-x px-4">
           {[1, 2, 3, 4, 5].map((i) => (
             loading ? (
                /* LOADING SKELETON STATE */
                <div key={i} className="h-full min-w-[260px] md:min-w-[320px] flex-shrink-0 rounded-2xl bg-white/5 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                    <div className="h-2/3 w-full bg-white/5" />
                    <div className="p-5 space-y-3">
                        <div className="h-4 w-3/4 bg-white/10 rounded-md" />
                        <div className="h-3 w-1/2 bg-white/10 rounded-md" />
                    </div>
                </div>
             ) : (
                /* ACTUAL CARD WITH HOVER ZOOM */
                <div key={i} className="h-full min-w-[260px] md:min-w-[320px] flex-shrink-0 rounded-2xl border border-white/10 bg-[#0A0A0A] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group cursor-pointer snap-center relative overflow-hidden hover:scale-[1.03] hover:border-blue-500/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(37,99,235,0.1)]">
                    <div className="absolute top-4 right-4 p-2 bg-blue-500/10 rounded-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300">
                        <Sparkles size={16} className="text-blue-400" />
                    </div>
                    {/* Visual Preview Area */}
                    <div className="h-2/3 w-full bg-[#111] group-hover:bg-[#161616] transition-colors overflow-hidden">
                         <div className="w-full h-full bg-gradient-to-br from-blue-600/10 to-transparent opacity-50" />
                    </div>
                    <div className="p-5">
                        <h3 className="font-semibold text-lg group-hover:text-blue-400 transition-colors">Professional {i}</h3>
                        <p className="text-slate-500 text-sm">Used by 1.2k+ users</p>
                    </div>
                </div>
             )
           ))}
        </div>

        {/* Search Section */}
        <div className="xl:w-[60%] lg:w-[80%] mx-auto mt-12 text-center">
            <div className="inline-flex p-1 bg-white/5 border border-white/10 rounded-2xl mb-8">
                {[{ id: 1, label: "Resume" }, { id: 2, label: "Letter" }, { id: 3, label: "Email" }].map((type) => (
                    <button
                        key={type.id}
                        onClick={() => changeItem(type.id)}
                        className={`px-8 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                            item === type.id ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]" : "text-slate-400 hover:text-white"
                        }`}
                    >
                        {type.label}
                    </button>
                ))}
            </div>

            <div className="relative group max-w-2xl mx-auto">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input 
                    type="text" 
                    className="w-full h-16 pl-14 pr-6 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all text-lg placeholder:text-slate-600" 
                    placeholder={`Search "${items[Math.floor(Math.random() * items.length)]}..."`}
                />
            </div>
        </div>

        {/* Custom Animation Styles (Add to your global CSS if possible, or use Tailwind config) */}
        <style dangerouslySetInnerHTML={{ __html: `
            @keyframes shimmer {
                100% { transform: translateX(100%); }
            }
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />
    </div>
  )
}

export default Templates