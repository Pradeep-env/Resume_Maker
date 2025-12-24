import {MenuIcon, Newspaper, User , Paperclip, LayoutDashboard, X } from "lucide-react" 
import { useState } from "react"
import { hotStore } from "../store/hot"

const Navbar = () => {
    const userOpt =[
        {name: "Dashboard", link: "#", icon: <LayoutDashboard className="text-green-500"/>, num: 1},
        {name: "Templates", link: "#", icon: <Paperclip className="text-green-500"/>, num: 2},
        {name: "Articles", link: "#", icon: <Newspaper className="text-green-500"/>, num: 3},
        {name: "Account", link: "#", icon: <User className="text-green-500"/>, num: 4},
    ]
    const [menu,setMenu] = useState(false);
    const handleMenu = () => {
        setMenu(!menu)
    }

    const {setDash} = hotStore()
    const changeDash=(x: number) => {
        setDash(x)
    }
  return (
    <div className="h-[10vh] w-full flex items-center justify-between shadow-md z-10 relative">
      <div className="h-full w-[30%] flex items-center justify-evenly lg:w-[15%]">
        <User/>
        <p>Resume</p>
      </div>
      <div className={`w-[40%] flex items-center justify-evenly flex-col bg-red-100 lg:bg-white transition-all duration-300 ${menu ? 'h-[10vh] mt-0' : 'h-[50vh] mt-[40vh]'} lg:h-full lg:w-[50%] lg:flex-row lg:mt-0 lg:m-0`}>
        <a href="#" className="h-full w-full flex items-center justify-center lg:hidden" >
            {!menu ? <X className="text-green-500" onClick={handleMenu}/> : <MenuIcon className="text-green-500" onClick={handleMenu}/>}
            
          </a>
        {userOpt.map((opt) => (
          <a href={opt.link} key={opt.name} className="h-full w-full flex items-center lg:justify-between lg:justify-evenly px-2" style={{"display": menu? "none": "flex"}} onClick={()=>{changeDash(opt.num)}}>
            {opt.icon}
            <p className="hover:border-b-2 border-green-500 ml-3 lg:m-0">{opt.name}</p>
          </a>
        ))}
      </div>
     
    </div>
  )
}

export default Navbar