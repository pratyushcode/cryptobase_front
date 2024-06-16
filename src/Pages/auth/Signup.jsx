import React from 'react';
import { Link } from 'react-router-dom';
import vedio from "../../assets/bg-3.mp4";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const SignUp = () => {
    const navigate=useNavigate();
  const [formData,setformData]=useState(
    {
      email:'',
      name:'',
      password:''
    }
  )

  const handleInputChange=(event)=>
    {
      const name=event.target.name;
      const value=event.target.value;
      setformData(
        {
          ...formData,
          [name]:value
        }
      )
    }

    const handleSubmit=async(e)=>
      {
        e.preventDefault();
        // console.log("email",formData.email)
        // console.log("name",formData.name)
        // console.log("password",formData.password)
        try {
           const resp= await fetch("https://cryptobase-vmyr.onrender.com/api/user/signup",
            {
              method:"POST",
              headers:{
                "Content-Type":"application/JSON"                
              },
              body:JSON.stringify(formData)
            }
          )
          const res=await resp.json();
          console.log(res);
          navigate("/signin");
                    
        } catch (error) {
          console.log(error);
        }
        finally{
          setformData({
            email:"",
            name:"",
            password:""
          })
        }
      }


  return (
    <div className="relative">
      <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted>
        <source src={vedio} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <section className="relative z-10 bg-opacity-75 min-h-screen flex flex-col justify-center items-center">
        <h1 className='text-orange-500 font-require font-bold text-4xl hover:text-orange-400 pb-5' onClick={() => history(`/`)}>CRYPTOBASE</h1>
        <div className="w-full bg-black rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 shadow-xl shadow-slate-600">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-amber-500 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-amber-500 dark:text-white">Your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
             
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-amber-500 dark:text-white">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-amber-500 dark:text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              {/* <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-amber-500 dark:text-white">Confirm password</label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div> */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-amber-500 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <Link to={"/signin"} className="font-medium text-amber-500 hover:underline dark:text-primary-500">Login here</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
