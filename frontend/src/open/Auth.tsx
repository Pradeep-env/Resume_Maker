import { useState } from "react";
import { Mail, Lock, User,  Chrome as Google, Linkedin, ArrowRight } from "lucide-react";

import { useNavigate } from "react-router-dom";
import useAuth from '../store/authStore'
import {toast } from "react-toastify";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const nav = useNavigate();
  const {setName, setEmail, setPassword, loginUser, signupUser} = useAuth()
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isLogin) {
      const res = await loginUser(); 
      if (res["success"]) {
        nav("/dashboard");
       
      }
      else{
        toast(res["msg"])
      }
    } else {
      const res = await signupUser(); 
      if (res["success"]) {
        toast(res["msg"])
      }
      else{
        toast(res["msg"])
      }
    }
  }
  return (
    <div className="flex min-h-screen w-full bg-[#050505] overflow-hidden">
      
      {/* LEFT SIDE: The Visual Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-blue-600 items-center justify-center p-12 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 to-indigo-900" />
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
        
        <div className="relative z-10 max-w-md text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
             <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 mx-auto rotate-3 shadow-xl">
                <span className="text-blue-600 font-black text-2xl italic">RAI</span>
             </div>
             <h2 className="text-3xl font-bold text-white mb-4">
                {isLogin ? "Welcome Back!" : "Start Your Journey"}
             </h2>
             <p className="text-blue-100/80 leading-relaxed">
                Join 10,000+ professionals building winning resumes with our AI-powered platform.
             </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: The Dynamic Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
          
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-white mb-2">
              {isLogin ? "Sign In" : "Create Account"}
            </h1>
            <p className="text-slate-500">
              {isLogin ? "Enter your credentials to access your resumes" : "Fill in the details to get started for free"}
            </p>
          </div>

          {/* Social Auth Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-sm font-medium text-slate-300 cursor-pointer">
              <Google size={18} className="text-red-400" /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-sm font-medium text-slate-300 cursor-pointer">
              <Linkedin size={18} className="text-blue-400" /> LinkedIn
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#050505] px-4 text-slate-500">Or continue with</span></div>
          </div>

          {/* Form Fields */}
          <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input type="text" placeholder="John Doe" onChange={(e) => setName(e.target.value)}  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" required/>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input type="email" placeholder="name@example.com"  onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" required/>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</label>
                {isLogin && <button className="text-xs text-blue-400 hover:text-blue-300">Forgot?</button>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input type="password" placeholder="••••••••"  onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" required/>
              </div>
            </div>

            <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group cursor-pointer">
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Toggle Button */}
          <p className="text-center text-slate-500 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-400 font-bold hover:underline cursor-pointer"
            >
              {isLogin ? "Create one" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;