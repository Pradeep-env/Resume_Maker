
import Navbar from "../components/Navbar"
import Dashboard from "./Dashboard"
import Templates from "./Templates"
import { hotStore } from "../store/hot"
const Home = () => {
  const {dash} = hotStore()
  return (
    <div className="w-[100%] h-[100%] bg-white rounded-xl scrollbar">
      <Navbar/>
      {dash===1 && <Dashboard/>}
      {dash===2 && <Templates/>}
      
    </div>
  )
}

export default Home