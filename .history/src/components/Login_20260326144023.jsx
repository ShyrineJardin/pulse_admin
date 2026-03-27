import {React, useState} from "react";
import { MdEmail, MdLock } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try{
        
    }

  return (
   <div className="flex items-center justify-center h-screen bg-gradient-to-b from-white to-[#C9FCE9]">
        <div className="w-full max-w-sm md:max-w-md p-8 space-y-6 bg-white/50 rounded-xl shadow">
            <div className="flex flex-col text-center gap-1">
                <img src="/logo.png" alt="pulse logo" className="lg:h-16 h-14 mx-auto" />
                <h2 className="font-bold text-xl lg:text-2xl">PulseTech Admin Dashboard</h2>
                <p className="text-subtext text-lg">Hello! Welcome back👋</p>

                <form action="">
                    <div className="flex flex-col gap-4 mt-6">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-left font-semibold text-lg">Email</h3>
                            <div className="flex items-center gap-3 bg-#F6F6F6 p-3 border border-[#D9D9D9] rounded-md focus-within:ring-2 focus-within:ring-primary">
                                <MdEmail className="h-6 w-6" />
                                <input type="email" placeholder="juandelacruz@gmail.com" className=" placeholder:text-[#C5C5C5] bg-transparent outline-none w-full" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-left font-semibold text-lg">Password</h3>
                            <div className="flex items-center gap-3 bg-#F6F6F6 p-3 border border-[#D9D9D9] rounded-md focus-within:ring-2 focus-within:ring-primary">
                                <MdLock className="h-6 w-6" />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••" 
                                    className="placeholder:text-[#C5C5C5] bg-transparent outline-none w-full" 
                                />
                                <button 
                                    type="button" 
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <IoMdEyeOff className="h-6 w-6" /> : <IoMdEye className="h-6 w-6" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="flex items-center justify-between mt-4">
                
                    <button 
                    type="submit"
                    disabled = {loading}
                    className="text-btn-text font-medium bg-primary w-full text-lg p-3 rounded-md hover:scale-105">
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </div>
            </div>

        </div>  
    </div>
  );
}

export default Login;