import React, { useState } from "react";

export default function AddClass({ toggleClass }) {
  const [formData, setFormData] = useState({
    exerciseName: "",

    days: "", // Now this holds a single value instead of an array

   
    startTime: "",
    endTime: "",
  });


  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    // Ensure "day" is a single string, not an array
    const { exerciseName, days, startTime, endTime } = formData;
  
    const dataToSend = {
      name: exerciseName, // ensure this is the correct field mapping
      exercise_name: exerciseName,
      day: days[0], // Use only the first selected day
      start_time: startTime,
      end_time: endTime,
    };
  
    try {
      const response = await fetch("http://localhost:5000/classes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add class");
      }
  
      const result = await response.json();
      console.log("Class added successfully:", result);
      alert("Class added successfully");
      
  
      // Reset form and close popup
      setFormData({ exerciseName: "", days: [], startTime: "", endTime: "" });
      toggleClass();
    } catch (error) {
      console.error("Error adding Class:", error);
      alert("Error adding Class. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  


  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-md shadow-md p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Class</h2>
          <form onSubmit={handleSubmit}>
            {/* Exercise Name Input */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-2" htmlFor="exerciseName">
                Exercise Name
              </label>
              <input
                type="text"
                id="exerciseName"
                name="exerciseName"
                value={formData.exerciseName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Yoga, Cardio Blast"
                required
              />
            </div>

            {/* Days Selection (Dropdown) */}
            <div className="mb-4">


  <label className="block text-gray-600 mb-2" htmlFor="days">
    Select a Day
  </label>
  <select
    id="days"
    name="days"
    value={formData.days} // For a single selection, set value as a string, not an array
    onChange={(e) =>
      setFormData((prevData) => ({ ...prevData, days: [e.target.value] }))
    }
    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  >
    <option value="" disabled>
      -- Select a Day --
    </option>
    {daysOfWeek.map((day) => (
      <option key={day} value={day}>
        {day}
      </option>
    ))}
  </select>
</div>



            {/* Time Selection */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">End Time</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={toggleClass}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"

                disabled={isSubmitting}

              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
