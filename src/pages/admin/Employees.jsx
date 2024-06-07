import React, { useState, useEffect } from "react";
import AxiosService from "../../utils/ApiService";
import { Link, useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
function Employee() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [designationFilter, setdesignationFilter] = useState("");
  const [employeesData, setEmployeesData] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate=useNavigate()
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    designation: "",
    password: "",
    location: "",
    gender: "",
    email: "",
    mobile: "",
    image: "",
    department: "",
    ctc: "",
    doj: "",
    role:"",
    status: "",
    noticePeriod: "",
    attendance: []
  });
  const [departments, setDepartments] = useState([]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };
  const getDepartments = async () => {
    try {
      let res = await AxiosService.get("/department/get");
      if (res.status === 200) {
        setDepartments(res.data.departments || []);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };
  const getallemployees = async () => {
    try {
      let res = await AxiosService.get("/employee/getallemployees");
      console.log(res);
      if (res.status === 200) {
        const fetchedEmployees = res.data.employees || [];
        setEmployeesData(fetchedEmployees);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    getallemployees();
    getDepartments();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await AxiosService.post("/employee/create", newEmployee);
      if (res.status === 201) {
        console.log('Created')
        setIsFormOpen(false);
        getallemployees();
        setNewEmployee({
          name: "",
          designation: "",
          password: "",
          location: "",
          gender: "",
          email: "",
          mobile: "",
          image: "",
          department: "",
          ctc: "",
          doj: "",
          status: "",
          role:"",
          noticePeriod: "",
          attendance: []
        });
       
      }
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  const filteredEmployees = employeesData.filter((employee) => {
    const matchName = employee.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchLocation =
      locationFilter === "" || employee.location === locationFilter;
    const matchdesignation = designationFilter === "" || employee.designation === designationFilter;
    return matchName && matchLocation && matchdesignation;
  });
  const uniqueLocations = [
    ...new Set(employeesData.map((employee) => employee.location)),
  ];
  const uniquedesignations = [
    ...new Set(employeesData.map((employee) => employee.designation)),
  ];
  const handleDeleteEmployee = async (employeeId) => {
    try {
        const response = await AxiosService.delete(`/employee/delete/${employeeId}`);
        if (response.status === 200) {
            getallemployees();
            console.log(`Employee with ID ${employeeId} deleted successfully`);
        }
    } catch (error) {
        console.error(`Error deleting employee with ID ${employeeId}:`, error);
    }
};

  return <>
<div className="flex flex-col justify-center">
<div onClick={()=>{navigate('/dashboard')}} className=' ml-20  rounded-full bg-blue-500 flex justify-center items-center text-white font-bold text-2xl h-8 w-8 mt-20 mx-5 shadow-xl cursor-pointer hover:scale-125 duration-300 transition '>
    <GoArrowLeft />
    </div>
    <div className="container pl-20 pr-4 ">
    <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-500">Employees List</h1>
      <div className="flex justify-between mb-4 md:flex-col gap-5">
        <div className="flex items-center">
        <label className="mr-2">Search by Name:</label>
        <input
          type="text"
          placeholder="Search by name"
          className="border p-2 rounded-md w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        </div>
      
        <div className="flex items-center">
          <label className="mr-2">Filter by Location:</label>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="border p-2 rounded-md mr-4"
          >
            <option value="">All</option>
            {uniqueLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          </div>
          <div className="flex items-center">
          <label className="mr-2">Filter by designation:</label>
          <select
            value={designationFilter}
            onChange={(e) => setdesignationFilter(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="">All</option>
            {uniquedesignations.map((designation) => (
              <option key={designation} value={designation}>
                {designation}
              </option>
            ))}
          </select>
          </div>
      </div>
      <button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-500 text-white p-2 mb-7 rounded-md"
          >
            Create Employee
          </button>
          
          {isFormOpen && (
            
            <div className="absolute z-30 bg-gray-100 w-[90vw] px-5 py-5 rounded-xl -mt-3 border-none outline-none ">
          <form onSubmit={handleFormSubmit}>
                <h2 className="text-2xl font-bold mb-4">Create Employee</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={newEmployee.name}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">designation:</label>
                  <input
                    type="text"
                    name="designation"
                    value={newEmployee.designation}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={newEmployee.password}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Location:</label>
                  <input
                    type="text"
                    name="location"
                    value={newEmployee.location}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Gender:</label>
                  <select
                    name="gender"
                    value={newEmployee.gender}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md w-full"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                
                  </select>
                  </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={newEmployee.email}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Mobile:</label>
                  <input
                    type="text"
                    name="mobile"
                    value={newEmployee.mobile}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Image:</label>
                  <input
                    type="text"
                    name="image"
                    value={newEmployee.image}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Department:</label>
                  <select
                    name="department"
                    value={newEmployee.department}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md w-full"
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((department) => (
                      <option key={department._id} value={department._id}>
                        {department.department_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">CTC:</label>
                  <input
                    type="text"
                    name="ctc"
                    value={newEmployee.ctc}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Date of Joining:</label>
                  <input
                    type="date"
                    name="doj"
                    value={newEmployee.doj}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Status:</label>
                  <select
                    name="status"
                    value={newEmployee.status}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md w-full"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Role:</label>
                  <select
                    name="role"
                    value={newEmployee.role}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md w-full"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Employee">Employee</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Notice Period:</label>
                  <select
                    type="text"
                    name="noticePeriod"
                    value={newEmployee.noticePeriod}
                    onChange={handleInputChange}
                    className="border p-2 rounded-md w-full"
                    required
                  > <option value="">Select NoticePeriod</option>
                  <option value="Male">3 months</option>
                  <option value="Female">6 months</option>    
              </select>
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md mr-4"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Create
                  </button>
                </div>
              </form>
              </div>
          )}
           <div className="overflow-x-auto">
           <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className=" px-2 py-2 text-gray-500 uppercase tracking-wider">S.No</th>
            <th className=" px-2 py-2 text-gray-500 uppercase tracking-wider">Name</th>
            <th className=" px-2 py-2 text-gray-500 uppercase tracking-wider">designation</th>
            <th className=" px-2 py-2 text-gray-500 uppercase tracking-wider">Location</th>
            <th className=" px-2 py-2 text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredEmployees.map((employee,index) => (
            <tr key={employee._id} >
              {" "}
              <td className=" whitespace-nowrap text-sm  px-2 py-2">{index + 1}</td>
             
              <td className=" whitespace-nowrap text-sm  px-2 py-2">
              <Link to={`/getemployees/${employee._id}`}>{employee.name}</Link>
              </td>
              <td className=" whitespace-nowrap text-sm  px-2 py-2">
                {employee.designation}
              </td>
              <td className=" whitespace-nowrap text-sm  px-2 py-2">
                {employee.location}
              </td>
             
        <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button onClick={()=>{navigate(`/getemployees/${employee._id}`)}} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                    <button onClick={() => handleDeleteEmployee(employee._id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </div>
 </>;
}
export default Employee;
