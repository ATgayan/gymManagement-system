import React, { useState, useEffect } from "react";



export default function Navbar({ title }) {

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const options = { month: "short", day: "2-digit", year: "numeric" };
      const formattedDate = now.toLocaleDateString("en-US", options);
      setCurrentTime(formattedDate);

    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (

    <div className=" flex justify-between items-center bg-blue-50 px-6 py-4 h-20 shadow-md">
      <div className="flex items-center space-x-4 flex-col ">
        <div className="text-black font-bold text-2xl">{title}</div>
        <div className="text-gray-500 text-sm ">{currentTime}</div>
      </div>
      <div className="text-gray-700 text-lg flex flex-col">
        <span className="text-sm"> Last Month </span>
       <span className="text-green-800 font-bold text-2xl">LKR 12,000</span>

      </div>
    </div>
  );
}
