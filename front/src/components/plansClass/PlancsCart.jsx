import React from "react";
import WhiteLogo from "../../assets/Image/Logowhite.png";

export default function Plancart({ type, price }) {
  // Validate props
  if (!type || !price) {
    return (
      <div className="flex justify-center items-center text-gray-500">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center p-3 h-48 w-80 bg-gradient-to-r from-[#4d1f96] to-white rounded-lg shadow-lg max-w-sm text-center font-sans">
      <img
        src={WhiteLogo}
        alt="Company logo"
        className="w-32 h-32 mb-4 mx-auto"
      />
     <div className="flex flex-col items-center">
     <h3 className="text-xl font-semibold mb-2 text-black">{type}</h3>
     <h2 className="text-4xl font-bold mb-4">{price} LKR</h2>
     </div>
    </div>
  );
}
