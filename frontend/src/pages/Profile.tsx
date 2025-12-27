import { User, Mail, CalendarCheck, MapPin, LogOut, Camera, Zap, ArrowUpRight, Check, Pencil, X, ShieldCheck, Crown, Calendar } from "lucide-react"
import { useState, useEffect } from "react"
import { useProfileStore } from "../store/profileStore";
import {toast} from "react-toastify"
const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { 
    name, setName, email, city, setCity, image, 
    plan, plan_info, plan_start, subscription, created, fetchProfile, updateProfile,setImage 
  } = useProfileStore();

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call - you can swap this with your store.changeProfile()
    const res = await updateProfile();
    toast(res["msg"])
    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
    }, 1500);
  };

  // Helper to parse JSON keys "1", "2", "3" into a list
  const getPlanDetails = (): string[] => {
  if (!plan_info) return [];
  try {
    const data = typeof plan_info === 'string' ? JSON.parse(plan_info) : plan_info;
    // Cast the values to an array of strings
    return Object.values(data) as string[];
  } catch (e) {
    return [];
  }
};
const getAvatarSrc = () => {
  if (avatarPreview) return avatarPreview; // Local blob URL
  if (image && image.trim().length > 0) {
    // If it's a Base64 string, it should already have the 'data:image' prefix
    return image; 
  }
  // Default fallback if everything else is empty
  return `https://api.dicebear.com/7.x/initials/svg?seed=${name}`;
};
  return (
    <div className="w-full h-full p-6 md:p-12 overflow-y-auto scroll-smooth bg-[#050505] text-slate-200">
      <div className="max-w-6xl mx-auto lg:flex lg:items-start lg:justify-center gap-8">
        
        {/* LEFT COLUMN: Identity Card (Design Preserved) */}
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
              <label className={`relative block h-32 w-32 rounded-full border-2 p-1 transition-all duration-500 ${isEditing ? 'border-blue-500 scale-110 cursor-pointer hover:border-blue-400' : 'border-dashed border-white/20'}`}>
                <div className="h-full w-full rounded-full bg-slate-800 border-2 border-white/10 overflow-hidden relative">
                  <img 
                    src={getAvatarSrc()} 
                    alt="Profile" 
                    className="h-full w-full object-cover transition-opacity duration-300" 
                  />
                  {isEditing && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px] animate-in fade-in duration-300 text-center">
                        <Camera size={24} className="text-white mb-1" />
                        <span className="text-[8px] font-bold text-white uppercase">Upload</span>
                       <input 
  type="file" 
  className="hidden" 
  accept="image/*" 
  onChange={(e) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        
        // 1. Update local UI preview (Temporary blob)
        setAvatarPreview(URL.createObjectURL(file));
        
        // 2. Convert to Base64 and save to Zustand Store
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            // IMPORTANT: You must have a setImage function in your zustand store
            setImage(base64); 
        };
        reader.readAsDataURL(file);
    }
  }}
/>
                    </div>
                  )}
                </div>
              </label>
            </div>

            <div className="w-full space-y-4">
              {[
                { icon: <User size={18} />, value: name, label: "Full Name", action: setName },
                { icon: <Mail size={18} />, value: email, label: "Email Address", action: null },
                { icon: <MapPin size={18} />, value: city, label: "city", action: setCity },
                { icon: <CalendarCheck size={18} />, value: created, label: "joined", action: null },
              ].map((field, idx) => (
                <div key={idx} className="relative group/field">
                  <span className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isEditing && field.action ? 'text-blue-400' : 'text-slate-500'}`}>
                    {field.icon}
                  </span>
                  <input 
                    type="text" 
                    readOnly={!isEditing || !field.action}
                    value={field.value || ""} 
                    onChange={(e) => field.action && field.action(e.target.value)}
                    className={`w-full h-12 pl-12 pr-4 transition-all text-sm font-medium rounded-xl outline-none
                        ${isEditing && field.action 
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
                    className="w-full h-12 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-3 mt-2"
                >
                    {loading ? <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Check size={18} /> Save Changes</>}
                </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: REFACTORED SUBSCRIPTION PANEL */}
        <div className="lg:w-[35%] w-full flex flex-col gap-6">
          
          {subscription ? (
            /* CASE 1: USER IS SUBSCRIBED */
            <div className="bg-[#0A0A0A] border border-blue-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Crown size={120} className="text-blue-500" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-600 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                    <Zap size={20} className="text-white fill-current" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight">{plan}</h3>
                    <div className="flex items-center gap-1.5 text-blue-400">
                      <ShieldCheck size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Active Member</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Plan Privileges</p>
                  <div className="grid gap-3">
                    {getPlanDetails().map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                        <div className="mt-1 shrink-0 h-4 w-4 rounded-full bg-blue-500/10 flex items-center justify-center">
                          <Check size={10} className="text-blue-400" />
                        </div>
                        <span className="leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar size={14} />
                    <span className="text-[10px] font-medium tracking-wide">Renews: {plan_start}</span>
                  </div>
                  <button className="text-[10px] font-bold text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-all uppercase">
                    Invoice
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* CASE 2: USER IS NOT SUBSCRIBED */
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600/20 via-blue-600/10 to-transparent border border-indigo-500/20 p-8 group shadow-xl">
              <div className="relative z-10">
                <div className="p-4 bg-indigo-500 w-fit rounded-2xl mb-6 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                  <Zap size={28} className="text-white fill-current" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Professional Suite</h3>
                <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                  Get exclusive access to AI-powered resume building, priority support, and premium templates.
                </p>
                <button className="w-full py-4 bg-white text-black text-sm font-bold rounded-2xl flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all active:scale-[0.98]">
                  Start Subscription <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          )}

          <button className="w-full py-4 text-slate-500 hover:text-red-400 hover:bg-red-500/5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-transparent hover:border-red-500/10 mt-auto">
            <LogOut size={16} /> Logout Securely
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile;