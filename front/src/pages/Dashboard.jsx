
import React, { useState, useEffect } from "react";




import Navbar from "../components/Navbar";
import Sidebar from "../components/Sliderbar";
import Addplane from "./popup/addplane";
import AddClass from "./popup/addclass";
import AddMember from "./popup/addmember";
import AddTrainer from "./popup/addtrainer";


import ClipLoader from "react-spinners/ClipLoader";

import MainLogo from "../assets/Image/MainLogo.png";

export default function Dashboard() {
  const [updateDashboard, setUpdateDashboard] = useState(false);
  const [loading, setLoading] = useState(true); // Keep track of overall loading


  const [plane, setPlane] = useState(false);
  const [Class, setClass] = useState(false);
  const [Trainer, setTrainer] = useState(false);
  const [Member, setMember] = useState(false);

  const [stats, setStats] = useState({
    members: 0,
    trainers: 0,
    classes: 0,
  });

  console.log(stats);

  const toggleAddPlane = () => setPlane(!plane);
  const toggleAddClass = () => setClass(!Class);
  const toggleTrainer = () => setTrainer(!Trainer);
  const toggleMember = () => setMember(!Member);

  useEffect(() => {
    // Fetch data from the backend on component mount
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:5000/stats");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setStats({
            members: data.members,
            trainers: data.trainers,
            classes: data.classes,
          });
        } else {
          console.error("Failed to fetch stats");
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false); // Stop loading after fetch completes
      }
    };

    fetchStats();
  }, [updateDashboard]);

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Full-Screen Loader */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <ClipLoader size={150} color="#ffffff" loading={loading} />
        </div>
      )}

      {!loading && (
        <>
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <Navbar title="Dashboard" />
            <div className="p-6">
              {/* Quick Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-md flex gap-12">
                  <h2 className="text-lg text-gray-700">
                    Total<br /> Members
                  </h2>
                  <p className="text-2xl font-bold text-blue-900 mt-3">{stats.members}</p>
                </div>
                <div className="p-4 rounded-md flex gap-12">
                  <h2 className="text-lg text-gray-700">
                    Total<br /> Trainers
                  </h2>
                  <p className="text-2xl font-bold text-blue-900 mt-3">{stats.trainers}</p>
                </div>
                <div className="p-4 rounded-md flex gap-12">
                  <h2 className="text-lg text-gray-700">
                    Active<br /> Classes
                  </h2>
                  <p className="text-2xl font-bold text-blue-900 mt-3">{stats.classes}</p>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 rounded-md mt-6 flex">
                {plane && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <Addplane toggleAddPlane={toggleAddPlane} />
                  </div>
                )}
                {Class && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <AddClass toggleClass={toggleAddClass} />
                  </div>
                )}
                {Member && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <AddMember
                      toggleAddMember={toggleMember}
                      defaultData={null}
                      updateMemberList={setUpdateDashboard}
                    />
                  </div>
                )}
                {Trainer && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <AddTrainer
                      toggleAddTrainer={toggleTrainer}
                      defaultData={null}
                      updateTrainerList={setUpdateDashboard}
                    />
                  </div>
                )}

                {/* Left Block (Logo Section) */}
                <div className="w-[50%] bg-[#1e1b4b] h-[400px] flex items-center justify-center flex-col rounded-2xl">
                  <img src={MainLogo} alt="MainLogo" className="w-[50%] h-[50%]" />
                  <h1 className="text-white text-6xl font-bold">MINATOR</h1>
                </div>

                {/* Right Block (Buttons) */}
                <div className="w-[50%] flex flex-col items-center justify-around p-4 space-y-4">
                  <button
                    onClick={toggleAddPlane}
                    className="text-black w-[30%] h-[40px] py-2 bg-white border border-black rounded-3xl hover:bg-gray-100"
                  >
                    Add Plans
                  </button>
                  <button
                    onClick={toggleTrainer}
                    className="text-black w-[30%] h-[40px] py-2 bg-white border border-black rounded-3xl hover:bg-gray-100"
                  >
                    Add Trainer
                  </button>
                  <button
                    onClick={toggleAddClass}
                    className="text-black w-[30%] h-[40px] py-2 bg-white border border-black rounded-3xl hover:bg-gray-100"
                  >
                    Add Classes
                  </button>
                  <button
                    onClick={toggleMember}
                    className="text-black w-[30%] h-[40px] py-2 bg-white border border-black rounded-3xl hover:bg-gray-100"
                  >
                    Add Members
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
