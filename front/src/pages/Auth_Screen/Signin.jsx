import React, { useState } from "react";

export default function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password.trim())
      newErrors.password = "Password is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Sign In Form Submitted:", formData);
      try {
        const response = await fetch('http://localhost:3000/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)})
          console.log("data send sucess")
      } catch (error) {
        console.error("have err");
      }
    }
  };

  return (
    <div className="min-h-[150px] bg-dark-blue flex justify-center items-center p-6">
      <div className="bg-blue-950 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-dark-blue mb-6 text-center">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-dark-blue"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-dark-blue"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-white text-black py-2 px-4 rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
