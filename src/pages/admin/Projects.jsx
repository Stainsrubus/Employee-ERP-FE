import React, { useEffect, useState } from "react";
import AxiosService from "../../utils/ApiService";
import { GoChevronDown } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from 'react-router';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectID, setNewProjectID] = useState("");
  const [departments, setDepartments] = useState([]);
  const [newProjectDepartment, setNewProjectDepartment] = useState("");
  const [newProjectHead, setNewProjectHead] = useState("");
  const [newProjectCrew, setNewProjectCrew] = useState([]);
  const [newProjectStatus, setNewProjectStatus] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editProjectId, setEditProjectId] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
const navigate=useNavigate()

  useEffect(() => {
    fetchProjects();
    fetchDepartments();
    fetchEmployees();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


  const handleProjectClick = async (projectId) => {
    try {
      const res = await AxiosService.get(`/project/getproject/${projectId}`);
      const projectDetails = res.data.project;
      const department = departments.find((dept) => dept._id === projectDetails.department);
      const projectHead = employees.find((emp) => emp._id === projectDetails.projectHead);
      const projectCrewNames = projectDetails.projectCrew.map((id) => {
        const crewMember = employees.find((emp) => emp._id === id);
        return crewMember ? crewMember.name : 'Unknown';
      });

      setSelectedProject({
        ...projectDetails,
        departmentName: department ? department.department_name : 'Unknown',
        projectHeadName: projectHead ? projectHead.name : 'Unknown',
        projectCrewNames,
      });
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  };


const handleCloseDetails = () => {
    setSelectedProject(null);
};

  const handlePeoplesChange = (e, id) => {
    const { checked } = e.target;
    setNewProjectCrew((prevCrew) => {
        if (checked) {
            return [...prevCrew, id];
        } else {
            return prevCrew.filter((empId) => empId !== id);
        }
    });
};
  const fetchProjects = async () => {
    try {
      const res = await AxiosService.get("/project/getAllProjects");
      setProjects(res.data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await AxiosService.get("/employee/getAllEmployees");
      setEmployees(res.data.employees);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await AxiosService.get("/department/get");
      setDepartments(res.data.departments);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleAddProject = async () => {
    try {
      if (newProjectName && newProjectStatus) {
        const newProject = {
          projectID: newProjectID,
          projectName: newProjectName,
          status: newProjectStatus,
          department: newProjectDepartment,
          projectHead: newProjectHead,
          projectCrew: newProjectCrew,
        };
        let res = await AxiosService.post("/project/createProject", newProject);
        if (res.status === 201) {
          setIsFormOpen(false);
        }
        setNewProjectID("");
        setNewProjectName("");
        setNewProjectStatus("");
        setNewProjectDepartment("");
        setNewProjectHead("");
        setNewProjectCrew([]);
        fetchProjects();
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleEditProject = async (project) => {
    console.log(project)
    setIsFormOpen(true);
    setIsEditing(true);
    setEditProjectId(project._id);
    setNewProjectID(project.projectID);
    setNewProjectName(project.projectName);
    setNewProjectStatus(project.status);
    setNewProjectDepartment(project.department);
    setNewProjectHead(project.projectHead);
    setNewProjectCrew(project.projectCrew);
  };

  const handleSaveEdit = async () => {
    try {
        if (newProjectName && newProjectStatus) {
            const updatedProject = {
                projectID: newProjectID,
                projectName: newProjectName,
                status: newProjectStatus,
                department: newProjectDepartment,
                projectHead: newProjectHead,
                projectCrew: newProjectCrew,
            };
            await AxiosService.put(`/project/editProject/${editProjectId}`, updatedProject); // Corrected endpoint URL
            setNewProjectName("");
            setNewProjectID("")
            setNewProjectStatus("");
            setNewProjectDepartment("");
            setNewProjectHead("");
            setNewProjectCrew([]);
            setIsEditing(false);
            setEditProjectId("");
            setIsFormOpen(false)
            fetchProjects();
        }
    } catch (error) {
        console.error("Error updating project:", error);
    }
};



  const handleDeleteProject = async (id) => {
    try {
      await AxiosService.delete(`/project/delete/${id}`);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  const handleClose =()=>{
    setIsFormOpen(false);
    setIsEditing(false);
    setNewProjectID(null);
    setNewProjectCrew(null)
    setNewProjectDepartment(null)
    setNewProjectHead(null)
    setNewProjectName(null)
    setNewProjectStatus(null)
  }

  const filteredProjects = projects.filter((project) => {
    const matchName = project.projectName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "" || project.status === statusFilter;
    return matchName && matchStatus;
  });
  return (
    <div className="flex w-full flex-col justify-center mt-20">
      <div onClick={()=>{navigate('/dashboard')}} className=' ml-20  rounded-full bg-blue-500 flex justify-center items-center text-white font-bold text-2xl h-8 w-8  mx-5 shadow-xl cursor-pointer hover:scale-125 duration-300 transition '>
    <GoArrowLeft />
    </div>
      <div className="container ml-20 mr-4">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-500">
          Projects
        </h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by project name"
            className="border p-2 rounded-md w-full mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <label className="mr-2">Filter by Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border p-2 rounded-md"
              >
                <option value="">All</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-500 text-white p-2 mb-7 rounded-md"
        >
          Add Project
        </button>
        {isFormOpen && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Project" : "Add New Project"}
            </h2>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Project ID"
                className="border p-2 rounded-md"
                value={newProjectID}
                onChange={(e) => setNewProjectID(e.target.value)}
              />
              <input
                type="text"
                placeholder="Project Name"
                className="border p-2 rounded-md"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
              />
              <select
                value={newProjectStatus}
                onChange={(e) => setNewProjectStatus(e.target.value)}
                className="border p-2 rounded-md"
              >
                <option value="">Select Status</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <select
                value={newProjectDepartment}
                onChange={(e) => setNewProjectDepartment(e.target.value)}
                className="border p-2 rounded-md"
              >
                <option value="">Select Department</option>
                {departments.map((department) => (
                  <option key={department._id} value={department._id}>
                    {department.department_name}
                  </option>
                ))}
              </select>
              <select
                value={newProjectHead}
                onChange={(e) => setNewProjectHead(e.target.value)}
                className="border p-2 rounded-md"
              >
                <option value="">Select Project Head</option>
                {employees.map((employee) => (
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
                    {newProjectCrew.length > 0
                      ? newProjectCrew
                          .map((id) =>
                            employees.find((emp) => emp._id === id)?.name
                          )
                          .join(", ")
                      : "Select People"}
                  </div>
                  <div>
                    <GoChevronDown />
                  </div>
                </div>
                {dropdownOpen && (
                  <div className="absolute z-10 w-full bg-white border p-2 mt-1">
                    {employees.map((employee) => (
                      <div
                        key={employee._id}
                        className="flex items-center mb-2"
                      >
                        <input
                          type="checkbox"
                          name="peoples"
                          value={employee._id}
                          checked={newProjectCrew.includes(employee._id)}
                          onChange={(e) =>
                            handlePeoplesChange(e, employee._id)
                          }
                          className="mr-2"
                        />
                        <label>
                          {employee.name} - {employee.designation}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {isEditing ? (
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-4"
                  >
                    Close
                  </button>
                  <button
                    className="bg-yellow-500 text-white p-2 rounded-md"
                    onClick={handleSaveEdit}
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-4"
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-500 text-white p-2 rounded-md"
                    onClick={handleAddProject}
                  >
                    Add Project
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProjects.map((project) => (
                <tr key={project._id}>
                  <td onClick={() => handleProjectClick(project._id)} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {project.projectID}
                  </td>
                  <td onClick={() => handleProjectClick(project._id)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.projectName}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      project.status === "Completed"
                        ? "text-green-600"
                        : project.status === "In Progress"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {project.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <button
                      className=" text-blue-500 hover:text-gray-700 font-bold py-2 px-4 rounded mr-2"
                      onClick={() => handleEditProject(project)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:text-gray-700 font-bold py-2 px-4 rounded"
                      onClick={() => handleDeleteProject(project._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selectedProject && (
             <div className="fixed inset-0 flex justify-center items-center md:pl-14  bg-gray-900 bg-opacity-50 z-30">
             <div className="relative w-5/6  h-[80vh] rounded-xl shadow-xl bg-gray-500/50 px-10 flex justify-center items-center">
                 <div className="bg-white flex flex-col shadow h-[80%] p-6 rounded-lg overflow-y-auto w-full relative">
                     <div>
                     <button className="absolute top-3 right-3 bg-red-500 text-white rounded-lg font-bold p-2" onClick={handleCloseDetails}>Close</button>
                     </div>
                     <div className="flex flex-col justify-center h-full">
                     <h2 className="text-2xl font-bold mb-4">Project Details</h2>
                     <table className="w-full table-fixed">
                         <tbody>
                             <tr>
                                 <td className="font-semibold py-2">Project ID:</td>
                                 <td>{selectedProject.projectID}</td>
                             </tr>
                             <tr>
                                 <td className="font-semibold py-2">Project Name:</td>
                                 <td>{selectedProject.projectName}</td>
                             </tr>
                             <tr>
                                 <td className="font-semibold py-2">Status:</td>
                                 <td>{selectedProject.status}</td>
                             </tr>
                             <tr>
                                 <td className="font-semibold py-2">Department:</td>
                                 <td>{selectedProject.departmentName}</td>
                             </tr>
                             <tr>
                                 <td className="font-semibold py-2">Project Head:</td>
                                 <td>{selectedProject.projectHeadName}</td>
                             </tr>
                             <tr>
                                 <td className="font-semibold py-2">Project Crew:</td>
                                 <td> {selectedProject.projectCrewNames.join(', ')}</td>
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
export default Projects;
