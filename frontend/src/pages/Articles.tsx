

const Articles = () => {
  return (
       <div className="w-full h-full p-6 md:p-12 overflow-y-auto scroll-smooth bg-[#050505] text-slate-200">
        
       
        <h1 className="flex items-center gap-3 text-xl font-semibold tracking-tight lg:text-3xl xl:w-[80%] mx-auto bg-gradient-to-br from-white to-slate-500 text-transparent bg-clip-text">
            
           Job Articles
        </h1>
        <div className="w-full h-[35vh] md:h-[45vh] xl:h-[35vh] flex gap-6 overflow-x-auto my-8 p-2 xl:w-[80%] mx-auto no-scrollbar mask-fade-edge">
        
           {[1, 2, 3, 4, 5].map((i) => (
             <div key={i} className="h-full min-w-[240px] md:min-w-[280px] flex-shrink-0 rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent hover:border-purple-500/50 hover:bg-white/[0.08] transition-all duration-300 cursor-pointer group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
           ))}
        </div>

        
        <h1 className="flex items-center gap-3 text-xl font-semibold tracking-tight lg:text-3xl xl:w-[80%] mx-auto mt-12 bg-gradient-to-br from-white to-slate-500 text-transparent bg-clip-text">
            Tech Articles
        </h1>
        <div className="w-full h-[35vh] md:h-[45vh] xl:h-[35vh] flex gap-6 overflow-x-auto my-8 p-2 xl:w-[80%] mx-auto no-scrollbar">
           {[1, 2, 3, 4, 5].map((i) => (
             <div key={i} className="h-full min-w-[240px] md:min-w-[280px] flex-shrink-0 rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent hover:border-blue-500/50 hover:bg-white/[0.08] transition-all duration-300 cursor-pointer" />
           ))}
        </div>

        

    </div>
  )
}

export default Articles