import React, { useState } from "react";
import Signup from "./Auth_Screen/Signup";
import Signin from "./Auth_Screen/Signin";

export default function Homepage() {
  const [ispopup, setpopup] = useState(false);
  const [ispopup2, setpopup2] = useState(false);

  const togglePopup = () => {
    setpopup(!ispopup);
  };
  const togglePopup2 = () => {
    setpopup2(!ispopup2);
  };

  return (
    <>
      <div className="bg-blue-950 w-screen min-h-screen flex flex-col items-center justify-center">
        <div className="text-white text-3xl font-bold mb-8">My Logo</div>

        {/* Popup Modal */}
        {ispopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-blue-950 border border-white rounded-lg shadow-lg p-6 w-96">
            <button
                onClick={togglePopup}
                className="mt-4 w-fit bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
              >
                X
              </button>
              <Signup />
             
            </div>
          </div>
        )}
        {/* Popup Modal */}
        {ispopup2 && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-blue-950 border border-white rounded-lg shadow-lg p-6 w-96">
            <button
                onClick={togglePopup2}
                className="mt-4 w-fit bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
              >
                X
              </button>
              <Signin/>
             
            </div>
          </div>
        )}

        <div className="flex space-x-4">
          <button
            onClick={togglePopup}
            className="bg-blue-300 text-black px-6 py-2 rounded hover:bg-blue-400"
          >
            Sign Up
          </button>
          <button  onClick={togglePopup2} className="bg-blue-300 text-black px-6 py-2 rounded hover:bg-blue-400">
            Sign In
          </button>
        </div>
      </div>
    </>
  );
}
