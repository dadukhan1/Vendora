/** @format */
import { useState } from "react";
import SignupForm from "./SignupForm";
import SigninForm from "./SigninForm";
import { Link } from "react-router";

const Auth = () => {
  const [isSignin, setIsSignin] = useState(true);

  return (
    <div className="min-h-screen bg-[#fafaf8] grid grid-cols-1 lg:grid-cols-2">
      {/* ── Left Panel: Brand Editorial (Hidden on mobile) ── */}
      <div className="hidden lg:flex relative overflow-hidden bg-[#0a0a0a]">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
          alt="Vendora Auth"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a]/95 via-[#0a0a0a]/40 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-16 z-10 text-white">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 w-fit select-none">
            <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center">
              <span className="text-[#0a0a0a] font-bold text-sm font-[Outfit]">V</span>
            </div>
            <span className="text-white text-lg font-[800] tracking-tight font-[Outfit]">
              Vendora
            </span>
          </Link>

          {/* Editorial quote */}
          <div className="max-w-md">
            <p className="label-overline text-[#c9993a] mb-3">Elevate Your Lifestyle</p>
            <h2 className="font-[Playfair_Display] font-bold text-[36px] leading-[1.1] mb-5">
              The premium destination for curated boutique finds.
            </h2>
            <p className="text-[#9ca3af] text-[14px] font-light leading-relaxed">
              Sign in to unlock customized collections, secure purchases, and track orders from the finest sellers.
            </p>
          </div>

          {/* Footer note */}
          <p className="text-[11px] text-white/40 font-[Outfit]">
            © {new Date().getFullYear()} Vendora Inc. All rights reserved.
          </p>
        </div>
      </div>

      {/* ── Right Panel: Forms ── */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-10 relative">
        {/* Back to Home */}
        <Link
          to="/"
          className="absolute top-6 left-6 sm:left-12 lg:left-20 flex items-center gap-1.5 text-[11px] font-[700] font-[Outfit] text-[#9ca3af] hover:text-[#0a0a0a] transition-colors group uppercase tracking-widest"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:-translate-x-0.5 transition-transform"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Home
        </Link>

        {/* Card */}
        <div className="w-full max-w-sm mx-auto">
          {/* Tabs */}
          <div className="flex border-b border-[#f0ece6] mb-8 relative">
            <button
              onClick={() => setIsSignin(true)}
              className={`flex-1 pb-3.5 text-[13px] font-[700] font-[Outfit] uppercase tracking-wider text-center transition-all ${
                isSignin ? "text-[#0a0a0a]" : "text-[#c4bdb4] hover:text-[#9ca3af]"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignin(false)}
              className={`flex-1 pb-3.5 text-[13px] font-[700] font-[Outfit] uppercase tracking-wider text-center transition-all ${
                !isSignin ? "text-[#0a0a0a]" : "text-[#c4bdb4] hover:text-[#9ca3af]"
              }`}
            >
              Sign Up
            </button>
            {/* Active bar */}
            <span
              className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-[#c9993a] transition-transform duration-300"
              style={{ transform: isSignin ? "translateX(0)" : "translateX(100%)" }}
            />
          </div>

          {/* Form wrapper */}
          <div className="animate-scale-in" key={isSignin ? "signin" : "signup"}>
            {isSignin ? <SigninForm /> : <SignupForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
