/** @format */

import { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { Button } from "@mui/material";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className='flex justify-center items-center h-[90vh]'>
      <div className='max-w-md h-[85vh] rounded-md shadow-lg'>
        <img
          className='w-full h-[20vh] object-cover rounded-t-md'
          src='https://images.unsplash.com/photo-1556740772-1a741367b93e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHJlZ2lzdGVyfGVufDB8fDB8fHww'
        />
        <div className='mt-8 px-10'>
          {isLogin ? <LoginForm /> : <SignupForm />}
          <div className='flex items-center justify-center gap-1 mt-5'>
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Button onClick={() => setIsLogin(!isLogin)} variant='text'>
              {isLogin ? "Sign Up" : "Login"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
