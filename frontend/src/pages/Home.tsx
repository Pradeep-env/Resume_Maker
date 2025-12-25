
import Navbar from "../components/Navbar"
import Dashboard from "./Dashboard"
import Templates from "./Templates"
import Articles from "./Articles"
import Profile from "./Profile"
import { hotStore } from "../store/hot"
const Home = () => {
  const {dash} = hotStore()
  return (
    <div className="w-[100%] h-[100%] rounded-xl scrollbar">
      <Navbar/>
      {dash===1 && <Dashboard/>}
      {dash===2 && <Templates/>}
      {dash===3 && <Articles/>}
      {dash===4 && <Profile/>}
      
    </div>
  )
}

export default Home