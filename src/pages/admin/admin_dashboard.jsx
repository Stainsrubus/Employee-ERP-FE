import React from 'react';
import { useNavigate} from 'react-router-dom';
import { MdDashboard, MdGroups, MdOutlineSettingsSuggest } from "react-icons/md";
import { SiCodeblocks } from "react-icons/si";
import { BsProjectorFill, BsFillCalendar2CheckFill } from "react-icons/bs";

function admin_dashboard() {
  const navigate=useNavigate()
  return <>
  <div className='flex justify-center w-full mx-16 mt-20'>
    <div className="p-6  bg-gray-100 min-h-[90vh] w-full">
    <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-500">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 shadow rounded cursor-pointer" onClick={()=>{navigate('/overview')}}>
          <div className="flex items-center">
            <MdDashboard className="text-4xl text-blue-500" />
            <div className="ml-4">
              <h2 className="text-xl font-bold">Overview</h2>
              <p className="text-gray-500">General statistics</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 shadow rounded cursor-pointer"  onClick={()=>{navigate('/employees')}}>
          <div className="flex items-center">
            <MdGroups className="text-4xl text-green-500" />
            <div className="ml-4">
              <h2 className="text-xl font-bold">Employees</h2>
              <p className="text-gray-500">Manage employees</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 shadow rounded cursor-pointer" onClick={()=>{navigate('/departments')}}>
          <div className="flex items-center">
            <SiCodeblocks className="text-4xl text-red-500" />
            <div className="ml-4">
              <h2 className="text-xl font-bold">Departments</h2>
              <p className="text-gray-500">Manage departments</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 shadow rounded cursor-pointer" onClick={()=>{navigate('/projects')}}>
          <div className="flex items-center">
            <BsProjectorFill className="text-4xl text-yellow-500" />
            <div className="ml-4">
              <h2 className="text-xl font-bold">Projects</h2>
              <p className="text-gray-500">Manage projects</p>
            </div>
          </div>
        </div>

        {/* <div className="bg-white p-4 shadow rounded">
          <div className="flex items-center">
            <BsFillCalendar2CheckFill className="text-4xl text-purple-500" />
            <div className="ml-4">
              <h2 className="text-xl font-bold">Attendance</h2>
              <p className="text-gray-500">Manage attendance</p>
            </div>
          </div>
        </div> */}

        <div className="bg-white p-4 shadow rounded cursor-pointer" onClick={()=>{navigate('/settings')}}>
          <div className="flex items-center">
            <MdOutlineSettingsSuggest className="text-4xl text-gray-500" />
            <div className="ml-4">
              <h2 className="text-xl font-bold">Settings</h2>
              <p className="text-gray-500">Application settings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Recent Activities</h2>
        <ul className="space-y-4">
          <li className="p-4 bg-gray-50 rounded shadow-sm">Activity 1: Description</li>
          <li className="p-4 bg-gray-50 rounded shadow-sm">Activity 2: Description</li>
          <li className="p-4 bg-gray-50 rounded shadow-sm">Activity 3: Description</li>
          <li className="p-4 bg-gray-50 rounded shadow-sm">Activity 4: Description</li>
        </ul>
      </div>
    </div>
    </div>
  </>;
}

export default admin_dashboard;
