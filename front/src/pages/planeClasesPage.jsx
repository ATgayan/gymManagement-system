import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sliderbar";
import Plancart from "../components/plansClass/PlancsCart";
import ClipLoader from "react-spinners/ClipLoader";

export default function ClassPlane() {
  const [stats, setStats] = useState(null); // State for fetched stats
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:5000/packages");
        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
        <ClipLoader loading={loading} size={150} aria-label="Loading Spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 flex items-center justify-center h-screen">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex w-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar title="Plans & Classes" />

        {/* Plans Section */}
        <div className="p-6 w-full">
          <h2 className="text-2xl font-semibold mb-4 text-black">Plans</h2>
          <div className="flex overflow-x-auto space-x-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 m-2">
            {stats?.packages?.length > 0 ? (
              stats.packages.map((plan, index) => (
                <Plancart
                  key={index}
                  type={plan.type || "Unknown"}
                  price={plan.price || "Not available"}
                />
              ))
            ) : (
              <p className="text-gray-600 w-full text-center py-4">
                No plans available
              </p>
            )}
          </div>
        </div>

        {/* Classes Section */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-black">Classes</h2>
          <div className="overflow-x-auto max-w-full">
            <div className="flex flex-wrap gap-4 m-2 overflow-y-scroll scrollbar-hide h-48">
              {stats?.classes?.length > 0 ? (
                stats.classes.map((classItem, index) => (
                  <div key={index} className="flex-none w-60 h-32">
                    <div className="flex flex-col bg-white border border-gray-300 p-4 rounded-lg shadow-md h-full">
                      <h3 className="text-lg font-semibold text-black">
                        {classItem.name || "Unnamed Class"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Day: {classItem.day || "N/A"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Time: {classItem.time || classItem.start_time || "N/A"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Duration: {classItem.duration || "N/A"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No classes available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
