import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Dashboard from "../pages/admin/admin_dashboard";
import Employees from "../pages/admin/Employees";
import Settings from "../pages/admin/Settings";
import Departments from "../pages/admin/Departments";
// import Attendance from "../pages/admin/Attendance";
import Projects from "../pages/admin/Projects";
import EmployeeDetail from "../pages/admin/EmployeeDetail";
import Overview from "../pages/admin/Overview";
import Profile from "../pages/admin/Profile";
import Sidebar from '../components/Sidebar';
import SignIn from '../pages/common/SignIn';
import SignUp from '../pages/common/SignUp';
import useLogout from '../Hooks/useLogout';
import { useEffect } from 'react';
import NavBar from '../components/NavBar';

function AppRoutes() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token && window.location.pathname !== '/') {
            sessionStorage.clear();
            navigate('/');
        }
    }, [sessionStorage.getItem('token')]);

    const isAuthenticated = sessionStorage.getItem('token');

    return <>
        
            <>
                <Routes>
                    <Route path='/' element={<SignIn />}/>
                    <Route path="/login" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Routes>
            </>
            <>
                <NavBar />
                <div className="flex">
                    <Sidebar />
                    <div className="flex-grow">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
                                }
                            />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/employees" element={<Employees />} />
                            <Route path="/getemployees/:id" element={<EmployeeDetail />} />
                            <Route path="/departments" element={<Departments />} />
                            <Route path="/projects" element={<Projects />} />
                            {/* <Route path="/attendance" element={<Attendance />} /> */}
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/overview" element={<Overview />} />
                            <Route path="/profile" element={<Profile />} />
                        </Routes>
                    </div>
                </div>
            </>
            </>
}

export default AppRoutes;
