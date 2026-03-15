/** @format */

import { Button, Chip } from "@mui/material";
import { useState } from "react";
import SellerLogin from "./SellerLogin";
import SellerAccountForm from "./SellerAccountForm";
import {
  Storefront,
  TrendingUp,
  People,
  Star,
  ArrowBack,
} from "@mui/icons-material";
import { useNavigate } from "react-router";

const stats = [
  { icon: <People sx={{ fontSize: 16 }} />, label: "50K+ Sellers" },
  { icon: <TrendingUp sx={{ fontSize: 16 }} />, label: "2M+ Sales" },
  { icon: <Star sx={{ fontSize: 16 }} />, label: "4.9 Rated" },
];

const BecomeSeller = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='grid grid-cols-3 min-h-screen bg-[#F8FAFC]'>
      {/* ── Left: Form Panel ── */}
      <section className='lg:col-span-1 md:col-span-2 col-span-3 flex flex-col px-8 md:px-10 py-10 bg-white border-r border-[#E2E8F0] overflow-y-auto'>
        {/* ── Back to Home ── */}
        <button
          onClick={() => navigate("/")}
          className='flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#0F172A] w-fit transition-colors duration-150 mb-6 cursor-pointer'
        >
          <ArrowBack sx={{ fontSize: 14 }} />
          <span>Back to Home</span>
        </button>

        {/* Logo / Brand */}
        <div className='flex items-center gap-2 mb-8'>
          <Storefront sx={{ color: "#0F52FF", fontSize: 26 }} />
          <span className='text-lg font-bold text-[#0F172A] tracking-tight'>
            Vendora <span className='text-[#0F52FF]'>Seller</span>
          </span>
        </div>

        {/* Heading */}
        <div className='mb-6'>
          <h1 className='text-2xl font-bold text-[#0F172A] leading-tight mb-1'>
            {isLogin ? "Welcome back" : "Start selling today"}
          </h1>
          <p className='text-sm text-[#64748B]'>
            {isLogin
              ? "Sign in to manage your store and orders."
              : "Create your seller account and reach millions of buyers."}
          </p>
        </div>

        {/* Form */}
        <div>{isLogin ? <SellerLogin /> : <SellerAccountForm />}</div>

        {/* Divider */}
        <div className='flex items-center gap-3 mt-8 mb-4'>
          <div className='flex-1 h-px bg-[#E2E8F0]' />
          <span className='text-xs text-[#94A3B8]'>
            {isLogin ? "New seller?" : "Already have an account?"}
          </span>
          <div className='flex-1 h-px bg-[#E2E8F0]' />
        </div>

        {/* Toggle Button */}
        <Button
          fullWidth
          variant='outlined'
          onClick={() => setIsLogin(!isLogin)}
          sx={{
            py: "11px",
            textTransform: "none",
            borderRadius: "10px",
            borderColor: "#E2E8F0",
            color: "#0F172A",
            fontWeight: 600,
            fontSize: "0.875rem",
            "&:hover": {
              borderColor: "#0F52FF",
              color: "#0F52FF",
              background: "transparent",
            },
          }}
        >
          {isLogin ? "Create an account" : "Sign in instead"}
        </Button>
      </section>

      {/* ── Right: Image Panel ── */}
      <section className='hidden md:flex md:col-span-1 lg:col-span-2 relative overflow-hidden sticky top-0 h-screen'>
        <img
          src='https://images.unsplash.com/photo-1737038708291-9ab4007eadce?q=80&w=875&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='become seller'
          className='w-full h-full object-cover'
        />

        {/* Dark overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-[#0F172A]/20 to-transparent' />

        {/* Bottom overlay content */}
        <div className='absolute bottom-10 left-10 right-10'>
          <h2 className='text-white text-2xl font-bold mb-2 leading-snug'>
            Grow your business <br />
            with Vendora
          </h2>
          <p className='text-white/60 text-sm mb-5'>
            Join thousands of sellers already thriving on our platform.
          </p>
          <div className='flex gap-2 flex-wrap'>
            {stats.map((s) => (
              <Chip
                key={s.label}
                icon={s.icon}
                label={s.label}
                size='small'
                sx={{
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(8px)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontSize: "0.72rem",
                  fontWeight: 500,
                  "& .MuiChip-icon": { color: "#fff" },
                }}
              />
            ))}
          </div>
        </div>

        {/* Top-left badge */}
        <div className='absolute top-8 left-8'>
          <div
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "12px",
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 6px #22c55e",
              }}
            />
            <span
              style={{ color: "#fff", fontSize: "0.78rem", fontWeight: 500 }}
            >
              Applications open
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeSeller;
