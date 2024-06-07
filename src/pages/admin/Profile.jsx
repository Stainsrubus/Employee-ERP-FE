import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaUserTag,FaIdBadge } from "react-icons/fa";
import AxiosService from "../../utils/ApiService";
import { GoAlertFill } from "react-icons/go";
const Profile = () => {
    const [employee,setEmployee]=useState("")
  const [user, setUser] = useState("");
 
  useEffect(() => {
    const empData = sessionStorage.getItem("employeeData");
    if (empData) {
      setUser(JSON.parse(empData));
    }
  }, []);

  const id = user._id;

  const fetchEmployee = async () => {
    try {
      const res = await AxiosService.get(`employee/getemployees/${id}`);
      if (res.status === 200) {
        setEmployee(res.data.employee);
      }
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchEmployee();
    }
  }, [id]);
  return (
    <div className="profile-container text-black mt-20 flex w-full justify-center">
      <div className="md:w-5/6 w-1/2 sm:w-5/6 ml-20 mr-4 bg-gray-100 px-5 py-10 shadow-xl shadow-indigo-200 rounded-lg">
        <h2 className="text-4xl font-bold mb-6 text-center text-indigo-600">Profile Details</h2>
        <div className="profile-details text-xl space-y-6 pt-10">
        <div className="flex items-center space-x-10">
            <FaIdBadge className="text-2xl text-indigo-600" />
            <div className="flex text-lg w-full justify-between">
              <div className="w-1/2">
              <p className="font-semibold">Employee ID</p>
              </div>
              <div className="flex justify-start w-1/2">
              <p className="pl-4">{employee._id}</p>
              </div>
              
            </div>
          </div>
          <div className="flex items-center space-x-10">
            <FaUser className="text-2xl text-indigo-600" />
            <div className="flex text-lg w-full justify-between">
              <div className="w-1/2">
              <p className="font-semibold">Name</p>
              </div>
              <div className="flex justify-start w-1/2">
              <p className="pl-4">{employee.name}</p>
              </div>
              
            </div>
          </div>
          <div className="flex items-center space-x-10">
            <FaEnvelope className="text-indigo-600 text-2xl" />
            <div className="flex text-lg w-full justify-between">
              <div className="w-1/2">
              <p className="font-semibold">Email</p>
              </div>
              <div className="flex justify-start w-1/2">
              <p className="pl-4">{employee.email}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-10">
            <FaPhone className="text-indigo-600 text-2xl" />
            <div className="flex text-lg w-full justify-between">
            <div className="w-1/2">
              <p className="font-semibold ">Mobile</p>
              </div>
              <div className="flex justify-start w-1/2">
              <p className="pl-4 ">{employee.mobile}</p>
              </div>
            
            </div>
          </div>
          <div className="flex items-center space-x-10">
            <FaUserTag className=" text-indigo-600 text-2xl " />
            <div className="flex text-lg w-full justify-between ">
              <div className="w-1/2">
              <p className="font-semibold">Role</p>
              </div>
              <div className="flex justify-start w-1/2">
              <p className="pl-4">{employee.role}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center flex justify-center items-center">
          <div className="mt-10  bg-yellow-200/50 rounded flex items-center gap-4 px-3 py-1 ">
          <GoAlertFill />
        <p className="">Go to settings for updating the profile</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Profile;
