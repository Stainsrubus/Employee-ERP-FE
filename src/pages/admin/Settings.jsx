import React, { useState, useEffect } from 'react';
import AxiosService from '../../utils/ApiService';
import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";
function Settings() {
  const [employee, setEmployee] = useState({});
  const [user, setUser] = useState("");
  const [formData, setFormData] = useState({});
const navigate=useNavigate()
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
        setFormData(res.data.employee);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const saveChanges = async () => {
    const dataToSend = {
      name: formData.name,
      role: formData.role,
      location: formData.location,
      email: formData.email,
      mobile: formData.mobile,
      gender: formData.gender,
      status: formData.status
    };
    try {
      const res = await AxiosService.put(`employee/editemployee/${id}`, dataToSend);
      if (res.status === 200) {
        setEmployee(res.data.employee);
        setFormData(res.data.employee);
        console.log('Employee data updated successfully');
        navigate('/profile');
      } else {
        console.error('Error updating employee data:', res.data);
      }
    } catch (error) {
      console.error('Error updating employee data:', error);
    }
  };

  return (
    <div className='flex justify-center w-full mt-20 flex-col'>
       <div onClick={()=>{navigate('/dashboard')}} className='ml-20 mb-5  rounded-full bg-blue-500 flex justify-center items-center text-white font-bold text-2xl h-8 w-8 mx-5 shadow-xl cursor-pointer hover:scale-125 duration-300 transition '>
    <GoArrowLeft />
    </div>
      <div className="container ml-20 mr-4 bg-gray-100 px-5 py-10 rounded-lg shadow-lg ">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-500">Settings</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4 text-blue-500">Update Profile</h2>
          <div className="flex flex-col space-y-4">
            <div className='flex justify-between items-center'>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleInputChange}
                placeholder="Name"
                className="border p-2 rounded-md w-5/6"
              />
            </div>
            <div className='flex justify-between items-center'>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                placeholder="email"
                className="border p-2 rounded-md w-5/6"
              />
            </div>
            <div className='flex justify-between items-center'>
              <label htmlFor="mobile">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile || ""}
                onChange={handleInputChange}
                placeholder="90xxxxxx80"
                className="border p-2 rounded-md w-5/6"
              />
            </div>
            <div className='flex justify-between items-center'>
              <label htmlFor="role">Role</label>
              <select
                name="role"
                value={formData.role || ""}
                onChange={handleInputChange}
                className="border p-2 rounded-md w-5/6"
              >
                <option value="">--</option>
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
              </select>
            </div>
            <div className='flex justify-between items-center'>
              <label htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location || ""}
                onChange={handleInputChange}
                placeholder="location"
                className="border p-2 rounded-md w-5/6"
              />
            </div>
            <div className='flex justify-between items-center'>
              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                value={formData.gender || ""}
                onChange={handleInputChange}
                className="border p-2 rounded-md w-5/6"
              >
                <option value="">--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className='flex justify-between items-center'>
              <label htmlFor="status">Status</label>
              <select
                name="status"
                value={formData.status || ""}
                onChange={handleInputChange}
                className="border p-2 rounded-md w-5/6"
              >
                <option value="">--</option>
                <option value="Active">Active</option>
                <option value="In Active">In Active</option>
              </select>
            </div>
            <button
              className="bg-blue-500 text-white p-2 rounded-md"
              onClick={saveChanges}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
