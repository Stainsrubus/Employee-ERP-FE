import React, { useState } from 'react';
import { MdDashboard, MdGroups, MdOutlineSettingsSuggest } from "react-icons/md";
import { SiCodeblocks } from "react-icons/si";
import { BsProjectorFill, BsFillCalendar2CheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import logo from '../assets/company_logo.png'
function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleSectionClick = (section) => {
    navigate(`/${section}`);
  };

  return <>
    <div className='absolute z-20'>
    <div
      className={`h-[100vh]  fixed  shadow-xl text-white flex flex-col transition-width duration-300 ${
        isHovered ? 'w-48' : 'w-16 '
      } bg-gray-800`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="p-4 text-center text-xl font-pacifico font-bold border-b border-gray-700" onClick={()=>{navigate('/dashboard')}}>
        {isHovered ? 'WorkFlow' :  <img src={logo} alt="" className="w-8 h-7" />}
      </div>
      <div className="flex-grow p-4">
        <nav>
          <ul>
            {[
              { icon: <MdDashboard />, label: 'Dashboard', section: 'dashboard' },
              { icon: <MdGroups />, label: 'Employees', section: 'employees' },
              { icon: <SiCodeblocks />, label: 'Departments', section: 'departments' },
              { icon: <BsProjectorFill />, label: 'Projects', section: 'projects' },
              // { icon: <BsFillCalendar2CheckFill />, label: 'Attendance', section: 'attendance' },
              { icon: <MdOutlineSettingsSuggest />, label: 'Settings', section: 'settings' },
            ].map(({ icon, label, section }) => (
              <li key={section} className="mb-4">
                <div
                  onClick={() => handleSectionClick(section)}
                  className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
                >
                  {icon}
                  <span className={`ml-2 transition-all duration-300 ${isHovered ? 'inline-block' : 'hidden'}`}>
                    {label}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
    </div>
</>;
}

export default Sidebar;
