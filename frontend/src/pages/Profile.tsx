import { User, Mail, Phone, MapPin, Upload, LogOut, Camera, Zap, ArrowUpRight, Check, Pencil, X } from "lucide-react"
import { useState } from "react"

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
    }, 1500);
  };

  return (
    <div className="w-full h-full p-6 md:p-12 overflow-y-auto scroll-smooth bg-[#050505] text-slate-200">
      <div className="max-w-6xl mx-auto lg:flex lg:items-start lg:justify-center gap-8">
        
        {/* LEFT COLUMN: Identity Card */}
        <div className={`lg:w-[45%] w-full bg-[#0A0A0A] border transition-all duration-500 rounded-3xl p-8 mb-8 lg:mb-0 shadow-2xl relative overflow-hidden ${isEditing ? 'border-blue-500/50 ring-1 ring-blue-500/20' : 'border-white/10'}`}>
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 blur-[100px] rounded-full" />
          
          <div className="relative flex flex-col items-center gap-6">
            <div className="w-full flex justify-between items-center mb-2">
                <h1 className="text-xl font-bold tracking-tight text-white">Account Profile</h1>
                <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className={`p-2 rounded-lg transition-all ${isEditing ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-white/5 text-slate-400 hover:text-white'}`}
                >
                    {isEditing ? <X size={18} /> : <Pencil size={18} />}
                </button>
            </div>

            <div className="relative group">
              <div className={`h-32 w-32 rounded-full border-2 p-1 transition-all duration-500 ${isEditing ? 'border-blue-500 scale-110' : 'border-dashed border-white/20'}`}>
                <div className="h-full w-full rounded-full bg-slate-800 border-2 border-white/10 overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Pradeep" alt="Profile" className="h-full w-full object-cover" />
                </div>
              </div>
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full cursor-pointer backdrop-blur-[2px] animate-in fade-in duration-300">
                    <Camera size={24} className="text-white" />
                </div>
              )}
            </div>

            <div className="w-full space-y-4">
              {[
                { icon: <User size={18} />, value: "Pradeep Holagundi", label: "Full Name" },
                { icon: <Mail size={18} />, value: "pradeepkh312@gmail.com", label: "Email Address" },
                { icon: <Phone size={18} />, value: "+91 6363515498", label: "Mobile" },
                { icon: <MapPin size={18} />, value: "Gadag, India", label: "Location" }
              ].map((field, idx) => (
                <div key={idx} className="relative group/field">
                  <span className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isEditing ? 'text-blue-400' : 'text-slate-500'}`}>
                    {field.icon}
                  </span>
                  <input 
                    type="text" 
                    readOnly={!isEditing}
                    defaultValue={field.value}
                    className={`w-full h-12 pl-12 pr-4 transition-all text-sm font-medium rounded-xl outline-none
                        ${isEditing 
                            ? 'bg-blue-500/5 border-blue-500/30 ring-2 ring-blue-500/5 focus:border-blue-400' 
                            : 'bg-white/[0.03] border-white/10 cursor-default'}`}
                  />
                </div>
              ))}
            </div>
            
            {isEditing && (
                <button 
                    onClick={handleSave}
                    disabled={loading}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-3 mt-2 animate-in slide-in-from-bottom-2"
                >
                    {loading ? (
                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <><Check size={18} /> Save Changes</>
                    )}
                </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Management & Subscription (Remains consistent) */}
        <div className="lg:w-[35%] w-full flex flex-col gap-6">
          <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center">
            <div className="p-3 bg-white/5 rounded-2xl mb-3 border border-dashed border-white/20">
              <Upload className="text-slate-400" size={20}/>
            </div>
            <p className="font-semibold text-sm">Resume Management</p>
            <label className="w-full mt-4 py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl cursor-pointer transition-all text-xs font-semibold flex items-center justify-center gap-2">
               <Upload size={14} /> Replace File
               <input type="file" className="hidden" />
            </label>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent border border-indigo-500/20 p-6 group shadow-xl">
            <div className="relative z-10 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-between mb-4">
                <div className="p-2 bg-indigo-500 rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                  <Zap size={18} className="text-white fill-current" />
                </div>
                <span className="hidden lg:block text-[9px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-400/10 px-2 py-1 rounded-full border border-indigo-400/20">
                    8 Days Left
                </span>
              </div>
              <h3 className="text-md font-bold text-white mb-4">Upgrade to Pro</h3>
              <button className="w-full py-3 bg-white text-black text-sm font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all active:scale-95">
                Get Started <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          <button className="w-full py-4 text-red-400/60 hover:text-red-400 hover:bg-red-500/5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-transparent hover:border-red-500/10">
            <LogOut size={16} /> Log Out Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile