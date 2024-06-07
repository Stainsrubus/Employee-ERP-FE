import React, { useState, useEffect, useRef } from "react";
import { FaBell } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate} from 'react-router-dom';
import useLogout from "../Hooks/useLogout";

function NavBar() {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const logout = useLogout()
  const handleNotificationClick = () => {
    setNotificationOpen(!notificationOpen);
    setProfileOpen(false);
  };
  const navigate=useNavigate();

  const handleProfileClick = () => {
    setProfileOpen(!profileOpen);
    setNotificationOpen(false);
  };

  const closeDropdowns = () => {
    setNotificationOpen(false);
    setProfileOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        closeDropdowns();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let timer;
    if (notificationOpen || profileOpen) {
      timer = setTimeout(() => {
        closeDropdowns();
      }, 10000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [notificationOpen, profileOpen]);

  return (
    <div className="relative">
      <div className="w-full h-12 z-20 pl-16 fixed bg-gray-300 flex items-center justify-end shadow-lg">
        <div className="flex gap-5 pr-10">
          <button
            className="hover:scale-110 duration-300 transition"
            onClick={handleNotificationClick}
            ref={notificationRef}
          >
            <FaBell />
            {notificationOpen && (
              <div className=" absolute  mt-2 right-10 w-48 bg-white shadow-lg rounded-lg">
                <ul>
                  <li className="p-2 text-xs border-b">No notificatioin available right now</li>
                
                </ul>
              </div>
            )}
          </button>
          <button
            className="hover:scale-110  duration-300 transition"
            onClick={handleProfileClick}
            ref={profileRef}
          >
            <BsPersonCircle />
            {profileOpen && (
              <div className="hover:scale-100 absolute mt-2 right-5 w-48 bg-white shadow-lg rounded-lg">
                <ul>
                  <li onClick={()=>{navigate('/profile')}} className="p-2 text-xs border-b hover:bg-gray-100 hover:rounded-lg ">Profile</li>
                  <li onClick={()=>{navigate('/settings')}} className="p-2 text-xs border-b hover:bg-gray-100 ">Settings</li>
                  <li onClick={logout} className="p-2 text-xs hover:bg-gray-100 hover:rounded-lg">Logout</li>
                </ul>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
