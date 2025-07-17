import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import Container from '../../Components/Shared/Container';
import { saveUserInDb } from '../../Api/Utilities';
import Loading from '../../Components/Shared/Loading/Loading';
import toast from 'react-hot-toast';

const LogIn = () => {
    const {theme,signInWithGoogle,logIn,loading}=useAuth();
    const [showPassword,setShowPassword]=useState(false);
     const [creating, setCreating]=useState(false);
    const location=useLocation();
    const navigate=useNavigate();
    
    const handleLogin=async(e)=>{
        e.preventDefault();
        const form=e.target;
        const email=form.email.value;
        const password=form.password.value;
        try {
            setCreating(true)
             //User Login
             const result = await logIn(email, password)
            console.log(result);
             const userData = {
               name: result?.user?.displayName,
               email: result?.user?.email,
               image: result?.user?.photoURL,
             }
             // update user
             const res= await saveUserInDb(userData)
             console.log(res);
            if(res.modifiedCount){
                toast.success('Login Successful')
                form.reset();
                console.log("Redirecting to:", location?.state?.from?.pathname);
                navigate(location?.state?.from?.pathname || "/");
            }
          
           } catch (err) {
             console.log(err)
             toast.error(err?.message)
           }
           finally{
              setCreating(false)
           }
         }
        
    
     // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
      const result = await signInWithGoogle()
      const userData = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        image: result?.user?.photoURL,
      }
      const res=await saveUserInDb(userData)
      if(res.insertedId || res.modifiedCount){
      toast.success('Signup Successful')
      console.log("Redirecting to:", location?.state?.from?.pathname);
      navigate(location?.state?.from?.pathname || "/");
      }
    
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }
  if(loading){
        return <Loading height={true}/>
    }
    return (
         <Container>
            <div className={`mx-auto card w-full max-w-lg shrink-0 shadow border border-gray-200 my-10 py-5 ${theme==="dark" ? 'bg-[#0a0e19]' :''}`}>
      <div className='px-6'>
        <h1 className="text-3xl font-bold mt-5">Welcome Back!</h1>
      <p className='mt-2'>Log in to continue exploring AppOrbit.</p>
      </div>
      <div className="card-body">
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor='email' className="label text-lg font-semibold mb-2">Email</label>
            <input
            id='email'
              type="email"
              name="email"
              className="input input-bordered w-full text-lg border-none outline-1 outline-gray-200 focus:outline-primary focus:border-none"
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div className="relative w-full">
            <label htmlFor='password' className="label text-lg font-semibold mb-2">Password</label>
            <input
            id='password'
              type={showPassword ? "text" : "password"}
              name="password"
              className="input input-bordered w-full text-lg border-none outline-1 outline-gray-200 focus:outline-primary focus:border-none pr-10"
              placeholder="Password"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9/12 -translate-y-1/2 cursor-pointer text-gray-500 focus:outline-none z-10"
              role="button"
              tabIndex={0}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>

          <div className="mt-1">
            <p className='text-lg'>
                Forgot password 
                 <a className="link link-hover text-primary ml-2">
               Click here
              </a>
            </p>
           
          </div>
            {
                creating ?(
                    <Loading height={false}/>
                ):(
                    
          <input value="Login" type="submit" className="bg-primary hover:bg-secondary cursor-pointer w-full py-2 rounded-lg text-white text-lg font-semibold "/>
                )
            }
        </form>
        <div className="mt-4">
          <div
            onClick={handleGoogleSignIn}
            className={`py-2 w-full flex items-center justify-center gap-2 border border-gray-300 ${theme==="dark" ?'hover:bg-gray-800' :'hover:bg-gray-100'} rounded-lg text-lg font-semibold cursor-pointer `}
          >
            <FcGoogle className="text-xl" /> Continue with Google
          </div>
        </div>

        <p className="mt-4 text-lg text-center">
         If you don't have Account?{" "}
          <Link to="/signup" className="text-primary font-bold">
            SignUp
          </Link>
        </p>

        
      </div>
    </div>
         </Container>
    );
};

export default LogIn;