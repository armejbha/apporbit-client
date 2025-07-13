import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FiCamera, FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import Container from '../../Components/Shared/Container';
import { imageUpload, saveUserInDb } from '../../Api/Utilities';
import toast from 'react-hot-toast';
import Loading from '../../Components/Shared/Loading/Loading';

const SignUp = () => {
    const {theme}=useAuth();
    const [showPassword,setShowPassword]=useState(false);
    const [creating, setCreating]=useState(false);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const {createUser, updateUserProfile,signInWithGoogle,loading}=useAuth();
    const location=useLocation();
    const navigate=useNavigate();
    if(loading){
        return <Loading height={true}/>
    }
    const handleImage=async event=>{
        const image=event.target.files[0];
        try {
            setUploading(true);
            const imgUrl = await imageUpload(image);
            console.log(imgUrl);
            setImageUrl(imgUrl);
            setUploading(false);
        } catch (error) {
            toast.error('upload failed')
        }finally{
            setUploading(false);
        }
        
    }

    const handleLogin=async(e)=>{
        e.preventDefault();
        const form=e.target;
        const name=form.name.value;
        const email=form.email.value;
        const password=form.password.value;
        console.log(name,email,password);
        
        // password validation 
        // Password validation
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;

    if (!upperCase.test(password)) {
      return toast.error("Password must contain at least one uppercase letter");
    }
    if (!lowerCase.test(password)) {
      return toast.error("Password must contain at least one lowercase letter");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }

    try {
        setCreating(true);
        const result=await createUser(email,password)
        console.log(result);

        await updateUserProfile(name,imageUrl)

        const userData={
            name,
            email,
            image:imageUrl
        }
        const response= await saveUserInDb(userData);

        if(response?.insertedId){
            toast.success('SignUp Successfully')
            form.reset();
            navigate(location?.state?.from?.pathname || "/");
        }
       ;
        
    } catch (error) {
        toast.error(error.message);
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
      navigate(location?.state?.from?.pathname || "/");
      }
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

    return (
         <Container>
            <div className={`card w-full max-w-lg mx-auto shrink-0 shadow border border-gray-200 my-10 py-5 ${theme==="dark" ? 'bg-[#0a0e19]' :''}`}>
      <div className='px-6'>
        <h1 className="text-3xl font-bold mt-5">Join Today!</h1>
      <p className='mt-2'>Join AppOrbit to discover and share tech products.</p>
      </div>
      <div className="card-body">
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor='name' className="label text-lg font-semibold mb-2">Name</label>
            <input
            id='name'
              type="text"
              name="name"
              className="input input-bordered w-full text-lg border-none outline-1 outline-gray-200 focus:outline-primary focus:border-none"
              placeholder="Enter Your Name"
              required
            />
          </div>
       

            <div>
      <p className="text-lg font-semibold mb-2">Select Image</p>
      
      <label
        htmlFor="image"
        className="relative border border-gray-200 rounded-lg py-3 px-4 w-full block cursor-pointer"
      >
        {uploading ? (
            <Loading height={false}></Loading>
        ) 
        :imageUrl ? (
            <p className={`text-lg text-center font-semibold ${imageUrl && 'text-primary'}`}>File Uploaded</p>
        )
        :(
            <div className="flex items-center justify-center gap-2 text-gray-600">
          <FiCamera className="w-6 h-6" />
          <span className="text-lg">No File Chosen</span>
        </div>
        
        )}

        <input
          onChange={handleImage}
          type="file"
          id="image"
          name="image"
          accept="image/*"
          className="hidden"
        />
      </label>
    </div>

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

          {
            creating ? (
                <Loading/>
            ):(
                <input value="SignUp" type="submit" className="bg-primary hover:bg-[#e75045] cursor-pointer w-full py-2 rounded-lg text-white text-lg font-semibold mt-4 ">
            
          </input>
            )
          }
        </form>
        <div className="mt-4">
          <div
            onClick={handleGoogleSignIn}
            className="py-2 w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 cursor-pointer rounded-lg text-lg font-semibold"
          >
            <FcGoogle className="text-xl" /> Continue with Google
          </div>
        </div>

        <p className="mt-4 text-lg text-center">
         Already have an Account?{" "}
          <Link to="/login" className="text-primary font-bold">
            LogIn
          </Link>
        </p>

        
      </div>
    </div>
         </Container>
    );
};

export default SignUp;