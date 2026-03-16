/** @format */
import { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { Link } from "react-router";

const GoogleIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' aria-hidden='true'>
    <path
      d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
      fill='#4285F4'
    />
    <path
      d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
      fill='#34A853'
    />
    <path
      d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
      fill='#FBBC05'
    />
    <path
      d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
      fill='#EA4335'
    />
  </svg>
);

const GitHubIcon = () => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='currentColor'
    aria-hidden='true'
  >
    <path d='M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z' />
  </svg>
);

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className='min-h-screen bg-slate-50 flex items-center justify-center px-4 relative overflow-hidden'>
      {/* Blobs */}
      <div
        className='fixed -top-20 -left-20 w-80 h-80 rounded-full pointer-events-none'
        style={{
          background:
            "radial-gradient(circle, rgba(15,82,255,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className='fixed -bottom-16 -right-16 w-72 h-72 rounded-full pointer-events-none'
        style={{
          background:
            "radial-gradient(circle, rgba(255,79,0,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Go back to home */}
      <Link
        to='/'
        className='absolute top-5 left-5 flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-[#0F52FF] transition-colors duration-200 group'
      >
        <svg
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='group-hover:-translate-x-0.5 transition-transform duration-200'
        >
          <path d='M19 12H5M12 5l-7 7 7 7' />
        </svg>
        Back to home
      </Link>

      {/* Card */}
      <div
        className='w-full max-w-sm bg-white rounded-2xl border border-slate-200 overflow-hidden'
        style={{ boxShadow: "0 4px 32px rgba(15,82,255,0.08)" }}
      >
        {/* Header */}
        <div className='bg-[#0F172A] px-7 pt-7 pb-6 relative overflow-hidden'>
          <div className='absolute inset-0 pointer-events-none'>
            <div
              className='absolute top-0 left-0 w-48 h-48'
              style={{
                background:
                  "radial-gradient(circle at top left, rgba(15,82,255,0.22) 0%, transparent 65%)",
              }}
            />
            <div
              className='absolute bottom-0 right-0 w-40 h-40'
              style={{
                background:
                  "radial-gradient(circle at bottom right, rgba(255,79,0,0.18) 0%, transparent 65%)",
              }}
            />
          </div>
          <h1 className='relative text-xl font-bold text-slate-50 tracking-tight'>
            Vendora
          </h1>
          <p className='relative mt-1 text-sm text-slate-400'>
            {isLogin
              ? "Welcome back — sign in to continue"
              : "Create your account to get started"}
          </p>
        </div>

        {/* Body */}
        <div className='px-7 pt-6 pb-7'>
          {/* Tab Switcher */}
          <div className='flex bg-slate-50 border border-slate-200 rounded-xl p-1 gap-1 mb-6'>
            {["Login", "Sign Up"].map((label) => {
              const active = label === "Login" ? isLogin : !isLogin;
              return (
                <button
                  key={label}
                  onClick={() => setIsLogin(label === "Login")}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    active
                      ? "bg-white text-[#0F52FF] shadow-sm shadow-blue-100"
                      : "text-slate-400 hover:text-slate-600 bg-transparent"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Form */}
          <div key={isLogin ? "login" : "signup"}>
            {isLogin ? <LoginForm /> : <SignupForm />}
          </div>

          {/* Divider */}
          {/* <div className='flex items-center gap-3 my-5'>
            <div className='flex-1 h-px bg-slate-200' />
            <span className='text-xs text-slate-400 font-medium'>
              or continue with
            </span>
            <div className='flex-1 h-px bg-slate-200' />
          </div> */}

          {/* Social Buttons */}
          {/* <div className='grid grid-cols-2 gap-2.5 mb-5'>
            <button className='flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-[#0F172A] bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all duration-200'>
              <GoogleIcon /> Google
            </button>
            <button className='flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-[#0F172A] bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all duration-200'>
              <GitHubIcon /> GitHub
            </button>
          </div> */}

          {/* Switch */}
          <p className='text-center text-sm text-slate-500 pt-4'>
            {isLogin ? "No account? " : "Have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className='text-[#FF4F00] font-semibold hover:underline underline-offset-2 transition-all'
            >
              {isLogin ? "Create one" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
