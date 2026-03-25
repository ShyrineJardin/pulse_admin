import React from "react";

const Login = () => {
  return (
   <div className="flex items-center justify-center h-screen bg-gradient-to-b from-white to-[#C9FCE9]">
        <div className="w-full max-w-sm md:max-w-md p-8 space-y-6 bg-white/50 rounded-xl shadow">
            <div className="flex flex-col text-center gap-1">
                <img src="/logo.png" alt="pulse logo" className="lg:h-16 h-14 mx-auto" />
                <h2 className="font-bold text-xl lg:text-2xl">PulseTech Admin Dashboard</h2>
                <p className="text-subtext text-base lg:text-lg">Hello! Welcome back👋</p>

                <form action="">
                    <div className="flex flex-col gap-4 mt-6">
                        <input type="email" placeholder="juandelacruz@gmail.com" className="bg-#F6F6F6 pt-3 pb-3 pr-2 placeholder:text-subtext border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" />
                        <input type="password" placeholder="••••••••" className="bg-#F6F6F6 placeholder:text-subtext border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                </form>
            </div>

        </div>
    </div>
  );
}

export default Login;