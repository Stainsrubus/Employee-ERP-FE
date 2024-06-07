import React, { useEffect, useState } from 'react';
import AxiosService from "../../utils/ApiService";
import { GoChevronDown } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from 'react-router';

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ department_name: '', departmentHead: '', peoples: [] });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
const navigate=useNavigate()
  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await AxiosService.get('/department/get');
      setDepartments(response.data.departments || []);
    } catch (error) {
      console.error('Error fetching departments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await AxiosService.get("/employee/getallemployees");
      if (res.status === 200) {
        const fetchedEmployees = res.data.employees || [];
        setEmployees(fetchedEmployees);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePeoplesChange = (e, id) => {
    const { checked } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      peoples: checked ? [...prevForm.peoples, id] : prevForm.peoples.filter(pid => pid !== id)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await AxiosService.put(`/department/update/${editingId}`, form);
      } else {
        await AxiosService.post('/department/create', form);
      }
      setForm({ department_name: '', departmentHead: '', peoples: [] });
      setEditingId(null);
      fetchDepartments();
    } catch (error) {
      console.error('Error saving department:', error);
    }
  };

  const handleEdit = (department) => {
    setForm(department);
    setEditingId(department._id);
  };

  const handleDelete = async (id) => {
    try {
      await AxiosService.delete(`/department/delete/${id}`);
      fetchDepartments();
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDepartmentClick = async (departmentId) => {
    try {
      const res = await AxiosService.get(`/department/get/${departmentId}`);
      const departmentDetails = res.data.department;
      const departmentHead = employees.find((emp) => emp._id === departmentDetails.departmentHead);
      const peoplesNames = departmentDetails.peoples.map((id) => {
        const person = employees.find((emp) => emp._id === id);
        return person ? person.name : 'Unknown';
      });

      setSelectedDepartment({
        ...departmentDetails,
        departmentHeadName: departmentHead ? departmentHead.name : 'Unknown',
        peoplesNames,
      });
    } catch (error) {
      console.error('Error fetching department details:', error);
    }
  };

  const handleCloseDetails = () => {
    setSelectedDepartment(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col justify-center w-full'>
      <div onClick={()=>{navigate('/dashboard')}} className='ml-20  rounded-full bg-blue-500 flex justify-center items-center text-white font-bold text-2xl h-8 w-8 mt-20 mx-5 shadow-xl cursor-pointer hover:scale-125 duration-300 transition '>
    <GoArrowLeft />
    </div>
      <div className="container ml-20 mr-4">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-500">Department List</h1>
        <form onSubmit={handleSubmit} className="mb-8">
          <input
            type="text"
            name="department_name"
            value={form.department_name}
            onChange={handleInputChange}
            placeholder="Department Name"
            required
            className="border p-2 mb-2"
          />
          <select
            name="departmentHead"
            value={form.departmentHead}
            onChange={handleInputChange}
            required
            className="border p-2 mb-2"
          >
            <option value="">Select Department Head</option>
            {employees.map(employee => (
              <option key={employee._id} value={employee._id}>
                {employee.name} - {employee.designation}
              </option>
            ))}
          </select>
          <div className="relative border p-2 mb-2">
            <div
              onClick={toggleDropdown}
              className="border p-2 cursor-pointer flex items-center justify-between"
            >
              <div>
                {form.peoples.length > 0
                  ? form.peoples.map(id => employees.find(emp => emp._id === id)?.name).join(', ')
                  : "Select People"}
              </div>
              <div>
                <GoChevronDown />
              </div>
            </div>
            {dropdownOpen && (
              <div className="absolute z-10 w-full bg-white border p-2 mt-1">
                {employees.map(employee => (
                  <div key={employee._id} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      name="peoples"
                      value={employee._id}
                      checked={form.peoples.includes(employee._id)}
                      onChange={(e) => handlePeoplesChange(e, employee._id)}
                      className="mr-2"
                    />
                    <label>{employee.name} - {employee.designation}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
            {editingId ? 'Update Department' : 'Create Department'}
          </button>
        </form>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Head</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departments.map(department => (
                <tr key={department._id} onClick={() => handleDepartmentClick(department._id)}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">{department.department_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">
                    {employees.find(employee => employee._id === department.departmentHead)?.name} - {employees.find(employee => employee._id === department.departmentHead)?.designation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button onClick={() => handleEdit(department)} className="text-blue-500 hover:text-indigo-900 mr-4">Edit</button>
                    <button onClick={() => handleDelete(department._id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedDepartment && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-30">
            <div className="relative w-5/6 h-[80vh] rounded-xl shadow-xl bg-gray-500/50 px-10 flex justify-center items-center">
              <div className="bg-white flex flex-col shadow h-[80%] p-6 rounded-lg overflow-y-auto w-full relative">
                <div>
                  <button className="absolute top-3 right-3 bg-red-500 text-white rounded-lg font-bold p-2" onClick={handleCloseDetails}>Close</button>
                </div>
                <div className="flex flex-col justify-center h-full">
                  <h2 className="text-2xl font-bold mb-4">Department Details</h2>
                  <table className="w-full table-fixed">
                    <tbody>
                      <tr>
                        <td className="font-semibold py-2 ">Name:</td>
                        <td >{selectedDepartment.department_name}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-2 ">Head:</td>
                        <td>{selectedDepartment.departmentHeadName}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-2">People:</td>
                        <td>
                          {selectedDepartment.peoplesNames.join(', ')}
                        </td>
                      </tr>
                     
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Departments;
