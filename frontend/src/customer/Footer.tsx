/** @format */

import React from "react";
import { Storefront } from "@mui/icons-material";
import { useNavigate } from "react-router";

const footerLinks = {
  Shop: [
    { name: "Men", path: "/products/men" },
    { name: "Women", path: "/products/women" },
    { name: "Kids", path: "/products/kids" },
    { name: "New Arrivals", path: "/products/new-arrivals" },
    { name: "Sale", path: "/products/sale" },
  ],
  Support: [
    { name: "Help Center", path: "/help" },
    { name: "Track Order", path: "/account/orders" },
    { name: "Returns", path: "/returns" },
    { name: "Size Guide", path: "/size-guide" },
    { name: "Contact Us", path: "/contact" },
  ],
  Company: [
    { name: "About Us", path: "/about" },
    { name: "Careers", path: "/careers" },
    { name: "Press", path: "/press" },
    { name: "Sustainability", path: "/sustainability" },
    { name: "Affiliates", path: "/affiliates" },
  ],
};

const legalLinks = [
  { name: "Privacy Policy", path: "/privacy" },
  { name: "Terms of Service", path: "/terms" },
  { name: "Cookie Policy", path: "/cookies" },
];

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className='bg-[#0F172A]'>
      {/* Main body */}
      <div className='max-w-6xl mx-auto px-8 pt-16 pb-12 grid grid-cols-1 lg:grid-cols-[1.5fr_repeat(3,1fr)] gap-12'>
        {/* Brand column */}
        <div className='flex flex-col gap-5'>
          <div
            className='flex items-center gap-2 cursor-pointer w-fit'
            onClick={() => navigate("/")}
          >
            <Storefront sx={{ fontSize: 22, color: "#0F52FF" }} />
            <span className='text-[#F8FAFC] text-xl font-bold tracking-tight'>
              Vendora
            </span>
          </div>

          <p className='text-[#94A3B8] text-sm leading-relaxed max-w-[210px]'>
            Your one-stop destination for premium fashion. Quality styles,
            delivered fast.
          </p>

          {/* Social bubbles */}
          <div className='flex gap-2 mt-1'>
            {["X", "IG", "FB", "YT"].map((s) => (
              <div
                key={s}
                className='w-9 h-9 rounded-full border border-[#E2E8F0]/20 flex items-center justify-center text-[11px] font-bold text-[#94A3B8] cursor-pointer hover:border-[#0F52FF] hover:text-[#F8FAFC] hover:bg-[#0F52FF]/15 transition-all duration-150'
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading} className='flex flex-col gap-4'>
            <p className='text-[#F8FAFC] text-[11px] font-bold uppercase tracking-widest mb-1'>
              {heading}
            </p>
            {links.map((link) => (
              <span
                key={link.name}
                onClick={() => navigate(link.path)}
                className='text-[#94A3B8] text-sm cursor-pointer hover:text-[#F8FAFC] transition-colors duration-150'
              >
                {link.name}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className='border-t border-[#E2E8F0]/10 mx-8' />

      {/* Bottom bar */}
      <div className='max-w-6xl mx-auto px-8 py-5 flex flex-wrap items-center justify-between gap-4'>
        <p className='text-[#64748B] text-xs'>
          © {new Date().getFullYear()} Vendora. All rights reserved.
        </p>

        {/* Legal links */}
        <div className='flex items-center gap-2'>
          {legalLinks.map((item, i, arr) => (
            <React.Fragment key={item.name}>
              <span
                onClick={() => navigate(item.path)}
                className='text-[#64748B] text-xs cursor-pointer hover:text-[#F8FAFC] transition-colors duration-150'
              >
                {item.name}
              </span>
              {i < arr.length - 1 && (
                <span className='text-[#64748B]/40 text-xs'>·</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Become a Seller CTA */}
        <div
          onClick={() => navigate("/become-seller")}
          className='flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F52FF]/10 border border-[#0F52FF]/30 cursor-pointer hover:bg-[#0F52FF]/20 transition-all duration-150'
        >
          <Storefront sx={{ fontSize: 15, color: "#0F52FF" }} />
          <span className='text-[#0F52FF] text-xs font-semibold'>
            Become a Seller
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
