
import Navbar from "./Navbar" 
import { demoHot } from "../store/hot"
import Articles from "./Articles"
import Templates from "./Templates"
import PricingPage from "./Pricing"
import AuthPage from "./Auth"
import Hero from "./Hero"
const Land = () => {
  const {dash} = demoHot()
  return (
    <div className="w-full h-full  overflow-y-auto overflow-x-hidden scrollbar">
  <Navbar />
  
  {/* This wrapper ensures the children can be as tall as they need to be */}
     {dash === 0 && <Hero />}
    {dash === 1 && <Templates />}
    {dash === 2 && <Articles />}
    {dash === 3 && <PricingPage />}
    {dash === 4 && <AuthPage />}
   
  
</div>
  )
}

export default Land