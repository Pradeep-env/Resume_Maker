

const Articles = () => {
  return (
     <div className=" w-full h-full p-10 overflow-y-auto scroll-smooth bg-blue-100">
        <h1 className="w-[80%] h-fit flex items-center justify-evenly text-xl font-medium mx-auto lg:text-3xl lg:w-[50%] xl:w-[50%] text-center">Job Market Related Articles</h1>
        
        <div className="w-full h-[40vh] md:h-[50vh] xl:h-[35vh] flex gap-5 overflow-x-auto my-10 p-4 xl:w-[80%] mx-auto">
  
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
          
       </div>
        <h1 className="w-[80%] h-fit flex items-center justify-evenly text-xl font-medium mx-auto lg:text-3xl lg:w-[50%] xl:w-[50%] text-center">Tech Related Articles</h1>
        <div className="w-full h-[40vh] md:h-[50vh] xl:h-[35vh] flex gap-5 overflow-x-auto mt-10 p-4 xl:w-[80%] mx-auto mb-20">
  
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
          
       </div>
        </div>
    
  )
}

export default Articles