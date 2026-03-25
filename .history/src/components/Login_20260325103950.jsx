import React from "react";

const Login = () => {
  return (
   <div className="flex items-center justify-center h-screen bg-gradient-to-b from-white to-[#C9FCE9]">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
            <div className="flex flex-col text-center gap-2">
                <img src="/logo.png" alt="pulse logo" className="h-16 mx-auto" />
                <h2 className="font-bold text-2xl">PulseTech Admin Dashboard</h2>
                <p className="text-subtext text-lg">Hello! Welcome back👋</p>
            </div>

        </div>
    </div>
  );
}

export default Login;