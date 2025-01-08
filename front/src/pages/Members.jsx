import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sliderbar";
import { useNavigate } from "react-router-dom";
import AddMember from "./popup/addmember";

export default function Member() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [update, setUpdate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [members, setMembers] = useState([]); // State for member data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [fetchData, setFetchData] = useState(false);

  const navigate = useNavigate();

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Toggle Add/Edit Member modal
  const toggleMember = (member = null) => {
    setSelectedMember(member);
    setUpdate(!update);
  };

  // Fetch members data from the server
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("http://localhost:5000/clients"); // Fetch data from API
        if (response.ok) {
          const data = await response.json();
          setMembers(data);
        } else {
          setError("Failed to fetch member data.");
        }
      } catch (error) {
        setError("Error fetching member data.");
      } finally {
        setLoading(false);
        setFetchData(false);
      }
    };

    fetchMembers();
  }, [fetchData]);

  // Delete a member
  const deleteMember = async (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        const response = await fetch(`http://localhost:5000/clients/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setMembers((prev) => prev.filter((member) => member.id !== id));
          alert("Member deleted successfully.");
        } else {
          alert("Failed to delete member.");
        }
      } catch (error) {
        alert("Error deleting member.");
      }
    }
  };

  // Filter members based on the search query
  const filteredMembers = members.filter((member) =>
    [member.name, member.email].some((field) =>
      (field?.toLowerCase() ?? "").includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar title="Member" />
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-1/4">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-white w-full p-2 border border-black rounded-lg text-black"
                placeholder="Search"
              />
            </div>
          </div>

          {/* Add/Edit Member Modal */}
          {update && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <AddMember
                toggleAddMember={toggleMember}
                defaultData={selectedMember}
                updateMemberList={setFetchData}
              />
            </div>
          )}

          {/* Conditional Rendering */}
          {loading && <p>Loading members...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && filteredMembers.length === 0 && (
            <p>No members found.</p>
          )}

          <div className="overflow-y-scroll h-[450px] scrollbar-hide">
            {/* Member Info Section */}
            {!loading &&
              !error &&
              filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="border border-black flex h-fit rounded-lg justify-between items-center p-2 mb-4"
                >
                  <p className="text-black">{member.name}</p>
                  <p className="text-black">{member.email}</p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() =>
                        toggleMember({
                          id: member.id,
                          name: member.name,
                          email: member.email,
                        })
                      }
                      className="bg-white border-green-400 text-green-400 rounded-lg px-4 py-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/Memberdashboard/${member.id}`, {
                          state: { name: member.name, email: member.email },
                        })
                      }
                      className="bg-white border-blue-400 text-blue-400 rounded-lg px-4 py-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() => deleteMember(member.id)}
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
    </div>
  );
}
