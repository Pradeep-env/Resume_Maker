import { MenuIcon, Newspaper, User, Paperclip, LayoutDashboard, X } from "lucide-react"
import { useState } from "react"
import { hotStore } from "../store/hot"

const Navbar = () => {
    const userOpt = [
        { name: "Dashboard", link: "#", icon: <LayoutDashboard size={20} />, num: 1 },
        { name: "Templates", link: "#", icon: <Paperclip size={20} />, num: 2 },
        { name: "Articles", link: "#", icon: <Newspaper size={20} />, num: 3 },
        { name: "Profile", link: "#", icon: <User size={20} />, num: 4 },
    ]
    
    const [menu, setMenu] = useState(false);
    const { setDash, dash } = hotStore();

    return (
        <>
            {/* BACKDROP: Lower z-index than Toggle but higher than Page Content */}
            <div 
                className={`fixed inset-0 bg-[#8f96a3] backdrop-blur-[2px] z-[80] transition-opacity duration-300 lg:hidden ${menu ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setMenu(false)}
            />

            <nav className="h-[8vh] w-full flex items-center justify-between px-6 md:px-12 border-b border-white/5 z-[100] sticky top-0 bg-black/80 backdrop-blur-md">
                
                {/* Logo */}
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 group-hover:shadow-[0_0_15px_rgba(52,211,153,0.4)] transition-all">
                        <User className="text-black" size={18} />
                    </div>
                    <p className="font-bold tracking-tight text-white">RESUME<span className="text-green-500">.AI</span></p>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-8 h-full">
                    {userOpt.map((opt) => (
                        <button
                            key={opt.name}
                            onClick={() => setDash(opt.num)}
                            className={`flex items-center gap-2 text-sm font-medium transition-all relative py-2 cursor-pointer ${dash === opt.num ? 'text-green-400' : 'text-slate-400 hover:text-white'}`}
                        >
                            {opt.icon}
                            {opt.name}
                            {dash === opt.num && (
                                <span className="absolute -bottom-[2.1vh] left-0 w-full h-[2px] bg-green-500 shadow-[0_0_10px_#22c55e]" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Mobile Toggle - High Z-Index to stay clickable/visible */}
                <button 
                    className="lg:hidden p-2 text-green-500 hover:bg-white/5 rounded-lg transition-colors z-[110] relative"
                    onClick={() => setMenu(!menu)}
                >
                    {menu ? <X size={28} /> : <MenuIcon size={28} />}
                </button>

                {/* MOBILE SIDE-DRAWER */}
                <div className={`
                    fixed top-0 right-0 h-screen w-[280px] bg-[#0A0A0A] border-l border-white/10 z-[90] p-6 pt-24
                    transition-transform duration-500 ease-in-out flex flex-col gap-2 lg:hidden
                    ${menu ? 'translate-x-0' : 'translate-x-full'}
                `}>
                    <p className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase mb-4 px-4">Menu</p>
                    {userOpt.map((opt) => (
                        <button
                            key={opt.name}
                            onClick={() => { setDash(opt.num); setMenu(false); }}
                            className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200
                                ${dash === opt.num ? 'bg-green-500/10 text-green-400 border border-green-500/10' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            <span className={dash === opt.num ? 'text-green-400' : 'text-slate-500'}>{opt.icon}</span>
                            <span className="text-base font-semibold">{opt.name}</span>
                        </button>
                    ))}
                </div>
            </nav>
        </>
    )
}

export default Navbar