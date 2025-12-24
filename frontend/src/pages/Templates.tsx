import { useState } from "react"

const Templates = () => {
    const [item, Sitem] = useState(1);
   
    const changeItem = (x: number) => {
        Sitem(x)
    }
    const items = [
        "Manager", "HR", "Developer", "Designer", "Sales", "Accountant", "Secretary", "Receptionist", "Teacher", "Engineer", 
    ]
  return (
    <div className=" w-full h-full p-10 overflow-y-auto scroll-smooth bg-blue-100">
        <h1 className="w-[80%] h-fit flex items-center justify-evenly text-xl font-medium mx-auto lg:text-3xl lg:w-[50%] xl:w-[50%] text-center">Most viewd templates on our platform</h1>
        <div className="w-full h-[40vh] md:h-[50vh] xl:h-[35vh] flex gap-5 overflow-x-auto my-10 p-4 xl:w-[80%] mx-auto">
  
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
           <div className="h-full min-w-[250px] bg-black flex-shrink-0 rounded-md"></div>
          
       </div>
        <h1 className="w-[80%] h-fit flex items-center justify-evenly text-xl font-medium mx-auto lg:text-3xl lg:w-[50%] xl:w-[50%] text-center">Search any Template</h1>
        <div className="w-full lg:w-[50%] h-[5vh] mx-auto mt-3 flex items-center justify-between font-bold">
            <p className={`w-fit h-fit p-1 border-2 border-blue-900 rounded-xl text-blue-900 ${item === 1? "bg-blue-900 text-white": ""} cursor-pointer`} onClick={() => changeItem(1)}>Resume</p>
            <p className={`w-fit h-fit p-1 border-2 border-blue-900 rounded-xl text-blue-900 ${item === 2? "bg-blue-900 text-white": ""} cursor-pointer`} onClick={() => changeItem(2)}>Letter</p>
            <p className={`w-fit h-fit p-1 border-2 border-blue-900 rounded-xl text-blue-900 ${item === 3? "bg-blue-900 text-white": ""} cursor-pointer`} onClick={() => changeItem(3)}>Email</p>

        </div>
        <input type="text" className="lg:w-[50%] w-full h-[5vh] border rounded-xl mx-auto mt-3 mb-10 block" placeholder={items[Math.floor(Math.random() * items.length)]}/>
    </div>
  )
}

export default Templates