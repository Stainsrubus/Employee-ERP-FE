import React from "react";
import bg from "../../assets/company_logo.png";
import logo from "../../assets/company_logo.png";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AxiosService from "../../utils/ApiService";

function SignUp() {
  const [email,setEmail]=useState("")
  const [name,setName] = useState("")
  const [mobile, setMobile]=useState("")
  const [password,setPassword]=useState("")
  const [role,setRole]=useState("")

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log( name,
      email,
      mobile,
      role,
      password)
    try {
      const res = await AxiosService.post(
        "employee/signup",{
        name,
        email,
        mobile,
        role,
        password
      })
      if(res.status===201){
        navigate('/login')
      }
    } catch (error) {
      console.error(error);
    }
};

  return (
    <>
      <div className=" w-screen  bg-blue-900 absolute h-screen bg-custom-bg bg-cover blur-[5px]"></div>
      <div className="flex flex-col h-screen justify-center items-center relative">
        <div className="w-1/2 md:w-5/6 absolute">
          <div className='  gap-5 sm:flex-col   h-auto mt-10  border  border-blue-200 rounded-lg shadow-lg shadow-blue-300 text-white flex'>
            <div className="flex flex-col sm:w-full gap-5 items-center w-1/2 justify-center">
              <img className="login-brand sm:w-3/4 sm:mt-4" src={logo} alt="Logo" />
              <h1 className="font-pacifico text-5xl sm:text-2xl">Workflow</h1>
            </div>
            <div className="flex flex-col sm:w-full gap-10 sm:gap-5 w-1/2">
              <h1 className="text-center font-bold text-xl  pt-5 sm:text-sm sm:pt-1">
                Create New Account
              </h1>
              <Form className="flex flex-col gap-5 sm:gap-1 items-center" onSubmit={handleSubmit}>
                <Form.Group className=" mb-3  w-full flex justify-center">
                  <Form.Control
                    className="shadow-lg text-black text-bold px-3 outline-none rounded-md h-8  shadow-blue-400 w-3/4 "
                    type="text"
                    name="name" 
                    placeholder="Enter Name "
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3 sm:mb-1 w-full flex justify-center ">
                  <Form.Control
                    className="w-3/4 outline-none text-black text-bold px-3 shadow-lg rounded-md h-8 shadow-blue-400"
                    type="email"
                    name="email" 
                    placeholder="Ex: xxx@example.com"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3  w-full flex justify-center">
                  <Form.Control
                    className="shadow-lg text-black text-bold px-3 outline-none rounded-md h-8  shadow-blue-400 w-3/4 "
                    type="text"
                    name="mobile" 
                    placeholder="Ex: 92xxxxxx89"
                    value={mobile}
                    onChange={(e)=>setMobile(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3  w-full flex justify-center">
                  <Form.Control
                    className="shadow-lg text-black text-bold px-3 outline-none rounded-md h-8  shadow-blue-400 w-3/4 "
                    type="password"
                    name="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3  w-full flex justify-center">
               
                  <Form.Select
                  name="role" 
                    className="shadow-lg  text-blac outline-none rounded-md h-8  shadow-blue-400 w-3/4 "
                    defaultValue=""
                    value={role}
                    onChange={(e)=>setRole(e.target.value)}
                  >
                    <option    value="" disabled selected>
                    Select Role
                    </option>
                    <option value="Admin">Admin</option>
                    <option   value="Employee">Employee</option>
                  </Form.Select>
                </Form.Group>
                <div className="flex justify-center mt-5">
                  <Button
                  type="submit"
                    className="bg-blue-500 w-20 py-1 mt-8 sm:mt-2 rounded-lg border border-blue-200 shadow-md shadow-blue-300 text-md sm:text-xs font-bold "
                    variant="primary"
                  >
                    SignUp
                  </Button>
                </div>
                <div className="flex py-5  sm:text-xs">
                  <p className="text-center">Already have an account? </p>
                  <Link to="/login" className="font-black ">
                    {" "}
                    ꧁ SignIn ꧂{" "}
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
