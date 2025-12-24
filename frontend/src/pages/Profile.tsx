

const Profile = () => {
  return (
     <div className=" w-full h-full p-10 overflow-y-auto scroll-smooth bg-blue-100 lg:flex lg:items-center lg:justify-evenly gap-5">
       
            <div className="lg:w-[35%] w-fit h-fit p-10 overflow-y-auto scroll-smooth bg-yellow-100 mb-20 flex flex-col items-center justify-center gap-5">
                 <h1 className="w-[80%] h-fit flex items-center justify-evenly text-xl font-medium mx-auto lg:text-3xl lg:w-[50%] xl:w-[50%] text-center">
            Account
            </h1>
             <input type="image" src="" alt="" className="h-40 w-40 rounded-[50%] border"/>
             
             <input type="text" name="name" id="name" value="Pradeep Holagundi" placeholder="Name" className="h-10 w-full border text-center"/>
             <input type="text" name="email" id="email" value="pradeepkh312@gmail.com" placeholder="Email" className="h-10 w-full border text-center"/>
             <input type="text" name="mobile" id="mobile" value="+91 6363515498" placeholder="Mobile" className="h-10 w-full border text-center"/>
             <input type="text" name="city" id="city" value="Gadag, India" placeholder="City" className="h-10 w-full border text-center"/>
             <p className="h-fit w-fit p-2 border text-center">Free-Tier</p>
            </div>
             <div className="lg:w-[35%] w-fit h-fit p-10 overflow-y-auto scroll-smooth bg-yellow-100 mb-20 flex flex-col items-center justify-center gap-5"> 
                <p>Upload Resume</p>
                
                <input type="file" name="" id="" className="h-10 w-[50%] border text-center" placeholder="resume.pdf"/>
               <button className="w-[80%] h-fit flex items-center justify-evenly text-md font-medium mx-auto lg:text-xl lg:w-[50%] xl:w-[50%] text-center border rounded-md">
            Chnage Plan
            </button>
            <button className="w-[80%] h-fit flex items-center justify-evenly text-md font-medium mx-auto lg:text-xl lg:w-[50%] xl:w-[50%] text-center border rounded-md">
            Update Profile
            </button>
             
             <button className="w-[80%] h-fit flex items-center justify-evenly text-md font-medium mx-auto lg:text-xl lg:w-[50%] xl:w-[50%] text-center border rounded-md">
            Log Out
            </button>
             </div>
        </div>
  )
}

export default Profile