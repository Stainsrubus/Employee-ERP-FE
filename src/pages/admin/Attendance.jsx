// import React, { useEffect, useState } from 'react';
// import AxiosService from '../../utils/ApiService';

// const initialEmployees = [
//   { id: 1, name: 'John Doe' },
//   { id: 2, name: 'Jane Smith' },
//   { id: 3, name: 'Michael Williams' },
//   { id: 4, name: 'Alice Johnson' },
//   { id: 5, name: 'David Miller' },
//   { id: 6, name: 'Emily Garcia' },
//   { id: 7, name: 'Robert Brown' },
//   { id: 8, name: 'Sarah Jones' },
//   { id: 9, name: 'Matthew Hernandez' },
//   { id: 10, name: 'Ashley Davis' },
//   { id: 11, name: 'Daniel Lee' },
//   { id: 12, name: 'Elizabeth Moore' },
//   { id: 13, name: 'Christopher Clark' },
//   { id: 14, name: 'Amanda Garcia' },
//   { id: 15, name: 'Joseph Wilson' },
//   { id: 16, name: 'Katherine Allen' },
//   { id: 17, name: 'Nicholas Hernandez' },
//   { id: 18, name: 'Jennifer Lopez' },
//   { id: 19, name: 'Andrew Young' },
//   { id: 20, name: 'Margaret Walker' },
// ];



// function Attendance() {
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [dateFilter, setDateFilter] = useState('');
//   const [selectedDate, setSelectedDate] = useState('');
//  const [employees, setEmployees] = useState([]);
 
//   const getallemployees = async () => {
//     try {
//       const res = await AxiosService.get("/employee/getAllEmployees");
//       if (res.status === 200) {
//         const fetchedEmployees = res.data.employees || []; 
//         setEmployees(fetchedEmployees.map(employee => ({ 
//           id: employee.id,
//           name: employee.name,
//           attendance: [] 
//         })));
//       }
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//     }
//   };
//   useEffect(() => {
//     getallemployees();
//   }, []);

//   const markAttendance = (date, status) => {
//     const newRecords = initialEmployees.map(employee => ({
//       id: employee.id,
//       name: employee.name,
//       date: date,
//       status: status[employee.id] || 'Absent'
//     }));
//     setAttendanceRecords([...attendanceRecords, ...newRecords]);
//   };

//   const handleMarkAttendance = () => {
//     const status = {};
//     initialEmployees.forEach(employee => {
//       const value = document.querySelector(`input[name="attendance-${employee.id}"]:checked`);
//       status[employee.id] = value ? value.value : 'Absent';
//     });
//     markAttendance(selectedDate, status);
//   };

//   const filteredRecords = attendanceRecords.filter(record => {
//     const matchName = record.name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchDate = dateFilter === '' || record.date === dateFilter;
//     return matchName && matchDate;
//   });

//   return <>
// <div className='flex justify-center mt-20'>
//     <div className="container ml-20 mr-4 overflow-scroll bg-gray-100 rounded-lg">
// <h1 className=" py-5 text-4xl font-extrabold mb-8 text-center text-indigo-600">Attendance Records</h1>
//       <div className="mb-4 px-5">
//         <label className="block mb-2">Select Date:</label>
//         <input
//           type="date"
//           className="border p-2 rounded-md w-full"
//           value={selectedDate}
//           onChange={e => setSelectedDate(e.target.value)}
//         />
//       </div>
//       <div className="mb-8 px-5">
//         <h2 className="text-xl font-bold mb-4">Mark Attendance</h2>
//         {initialEmployees.map(employee => (
//           <div key={employee.id} className="flex items-center mb-2">
//             <span className="w-1/3">{employee.name}</span>
//             <label className="mr-4">
//               <input
//                 type="radio"
//                 name={`attendance-${employee.id}`}
//                 value="Present"
//                 className="mr-2"
//               />
//               Present
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name={`attendance-${employee.id}`}
//                 value="Absent"
//                 className="mr-2"
//               />
//               Absent
//             </label>
//           </div>
//         ))}
//         <button
//           className="bg-blue-500 text-white p-2 rounded-md"
//           onClick={handleMarkAttendance}
//         >
//           Save Attendance
//         </button>
//       </div>
//       <div className="flex justify-between mb-4">
//         <input
//           type="text"
//           placeholder="Search by name"
//           className="border p-2 rounded-md w-1/3"
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
//         />
//         <div className="flex items-center">
//           <label className="mr-2">Filter by Date:</label>
//           <input
//             type="date"
//             className="border p-2 rounded-md"
//             value={dateFilter}
//             onChange={e => setDateFilter(e.target.value)}
//           />
//         </div>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 ID
//               </th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Name
//               </th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date
//               </th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredRecords.map(record => (
//               <tr key={record.id + record.date}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.id}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.name}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
//                 <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${record.status === 'Present' ? 'text-green-600' : 'text-red-600'}`}>{record.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//     </div>
//   </>;
// }

// export default Attendance;