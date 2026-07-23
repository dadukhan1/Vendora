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
    <footer className="bg-[#0a0a0a] rounded-t-[32px] lg:rounded-t-[50px] mt-16 lg:mt-28 text-white">
      {/* Main body */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-16 pb-12 grid grid-cols-1 lg:grid-cols-[2fr_repeat(3,1fr)] gap-10 lg:gap-16">
        {/* Brand column */}
        <div className="flex flex-col gap-6">
          <div
            className="flex items-center gap-2.5 cursor-pointer w-fit select-none"
            onClick={() => navigate("/")}
          >
            <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
              <span className="text-[#0a0a0a] font-bold text-xs font-[Outfit]">V</span>
            </div>
            <span className="text-white text-lg font-[800] tracking-tight font-[Outfit]">
              Vendora
            </span>
          </div>

          <p className="text-[#9ca3af] text-[13px] leading-relaxed max-w-xs font-light">
            Elevating your shopping experience with curated luxury fashion and premium customer support.
          </p>

          {/* Social bubbles */}
          <div className="flex gap-2.5 mt-2">
            {["X", "IG", "FB", "YT"].map((s) => (
              <div
                key={s}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-[700] text-[#9ca3af] cursor-pointer hover:border-[#c9993a] hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading} className="flex flex-col gap-4">
            <p className="label-overline text-[#c9993a] text-[10px] tracking-widest mb-1">
              {heading}
            </p>
            {links.map((link) => (
              <span
                key={link.name}
                onClick={() => navigate(link.path)}
                className="text-[#9ca3af] text-[13px] font-[500] font-[Outfit] cursor-pointer hover:text-white transition-colors duration-150"
              >
                {link.name}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 mx-6 lg:mx-12" />

      {/* Bottom bar */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-[#555] text-[11px] font-[500] font-[Outfit]">
          © {new Date().getFullYear()} Vendora. All rights reserved.
        </p>

        {/* Legal links */}
        <div className="flex items-center gap-2">
          {legalLinks.map((item, i, arr) => (
            <React.Fragment key={item.name}>
              <span
                onClick={() => navigate(item.path)}
                className="text-[#555] text-[11px] font-[500] font-[Outfit] cursor-pointer hover:text-[#9ca3af] transition-colors duration-150"
              >
                {item.name}
              </span>
              {i < arr.length - 1 && <span className="text-white/10 text-[11px] select-none">·</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Become a Seller CTA */}
        <div
          onClick={() => navigate("/become-seller")}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 cursor-pointer hover:bg-[#c9993a] hover:border-transparent transition-all duration-200 group"
        >
          <Storefront sx={{ fontSize: 13 }} className="text-[#c9993a] group-hover:text-white" />
          <span className="text-[11px] font-[700] font-[Outfit] text-[#c9993a] group-hover:text-white">
            Become a Seller
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
