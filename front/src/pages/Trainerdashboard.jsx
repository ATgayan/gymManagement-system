import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sliderbar";

export default function Trainerdashboard() {
  const { id } = useParams();
  const location = useLocation();
  const { name, email } = location.state || {};
  
  const today = new Date().toLocaleDateString();

//   useEffect(() => {
//     // Example API call to fetch stats
//     const fetchStats = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/trainers/${id}/stats`);
//         if (response.ok) {
//           const data = await response.json();
//           setStats(data);
//         } else {
//           console.error("Failed to fetch stats.");
//         }
//       } catch (error) {
//         console.error("Error fetching stats:", error);
//       }
//     };

//     fetchStats();
//   }, [id]);

  if (!name || !email) {
    return <p>Error: Trainer details not found!</p>;
  }

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="Trainer" />
        <div className="p-6">
          <div className="flex justify-between items-center w-screen h-[500px]  rounded-lg p-4">
            <div className="w-[50%] h-[70%] flex justify-between ">
              <div>
               
              </div>
            </div>
            <div className="w-[50%] h-[70%] items-center justify-center  flex flex-col text-black">
              <p>{today}</p>
              <h1>{name}</h1>
              <p>{email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
