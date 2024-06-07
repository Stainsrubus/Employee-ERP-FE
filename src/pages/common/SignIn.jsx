import React from 'react'
import bg from '../../assets/company_logo.png'
import logo from '../../assets/company_logo.png'
import { Form,Button } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AxiosService from '../../utils/ApiService'

const SignIn =()=> {
    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")
    let navigate = useNavigate()

    const handleLogin = async(event)=>{
        event.preventDefault(); 
        if (!email || !password) {
          console.log('Please fill all the fields');
          return; 
        }
        try {
          let res = await AxiosService.post(`/employee/login`,{
            email,
            password
          })
          
          if(res.status===200)
          {
            sessionStorage.setItem('token',res.data.token)
            sessionStorage.setItem('employeeData',JSON.stringify(res.data.employeeData))
            
            if(res.data.employeeData.role === 'Admin')
            {
                navigate('/dashboard')
            }
            else
            {
                navigate('/login')
            }
          }
        } catch (error) {
          {error}
        }
      }


  return (
    <>
    <div className=' w-screen absolute h-screen bg-blue-900 bg-cover blur-[5px] md:blur-none'>
      
    </div>
    <div className='flex flex-col h-screen justify-center items-center relative'> 
    <div className='w-1/2 md:w-5/6 absolute '>
    <div className='  gap-5 sm:flex-col sm:h-auto  h-[400px] mt-10  border  border-blue-200 rounded-lg shadow-lg shadow-blue-300 text-white flex' >
    <div className='flex flex-col sm:w-full gap-5 items-center w-1/2 justify-center'>
      <img className='login-brand sm:w-3/4 sm:mt-4' src={logo} alt='Logo' />
      <h1 className='font-pacifico text-5xl sm:text-2xl'>Workflow</h1>

    </div>
    <div className='flex flex-col sm:w-full gap-10 sm:gap-5 w-1/2' >
    <h1 className='text-center font-bold text-xl  pt-5 sm:text-sm sm:pt-1'>Login Here!</h1>
  <Form className='flex flex-col gap-5 sm:gap-1 items-center' onSubmit={handleLogin}>
      <Form.Group className=" mb-3  w-full flex justify-center">
        <Form.Control className='shadow-lg text-black text-bold px-3 outline-none rounded-md h-8  shadow-blue-400 w-3/4 ' type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group> 

      <Form.Group className="mb-3 sm:mb-1 w-full flex justify-center  ">
        <Form.Control  className='w-3/4 outline-none text-black text-bold px-3 shadow-lg rounded-md h-8 shadow-blue-400'type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      <Button variant='primary' className='bg-blue-500 w-20 py-1 mt-8 sm:mt-2 rounded-lg border border-blue-200 shadow-md shadow-blue-300 text-md sm:text-xs font-bold ' type='submit'>
  Login In
</Button>
      <div className='flex py-5  sm:text-xs'>
      <p className='text-center'>Dont have an account? </p> 
      <Link to="/sign-up" className='font-black '> ꧁ SignUp ꧂ </Link>
      </div>
      
    </Form>
  </div>
  </div>
        </div>   
  
     </div>
    </>
  )
}

export default SignIn
