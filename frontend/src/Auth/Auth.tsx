/** @format */
import { useState } from "react";
import SignupForm from "./SignupForm";
import SigninForm from "./SigninForm";
import { Link } from "react-router";

const Auth = () => {
  const [isSignin, setIsSignin] = useState(true);

  return (
    <div className="min-h-screen bg-[#fafaf8] grid grid-cols-1 lg:grid-cols-2 font-[Outfit]">
      {/* ── Left Panel: Brand Editorial (Hidden on mobile) ── */}
      <div className="hidden lg:flex relative overflow-hidden bg-[#0a0a0a]">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
          alt="Vendora Premium Auth"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-16 z-10 text-white">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 w-fit select-none group">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-[#0a0a0a] font-black text-lg font-[Outfit]">V</span>
            </div>
            <span className="text-white text-2xl font-[800] tracking-tight font-[Outfit]">
              Vendora
            </span>
          </Link>

          {/* Editorial quote */}
          <div className="max-w-lg mb-12">
            <p className="text-[#c9993a] text-[11px] font-[800] tracking-[0.2em] uppercase mb-4">
              Elevate Your Lifestyle
            </p>
            <h2 className="font-[Playfair_Display] font-bold text-[48px] leading-[1.1] mb-6">
              The premium destination for curated finds.
            </h2>
            <p className="text-[#d1d5db] text-[16px] font-light leading-relaxed max-w-md">
              Sign in to unlock customized collections, secure purchases, and track orders from the finest sellers around the globe.
            </p>
          </div>

          {/* Footer note */}
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-[#c9993a]/50" />
            <p className="text-[12px] text-white/50 font-[Outfit] tracking-wide">
              © {new Date().getFullYear()} Vendora Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* ── Right Panel: Forms ── */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-12 relative bg-white lg:rounded-l-3xl lg:-ml-6 z-20 shadow-[-20px_0_40px_rgba(0,0,0,0.05)]">
        {/* Back to Home */}
        <Link
          to="/"
          className="absolute top-8 left-6 sm:left-12 lg:left-24 flex items-center gap-2 text-[12px] font-[700] font-[Outfit] text-[#9ca3af] hover:text-[#c9993a] transition-colors group uppercase tracking-widest"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:-translate-x-1 transition-transform"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Home
        </Link>

        {/* Card */}
        <div className="w-full max-w-[420px] mx-auto mt-12 lg:mt-0">
          {/* Tabs */}
          <div className="flex bg-[#fafaf8] p-1.5 rounded-full mb-10 relative border border-[#f0ece6]">
            <button
              onClick={() => setIsSignin(true)}
              className={`flex-1 py-3 text-[13px] font-[700] font-[Outfit] uppercase tracking-wider text-center transition-all duration-300 rounded-full z-10 ${
                isSignin ? "text-[#0a0a0a]" : "text-[#9ca3af] hover:text-[#0a0a0a]"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignin(false)}
              className={`flex-1 py-3 text-[13px] font-[700] font-[Outfit] uppercase tracking-wider text-center transition-all duration-300 rounded-full z-10 ${
                !isSignin ? "text-[#0a0a0a]" : "text-[#9ca3af] hover:text-[#0a0a0a]"
              }`}
            >
              Sign Up
            </button>
            {/* Active pill background */}
            <div
              className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-out"
              style={{
                transform: isSignin ? "translateX(0)" : "translateX(calc(100% + 6px))",
                left: "6px"
              }}
            />
          </div>

          {/* Form wrapper */}
          <div className="animate-fade-up" key={isSignin ? "signin" : "signup"}>
            {isSignin ? <SigninForm /> : <SignupForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
