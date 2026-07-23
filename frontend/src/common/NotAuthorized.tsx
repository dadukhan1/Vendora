/** @format */

import { useNavigate } from "react-router";

const NotAuthorized = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      height: "100vh",
      background: "#fafaf8",
      fontFamily: "Outfit, sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
    }}>
      <div style={{
        maxWidth: 480,
        width: "100%",
        textAlign: "center",
      }}>

        {/* Lock icon illustration */}
        <div style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "#fff",
          border: "1px solid #f0ece6",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
          position: "relative",
        }}>
          <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="22" width="32" height="22" rx="5" fill="#f0ece6" stroke="#c9993a" strokeWidth="2"/>
            <path d="M16 22V16a8 8 0 1 1 16 0v6" stroke="#c9993a" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="24" cy="32" r="4" fill="#c9993a"/>
            <rect x="22" y="34" width="4" height="5" rx="2" fill="#c9993a"/>
          </svg>
          <div style={{
            position: "absolute",
            inset: -6,
            borderRadius: "50%",
            border: "1px dashed rgba(201,153,58,0.25)",
          }} />
        </div>

        <p style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#c9993a",
          marginBottom: 8,
        }}>
          Access Restricted
        </p>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 28,
          fontWeight: 700,
          color: "#0a0a0a",
          lineHeight: 1.2,
          margin: "0 0 10px",
        }}>
          You're Not Authorized
        </h1>

        <p style={{
          fontSize: 13,
          color: "#9ca3af",
          lineHeight: 1.6,
          marginBottom: 20,
          fontWeight: 400,
        }}>
          You don't have permission to view this page.
          Check your account role or contact the administrator for access.
        </p>

        <div style={{
          width: 36,
          height: 2,
          background: "linear-gradient(to right, #c9993a, rgba(201,153,58,0.2))",
          borderRadius: 999,
          margin: "0 auto 20px",
        }} />

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <button
            onClick={() => navigate("/signin")}
            style={{
              width: "100%",
              padding: "11px 20px",
              borderRadius: 999,
              border: "none",
              background: "#0a0a0a",
              color: "#fff",
              fontFamily: "Outfit, sans-serif",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "all 0.25s ease",
              boxShadow: "0 6px 24px rgba(10,10,10,0.15)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#c9993a";
              e.currentTarget.style.boxShadow = "0 8px 28px rgba(201,153,58,0.3)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#0a0a0a";
              e.currentTarget.style.boxShadow = "0 6px 24px rgba(10,10,10,0.15)";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            Sign In
          </button>

          <button
            onClick={() => navigate("/")}
            style={{
              width: "100%",
              padding: "11px 20px",
              borderRadius: 999,
              border: "1.5px solid #e5e7eb",
              background: "#fff",
              color: "#5d5d5d",
              fontFamily: "Outfit, sans-serif",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "#c9993a";
              e.currentTarget.style.color = "#c9993a";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#e5e7eb";
              e.currentTarget.style.color = "#5d5d5d";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Back to Home
          </button>
        </div>

        {/* Footer note */}
        <p style={{
          marginTop: 16,
          fontSize: 12,
          color: "#d1d5db",
          fontWeight: 500,
        }}>
          Need access?{" "}
          <span
            style={{ color: "#c9993a", cursor: "pointer", fontWeight: 700 }}
            onClick={() => navigate("/contact")}
          >
            Contact support
          </span>
        </p>

      </div>
    </div>
  );
};

export default NotAuthorized;
