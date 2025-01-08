
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";




export default function AddMember({ toggleAddMember, defaultData ,updateMemberList}) {
  const [formData, setFormData] = useState({
    name: defaultData?.name || "",
    email: defaultData?.email || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navihate = useNavigate();
    


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };



  useEffect(() => {
    if (defaultData) {
      setFormData(defaultData);
      console.log("defaultData", defaultData);
    }
  }, [defaultData]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(defaultData);
    try {
      const url = defaultData
        ? `http://localhost:5000/clients/${defaultData.id}` // Use PUT for editing
        : "http://localhost:5000/clients"; // Use POST for creating

      const method = defaultData ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${defaultData ? "update" : "add"} member`
        );
      }

      const result = await response.json();
      console.log(
        `Member ${defaultData ? "updated" : "added"} successfully:`,
        result
      );
      updateMemberList?.(true);
      defaultData ? null :navihate("/member");
      
      

      // Reset form and close popup
      setFormData({ name: "", email: "" });
      
      toggleAddMember();
    } catch (error) {
      console.error(`Error ${defaultData ? "updating" : "adding"} member:`, error);
      alert(`Error ${defaultData ? "updating" : "adding"} member. Please try again.`);
    } finally {
      setIsSubmitting(false);
      
      
    }

  
  };

  return (
    <div>
      {/* Popup Form */}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-md shadow-md p-6 w-96">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Member</h2>
          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter name"
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={toggleAddMember}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"

                disabled={isSubmitting} // Disable button when submitting
              >
               {isSubmitting
  ? "Saving..." // Display when submission is in progress
  : defaultData 
    ? "Update" // Display "Update" if editing
    : "Add"} 


        
                Save

              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
