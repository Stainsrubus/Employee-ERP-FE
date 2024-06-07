import React, { useState, useEffect } from 'react';
import AxiosService from '../../utils/ApiService';
import { FaUsers, FaBuilding, FaCheckCircle } from 'react-icons/fa';
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from 'react-router';
const Overview = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalDepartments, setTotalDepartments] = useState(0);
const [attendanceToday, setAttendanceToday] = useState(0);
const navigate=useNavigate()
  useEffect(() => {
    getOverviewData();
  }, []);

  const getOverviewData = async () => {
    try {
      const employeeRes = await AxiosService.get('/employee/getallemployees');
      const departmentRes = await AxiosService.get('/department/get');
    //   const attendanceRes = await AxiosService.get('/attendance/gettoday');
      if (employeeRes.status === 200) {
        setTotalEmployees(employeeRes.data.employees.length);
        console.log(totalEmployees)
      }
      if (departmentRes.status === 200) {
        setTotalDepartments(departmentRes.data.departments.length);
      }
    //   if (attendanceRes.status === 200) {
        // setAttendanceToday(attendanceRes.data.length);
       
    //   }
    } catch (error) {
      console.error('Error fetching overview data:', error);
    }
  };

  return (
    <div className=" flex flex-col container mx-auto mt-20 items-center w-full h-[90vh] ">
        <div className=' flex w-full justify-start'>
         <div onClick={()=>{navigate('/dashboard')}} className=' rounded-full bg-indigo-600 flex justify-center items-center text-white font-bold text-2xl h-8 w-8  mx-20 shadow-xl cursor-pointer hover:scale-125 duration-300 transition '>
    <GoArrowLeft />
    </div>
    </div>
    <div className='w-5/6 md:pl-8'>
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-600">Dashboard Overview</h1>
      <div className="grid grid-cols-1 gap-6">
        <div onClick={()=>{navigate('/employees')}} className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-4 bg-indigo-100 text-indigo-600 rounded-full">
              <FaUsers size={32} />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{totalEmployees}</h2>
              <p className="text-gray-600">Total Employees</p>
            </div>
          </div>
        </div>
        <div onClick={()=>{navigate('/departments')}} className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-4 bg-green-100 text-green-600 rounded-full">
              <FaBuilding size={32} />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{totalDepartments}</h2>
              <p className="text-gray-600">Total Departments</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-4 bg-yellow-100 text-yellow-600 rounded-full">
              <FaCheckCircle size={32} />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{totalEmployees-1}</h2>
              <p className="text-gray-600">Today's Attendance</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Overview;
