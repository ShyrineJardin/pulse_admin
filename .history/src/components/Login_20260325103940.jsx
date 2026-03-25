import React from "react";

const Login = () => {
  return (
   <div className="flex items-center justify-center h-screen bg-gradient-to-b from-white to-[#C9FCE9]">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
            <div className="flex flex-col text-center">
                <img src="/logo.png" alt="pulse logo" className="h" />
                <h2 className="font-bold text-2xl">PulseTech Admin Dashboard</h2>
                <p className="text-subtext text-lg">Hello! Welcome back👋</p>
            </div>

        </div>
    </div>
  );
}

export default Login;