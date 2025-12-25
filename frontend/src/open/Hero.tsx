import { Sparkles, Zap, ShieldCheck, Globe, Star } from "lucide-react";

const Hero = () => {
  return (
    <div className="bg-[#050505] text-white selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Abstract Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in">
            <Sparkles size={14} className="text-blue-400" />
            <span className="text-xs font-medium text-slate-300">AI-Powered Resume Builder 2.0</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1]">
            Build a resume that <br /> 
            <span className="bg-gradient-to-b from-blue-400 to-indigo-600 bg-clip-text text-transparent">
              gets you hired.
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl mb-10 leading-relaxed">
            Stop fighting with formatting. Our AI-driven engine crafts professional, 
            ATS-optimized resumes in minutes. Designed for the modern elite.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all hover:scale-105">
              Create My Resume — It's Free
            </button>
            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold text-lg transition-all">
              View Templates
            </button>
          </div>
        </div>
      </section>

      {/* --- TRUSTED BY SECTION --- */}
      <div className="py-10 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-8 font-bold">
            Trusted by Professionals at
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
             {/* Replace with real SVG components for Google, Meta, etc. */}
             <span className="text-xl font-bold tracking-tighter">GOOGLE</span>
             <span className="text-xl font-bold tracking-tighter">META</span>
             <span className="text-xl font-bold tracking-tighter">NETFLIX</span>
             <span className="text-xl font-bold tracking-tighter">AIRBNB</span>
          </div>
        </div>
      </div>

      {/* --- FEATURE BENTO GRID --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Large Card */}
          <div className="md:col-span-2 p-10 rounded-[2.5rem] bg-gradient-to-br from-blue-600/20 to-transparent border border-white/10 relative overflow-hidden group">
            <div className="relative z-10">
              <Zap className="text-blue-400 mb-4" size={32} />
              <h3 className="text-3xl font-bold mb-4">Lightning Fast Generation</h3>
              <p className="text-slate-400 max-w-sm">
                Our proprietary AI engine generates high-impact bullet points tailored to your specific job title in seconds.
              </p>
            </div>
            <div className="absolute right-[-10%] bottom-[-10%] w-64 h-64 bg-blue-500/20 blur-3xl rounded-full transition-transform group-hover:scale-150 duration-700" />
          </div>

          {/* Small Card 1 */}
          <div className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-blue-500/30 transition-colors">
            <ShieldCheck className="text-green-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">ATS Guaranteed</h3>
            <p className="text-slate-500 text-sm">
              Pass every digital gatekeeper. Our layouts are tested against top-tier ATS systems.
            </p>
          </div>

          {/* Small Card 2 */}
          <div className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-blue-500/30 transition-colors">
            <Globe className="text-purple-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Global Standards</h3>
            <p className="text-slate-500 text-sm">
              Multi-language support and regional templates for Europe, US, and Asia.
            </p>
          </div>

          {/* Large Card 2 */}
          <div className="md:col-span-2 p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 relative group overflow-hidden">
             <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                    <Star className="text-yellow-500 mb-4" size={32} />
                    <h3 className="text-3xl font-bold mb-4">Premium Templates</h3>
                    <p className="text-slate-400">
                        Handcrafted by design experts. These aren't just resumes; they are brand identities.
                    </p>
                </div>
                <div className="w-full md:w-1/2 h-40 bg-white/5 rounded-2xl border border-white/10 p-4 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    {/* Placeholder for a mini-resume preview image */}
                    <div className="w-full h-full bg-slate-800 rounded-lg animate-pulse" />
                </div>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Hero;