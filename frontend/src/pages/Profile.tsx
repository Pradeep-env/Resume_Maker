import { User, Mail, Phone, MapPin, Upload, LogOut, Camera, Zap, CheckCircle2, ArrowUpRight } from "lucide-react"


const Profile = () => {
  return (
    <div className="w-full h-full p-6 md:p-12 overflow-y-auto scroll-smooth bg-[#050505] text-slate-200">
      <div className="max-w-6xl mx-auto lg:flex lg:items-start lg:justify-center gap-8">
        
        {/* LEFT COLUMN: Identity Card */}
        <div className="lg:w-[45%] w-full bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 mb-8 lg:mb-0 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 blur-[100px] rounded-full" />
          
          <div className="relative flex flex-col items-center gap-6">
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-2">
              Account Profile
            </h1>

            <div className="relative group cursor-pointer">
              <div className="h-32 w-32 rounded-full border-2 border-dashed border-blue-500/50 p-1 group-hover:rotate-180 transition-transform duration-700">
                <div className="h-full w-full rounded-full bg-slate-800 border-2 border-white/10 overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Pradeep" alt="Profile" className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full border-4 border-[#0A0A0A] text-white shadow-lg group-hover:scale-110 transition-transform">
                <Camera size={16} />
              </div>
            </div>

            <div className="w-full space-y-4 mt-4">
              {[
                { icon: <User size={18} />, value: "Pradeep Holagundi", label: "Full Name" },
                { icon: <Mail size={18} />, value: "pradeepkh312@gmail.com", label: "Email Address" },
                { icon: <Phone size={18} />, value: "+91 6363515498", label: "Mobile" },
                { icon: <MapPin size={18} />, value: "Gadag, India", label: "Location" }
              ].map((field, idx) => (
                <div key={idx} className="relative group/field">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/field:text-blue-500 transition-colors">
                    {field.icon}
                  </span>
                  <input 
                    type="text" 
                    readOnly 
                    value={field.value}
                    className="w-full h-12 pl-12 pr-4 bg-white/[0.03] border border-white/10 rounded-xl outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-medium"
                  />
                </div>
              ))}
            </div>
            
            <button className="w-full h-12 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-3 mt-2">
              Update Profile
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Management & Subscription */}
        <div className="lg:w-[35%] w-full flex flex-col gap-6">
          
          {/* Resume Upload Box */}
          <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center">
            <div className="p-3 bg-white/5 rounded-2xl mb-3 border border-dashed border-white/20">
              <Upload className="text-slate-400" size={20}/>
            </div>
            <p className="font-semibold text-sm">Resume Management</p>
            <p className="text-[10px] text-slate-500 mb-4 uppercase tracking-wider">PDF, DOCX (Max 5MB)</p>
            
            <label className="w-full py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl cursor-pointer transition-all text-xs font-semibold flex items-center justify-center gap-2">
               <Upload size={14} /> Replace File
               <input type="file" className="hidden" />
            </label>
          </div>

          {/* INTEGRATED SUBSCRIPTION CARD */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent border border-indigo-500/20 p-6 group shadow-xl">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-indigo-500/20 blur-[50px] rounded-full" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-indigo-500 rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                  <Zap size={18} className="text-white fill-current" />
                </div>
                <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.2em] bg-indigo-400/10 px-2 py-1 rounded-full border border-indigo-400/20">
                    8 Days Left
                </span>
              </div>

              <h3 className="text-md font-bold text-white mb-1">Upgrade to Pro</h3>
              <div className="space-y-2 mb-6">
                {['Unlimited Exports', 'AI Assistant'].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-[11px] text-slate-400">
                    <CheckCircle2 size={12} className="text-indigo-400" />
                    {feature}
                  </div>
                ))}
              </div>

              <button className="w-full py-3 bg-white text-black text-sm font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all group/btn active:scale-95">
                Get Started
                <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Log Out at the very bottom */}
          <button className="w-full py-4 text-red-400/60 hover:text-red-400 hover:bg-red-500/5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-transparent hover:border-red-500/10">
            <LogOut size={16} /> Log Out Account
          </button>

        </div>
      </div>
    </div>
  )
}

export default Profile