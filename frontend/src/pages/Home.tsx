
import Navbar from "../components/Navbar"
import Dashboard from "./Dashboard"
const Home = () => {
  return (
    <div className="w-[100%] h-[100%] bg-white rounded-xl scrollbar">
      <Navbar/>
      <Dashboard/>
    </div>
  )
}

export default Home