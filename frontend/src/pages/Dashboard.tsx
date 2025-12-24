import { Mail, PanelLeft, File} from "lucide-react"

const Dashboard = () => {
  return (
    <div className=" w-full h-full p-10 overflow-y-auto scroll-smooth bg-blue-100">
        <h1 className="w-[50%] h-fit flex items-center justify-evenly text-md font-medium mx-auto lg:text-2xl lg:w-[25%] xl:w-[15%]"><PanelLeft/>My Resumes</h1>
        <div className="w-full h-[40vh] md:h-[50vh] xl:h-[35vh] flex gap-5 overflow-x-auto my-10 p-4 xl:w-[80%] mx-auto">
  
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
          
       </div>
        <h1 className="w-[50%] h-fit flex items-center justify-evenly text-md font-medium mx-auto lg:text-2xl lg:w-[25%] xl:w-[15%]"><File/>Cover Letters</h1>
        <div className="w-full h-[40vh] md:h-[50vh] xl:h-[35vh] flex gap-5 overflow-x-auto my-10 p-4 xl:w-[80%] mx-auto">
  
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
          
       </div>
        <h1 className="w-[60%] h-fit flex items-center justify-evenly text-md font-medium mx-auto lg:text-2xl lg:w-[30%] xl:w-[15%]"><Mail/>Email Templates</h1>
        <div className="w-full h-[40vh] md:h-[50vh] xl:h-[35vh] flex gap-5 overflow-x-auto my-10 p-4 xl:w-[80%] mx-auto">
  
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
          
       </div>


    </div>
  )
}

export default Dashboard
