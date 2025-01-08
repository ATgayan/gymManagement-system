import React, { useState } from "react";

export default function Addplane({toggleAddPlane}) {
  const [formData, setFormData] = useState({
    price: "",
    type: "",
  });

  // State to control the popup visibility
  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(!showPopup);
    setFormData({ price: "", type: "" }); // Reset form data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add logic to handle form submission, such as API calls
    toggleAddPlane()
  };

  return (
    <div>
      

      {/* Popup Form */}
      
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-md shadow-md p-6 w-96">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Plan</h2>
            <form onSubmit={handleSubmit}>
              {/* Price Input */}
              <div className="mb-4">
                <label className="block text-gray-600 mb-2" htmlFor="price">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Type Dropdown */}
              <div className="mb-4">
                <label className="block text-gray-600 mb-2" htmlFor="type">
                  Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>
                    Select a type
                  </option>
                  <option value="Member">Member</option>
                  <option value="Plus">Plus</option>
                  <option value="Gold">Gold</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={toggleAddPlane}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
