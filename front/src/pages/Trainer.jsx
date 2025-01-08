import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sliderbar";
import { useNavigate } from "react-router-dom";
import AddTrainer from "./popup/addtrainer";

export default function Trainer() {
  const [updateTrainer, setUpdateTrainer] = useState(false);
  const [update, setUpdate] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null); // State for selected trainer
  const [searchQuery, setSearchQuery] = useState(""); // State for search functionality
  const [trainers, setTrainers] = useState([]); // State for trainer data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const Navigate = useNavigate();

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleTrainer = (trainer = null) => {
    setSelectedTrainer(trainer); // Set the selected trainer (or null to close)
    setUpdate(!update); // Toggle the update modal
  };

  // Fetch trainers data
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await fetch("http://localhost:5000/trainers");
        if (response.ok) {
          const data = await response.json();
          setTrainers(data); // Update state with fetched data
        } else {
          setError("Failed to fetch trainer data.");
        }
      } catch (error) {
        setError("Error fetching trainer data.");
      } finally {
        setLoading(false); // Disable loading state
        setUpdateTrainer(false);  
      }
    };

    fetchTrainers();
  }, [updateTrainer]);

  // Delete trainer
  const deleteTrainer = async (id) => {
    if (window.confirm("Are you sure you want to delete this trainer?")) {
      try {
        const response = await fetch(`http://localhost:5000/trainers/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setTrainers((prev) => prev.filter((trainer) => trainer.id !== id)); // Update state to remove deleted trainer
        } else {
          alert("Failed to delete trainer.");
        }
      } catch (error) {
        alert("Error deleting trainer.");
      }
    }
  };

  const filteredTrainers = trainers.filter((trainer) =>
    [trainer.name, trainer.email]
      .some((field) => (field?.toLowerCase() ?? "").includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar title="Trainer" />

        <div className="p-6">
          {/* Search Bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-1/4">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-white w-full p-2 border border-black rounded-lg"
                placeholder="Search"
              />
            </div>
          </div>

          {/* AddTrainer Modal */}
          {update && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <AddTrainer
                toggleAddTrainer={toggleTrainer}
                defaultData={selectedTrainer} // Pass selected trainer data
                updateTrainerList={setUpdateTrainer}
              />
            </div>
          )}

          {/* Loading and Error Handling */}
          {loading && <p>Loading trainers...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && filteredTrainers.length === 0 && (
            <p>No trainers found.</p>
          )}

          {/* Trainer Info Section */}
          {!loading &&
            !error &&
            filteredTrainers.map((trainer) => (
              <div
                key={trainer.id}
                className="border border-black flex h-fit rounded-lg justify-between items-center p-2 mb-4"
              >
                <div>
                  <p className="text-black">{trainer.name}</p>
                  <p className="text-black text-xl">{trainer.expertise}</p>
                  <p className="text-black">{trainer.email}</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => toggleTrainer(trainer)} // Pass the selected trainer
                    className="bg-white border-green-400 text-green-400 rounded-lg px-4 py-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      Navigate(`/Trainerdashboard/${trainer.id}`, {
                        state: { name: trainer.name, email: trainer.email },
                      })
                    }
                    className="bg-white border-blue-400 text-blue-400 rounded-lg px-4 py-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => deleteTrainer(trainer.id)}
                    className="bg-white border-red-400 text-red-400 rounded-lg px-4 py-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
