import React, {  useState } from 'react';
import  Input  from '../../components/Input/Input'; // Fix the path if needed
import AuthLayouts from '../../components/Layouts/AuthLayouts';
import {Link, useNavigate} from 'react-router-dom'
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [error , setError] = useState(null);

  //const {updateUser} = useContext(UserContext)

  const navigate = useNavigate()

  const handleLogin = async(e) => {
    e.preventDefault();
    // handle login logic
    if(!validateEmail((email))){
      setError("Please enter a valid email address.");
      return;
    }

    if(!password){
      setError("Incorrect Password");
      return;
    }

    setError("");

    //login api
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email, password
      });
      const {token} = response.data;

      if(token){
        localStorage.setItem("token", token);
       // updateUser(user);
        navigate("/home");
      }
    } catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      } else{
        setError("Something went wrong. Please try again.")
      }
    }
  };

  return (
    <AuthLayouts>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome to Expense Tracker</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">Please enter your details to log in.</p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="sample@gmail.com"
            type="text"
          />
          <Input
          value = {password}
          onChange = {({ target }) => setPassword(target.value)}
          label = "Password"
          placeholder="Enter your password"
          type="password"
          />
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          <button type = "submit" className='btn-primary' >
            LOGIN
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an account?{" "}
            <Link className='font-medium text-primary underline' to="/signup" >
            Signup
            </Link>
          </p>
        </form>
      </div>
    </AuthLayouts>
  );
};

export default Login;
