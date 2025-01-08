
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function AddTrainer({ toggleAddTrainer, defaultData = null, updateTrainerList }) {
  const navigate = useNavigate();
  // Initialize form data with default values or empty fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ExersiceName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form data when defaultData changes (for editing mode)
  useEffect(() => {
    if (defaultData) {
      setFormData({
        name: defaultData.name || "",
        email: defaultData.email || "",
        ExersiceName: defaultData.ExersiceName || "",
      });
    }
  }, [defaultData]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = defaultData
        ? `http://localhost:5000/trainers/${defaultData.id}` // Update existing trainer
        : "http://localhost:5000/trainers"; // Add new trainer

      const method = defaultData ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${defaultData ? "update" : "add"} trainer`);
      }

      const result = await response.json();
      console.log(`Trainer ${defaultData ? "updated" : "added"} successfully:`, result);
      updateTrainerList(true);
      defaultData ? null: navigate("/trainer");

     
  

      // Notify parent to update list and reset form
      updateTrainerList();
      setFormData({ name: "", email: "", ExersiceName: "" });
      toggleAddTrainer();
    } catch (error) {
      console.error(`Error ${defaultData ? "updating" : "adding"} trainer:`, error);
      alert(`Error ${defaultData ? "updating" : "adding"} trainer. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-md shadow-md p-6 w-96">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          {defaultData ? "Update Trainer" : "Add New Trainer"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Trainer Name */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="name">
              Trainer Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter trainer name"
              required
            />
          </div>
          {/* Trainer Email */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="email">
              Trainer Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter trainer email"
              required
            />
          </div>
          {/* Exercise Name */}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="ExersiceName">
              Exercise Name
            </label>
            <input
              type="text"
              id="ExersiceName"
              name="ExersiceName"
              value={formData.ExersiceName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter exercise name"
              required
            />
          </div>
          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={toggleAddTrainer}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : defaultData ? "Update" : "Save"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
