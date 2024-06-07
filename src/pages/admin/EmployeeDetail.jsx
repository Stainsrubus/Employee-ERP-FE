
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AxiosService from '../../utils/ApiService';
import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";
function EmployeeDetail() {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('');


 

const navigate = useNavigate()

  useEffect(() => {
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
    fetchEmployee();
  },[id]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    const randomStatus = Math.random() < 0.5 ? 'Present' : 'Absent';
    setAttendanceStatus(randomStatus);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const enableEditing = () => {
    setIsEditing(true);
  };

  const saveChanges = async () => {
    const dataToSend = {
      name: formData.name,
      designation: formData.designation,
      location: formData.location,
      email: formData.email,
      mobile: formData.mobile,
      ctc: formData.ctc,
      doj: formData.doj,
      noticePeriod: formData.noticePeriod,
      gender: formData.gender, 
      status: formData.status 
    };
    try {
        const res = await AxiosService.put(`employee/editemployee/${id}`, dataToSend);
        if (res.status === 200) {
          setEmployee(res.data.employee);
          setFormData(res.data.employee);
          setIsEditing(false);
          console.log('Employee data updated successfully');
          navigate('/employees')
        }
        else {
          console.error('Error updating employee data:', res.data);
        }
    } catch (error) {
      console.error('Error updating employee data:', error);
    }
  };


 
  return <>
  <div className='flex w-full flex-col justify-center pl-16'>
    <div onClick={()=>{navigate('/employees')}} className='rounded-full bg-blue-500 flex justify-center items-center text-white font-bold text-2xl h-8 w-8 mt-20 mx-5 shadow-xl cursor-pointer hover:scale-125 duration-300 transition '>
    <GoArrowLeft />
    </div>
    <div className="container  flex flex-col justify-center items-center   p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-500">Employee Details</h1>
      <div className="border p-6 rounded-md bg-gray-50 w-5/6">
        <div className="flex justify-between mb-4">
          <p className="text-lg"><strong>ID:</strong></p>
          <p className="text-lg">{employee._id}</p>
        </div>
        <div className="flex justify-between mb-4">
          <label className="text-gray-700"><strong>Name:</strong></label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="ml-2 block w-2/3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          ) : (
            <span className="ml-2">{employee.name}</span>
          )}
        </div>
        <div className="flex justify-between mb-4">
          <label className="text-gray-700"><strong>designation:</strong></label>
          {isEditing ? (
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="ml-2 block w-2/3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          ) : (
            <span className="ml-2">{employee.designation}</span>
          )}
        </div>
        <div className="flex justify-between mb-4">
          <label className="text-gray-700"><strong>Location:</strong></label>
          {isEditing ? (
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="ml-2 block w-2/3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          ) : (
            <span className="ml-2">{employee.location}</span>
          )}
        </div>
        <div className="flex justify-between mb-4">
          <label className="text-gray-700"><strong>Email:</strong></label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="ml-2 block w-2/3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          ) : (
            <span className="ml-2">{employee.email}</span>
          )}
        </div>
        <div className="flex justify-between mb-4">
          <label className="text-gray-700"><strong>Mobile:</strong></label>
          {isEditing ? (
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className="ml-2 block w-2/3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          ) : (
            <span className="ml-2">{employee.mobile}</span>
          )}
        </div>
        <div className="flex justify-between mb-4">
  <label className="text-gray-700"><strong>Gender:</strong></label>
  {isEditing ? (
    <select
      type="text"
      name="gender"
      value={formData.gender}
      onChange={handleInputChange}
      className="ml-2 block w-2/3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    >  <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
</select>
  ) : (
    <span className="ml-2">{employee.gender}</span>
  )}
</div>
<div className="flex justify-between mb-4">
  <label className="text-gray-700"><strong>Status:</strong></label>
  {isEditing ? (
    <select
      type="text"
      name="status"
      value={formData.status}
      onChange={handleInputChange}
      className="ml-2 block w-2/3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    >
    <option value="">Select Status</option>
    <option value="Active">Active</option>
    <option value="Inactive">Inactive</option>
    </select>
  ) : (
    <span className="ml-2">{employee.status}</span>
  )}
</div>
        <div className="flex justify-between mb-4">
          <label className="text-gray-700"><strong>CTC:</strong></label>
          {isEditing ? (
            <input
              type="text"
              name="ctc"
              value={formData.ctc}
              onChange={handleInputChange}
              className="ml-2 block w-2/3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          ) : (
            <span className="ml-2">{employee.ctc}</span>
          )}
        </div>
        {/* <div className="flex justify-between mb-4">
          <label className="text-gray-700"><strong>Date of Joining:</strong></label>
          {isEditing ? (
            <input
              type="date"
              name="doj"
              value={new Date(formData.doj).toISOString().split('T')[0]}
              onChange={handleInputChange}
              className="ml-2 block w-2/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          ) : (
            <span className="ml-2">{new Date(employee.doj).toLocaleDateString()}</span>
          )}
        </div> */}
        <div className="flex justify-between mb-4">
          <label className="text-gray-700"><strong>Notice Period:</strong></label>
          {isEditing ? (
            <select
              type="text"
              name="noticePeriod"
              value={formData.noticePeriod}
              onChange={handleInputChange}
              className="ml-2 block w-2/3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ><option value="">Select NoticePeriod</option>
            <option value="3 months">3 months</option>
            <option value="6 months">6 months</option>    
        </select>
          ) : (
            <span className="ml-2">{employee.noticePeriod}</span>
          )}
        </div>
        {/* <div className="flex justify-between mb-4">
          <label htmlFor="datePicker" className="block text-gray-700"><strong>Select Date:</strong></label>
          <input
            type="date"
            id="datePicker"
            name="datePicker"
            className="ml-2 block w-2/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <p className="text-lg mt-2"><strong>Attendance Status on {selectedDate}:</strong> {attendanceStatus}</p> */}
        <div className="flex justify-center mt-6">
          {!isEditing ? (
            <button onClick={enableEditing} className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
              Enable Editing
            </button>
          ) : (
            <button onClick={saveChanges} className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
              Save
            </button>
          )}
        </div>
      </div>
    </div>
    </div>
  </>;
}

export default EmployeeDetail;
