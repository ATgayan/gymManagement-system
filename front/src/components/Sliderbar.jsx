import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { BiPlusMedical } from 'react-icons/bi';  // First Icon: Medical Cross
import { FaPuzzlePiece } from 'react-icons/fa'; // Second Icon: Puzzle Piece
import { FaUsers } from 'react-icons/fa';       // Third Icon: Group of People
import { FaUser } from 'react-icons/fa';        // Fourth Icon: Single Person
import { FaUserTie } from 'react-icons/fa';     // Fifth Icon: Person in Suit


import Logo from "../assets/Image/logoBlack.png";

import { useAuth } from "../Auth_Services/userAuth";



export default function Sidebar() {

  const {logoutUser} = useAuth();

  const logout =async()=>{
      await logoutUser();
  }
    
  return (
    <div className="w-14 bg-blue-50 text-black flex flex-col justify-between items-center shadow-md">
      <div className="flex flex-col  py-6">
        <div className="flex flex-col w-10 h-10 mb-40">
        <img src={Logo} alt="Logo" className="w-20 h-20 " />

        </div>
        {/* Sidebar Navigation */}
        <div className="flex flex-col items-center justify-between h-60">
  <nav className="space-y-4"> {/* Ensure uniform vertical spacing */}
    <Link to="/dashboard" className="flex items-center space-x-2 text-blue-900 hover:text-blue-600">
      <div className="flex items-center justify-center w-10 h-10 bg-[#c7d2fe] rounded-full hover:bg-[#6366f1]">
      <BiPlusMedical style={{ color: "black", fontSize: "25px" }} />
      </div>
    </Link>

    <Link to="/ClassPlane" className="flex items-center space-x-2 text-blue-900 hover:text-blue-600">
      <div className="flex items-center justify-center w-10 h-10 bg-[#c7d2fe] rounded-full hover:bg-[#6366f1]">
        <FaPuzzlePiece   style={{ color: "black", fontSize: "25px" }} />
      </div>
    </Link>

    <Link to="/trainer" className="flex items-center space-x-2 text-blue-900 hover:text-blue-600">
      <div className="flex items-center justify-center w-10 h-10 bg-[#c7d2fe] rounded-full hover:bg-[#6366f1]">
      <FaUser  style={{ color: "black", fontSize: "25px" }} />
      </div>
    </Link>

    <Link to="/Member" className="flex items-center space-x-2 text-blue-900 hover:text-blue-600">
      <div className="flex items-center justify-center w-10 h-10 bg-[#c7d2fe] rounded-full hover:bg-[#6366f1]">
      <FaUserTie  style={{ color: "black", fontSize: "25px" }} />
      </div>
    </Link>
  </nav>
</div>

      </div>
      {/* Profile & Logout */}
      <div>
      <div className="flex flex-col  w-10 h-10  items-center rounded-full m-5 ">
        <img
          src="https://media.istockphoto.com/id/1392528328/photo/portrait-of-smiling-handsome-man-in-white-t-shirt-standing-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=6vUtfKvHhNsK9kdNWb7EJlksBDhBBok1bNjNRULsAYs="
          alt="Profile"
          className="w-10 h-20 rounded-full mb-2  rounded-full"
        />
        
      </div>
      <div
       onClick={logout}
       className=" rounded-full w-10 h-10 bg-[#c7d2fe] hover:bg-[#e2e7f9] m-5 flex items-center justify-center">
      <FontAwesomeIcon icon={faPowerOff} style={{ color: "black", fontSize: "24px" }} />
        </div>
      </div>
    </div>
  );
}
