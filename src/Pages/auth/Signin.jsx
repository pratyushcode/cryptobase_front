import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import video from "../../assets/bg-3.mp4";

const SignIn = ({ setIsAuthenticated ,isAuthenticated}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch("https://cryptobase-vmyr.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const res = await resp.json();
      localStorage.setItem("token", res.token);
      console.log(res);
      setIsAuthenticated(true);
      if(res.message !="invalid Credentials")navigate("/");
    
    } catch (error) {
      console.log(error);
    } finally {
      setFormData({
        email: '',
        password: ''
      });
    }
  };

  return (
    <div className="relative">
      <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <section className="relative z-10 bg-opacity-75 min-h-screen flex flex-col justify-center items-center">
        <h1 className='text-orange-500 font-require font-bold text-4xl hover:text-orange-400 pb-5' onClick={() => navigate(`/`)}>CRYPTOBASE</h1>
        <div className="w-full bg-black rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 shadow-xl shadow-slate-600">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-amber-500 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-300">Remember me</label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-amber-500 hover:underline dark:text-primary-500">Forgot password?</a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <Link to={"/signup"} className="font-medium text-amber-500 hover:underline dark:text-primary-500">Sign up</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
