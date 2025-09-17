import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const TaskNavbar = ({ onAddTask, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
        localStorage.removeItem("authToken");
        navigate("/");
        console.log("User logged out successfully");
    } catch (error) {
        console.error("Error during logout:", error);   
    }
  };

  return (
    <nav
      style={{
        width: "100%",
        height: "70px",
        background: "linear-gradient(135deg, #1e1e2e, #2e2e3e, #3b3b5c)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.6)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <h1
        style={{
          fontSize: "1.8rem",
          fontWeight: "800",
          color: "#a78bfa",
          textShadow: "0 2px 6px rgba(0,0,0,0.7)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          cursor: "pointer",
        }}
      >
        {"<>"} Taskflow
      </h1>

      {/* Desktop Buttons */}
      <div
        style={{
          display: "flex",
          gap: "15px",
        }}
        className="desktop-buttons"
      >
        {/* Add Task Button */}
        <Link to="/create"><button
          style={{
            background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "12px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.opacity = "0.9")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          Add Task
        </button></Link> 

        {/* Logout Button */}
        <button
        onClick={handleLogout}
          style={{
            background: "#fff",
            color: "#111",
            border: "1px solid #ddd",
            padding: "10px 20px",
            borderRadius: "12px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.background = "#f4f4f4")}
          onMouseOut={(e) => (e.target.style.background = "#fff")}
        >
           Logout
        </button>
      </div>

      {/* Hamburger (Mobile Only) */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "none",
          cursor: "pointer",
        }}
        className="hamburger"
      >
        {/* SVG Hamburger */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="white"
          strokeWidth="2"
          viewBox="0 0 24 24"
          style={{ width: "30px", height: "30px" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "70px",
            right: "20px",
            background: "rgba(30,30,46,0.98)",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.7)",
            padding: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
        <Link to="/create">  <button
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
              color: "#fff",
              border: "none",
              padding: "10px 18px",
              borderRadius: "10px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Add Task
          </button></Link>
          <button
          onClick={handleLogout}
            style={{
              background: "#fff",
              color: "#111",
              border: "1px solid #ddd",
              padding: "10px 18px",
              borderRadius: "10px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      )}

      {/* Inline responsive rules */}
      <style>
        {`
          @media (max-width: 768px) {
            .desktop-buttons {
              display: none !important;
            }
            .hamburger {
              display: block !important;
            }
          }
        `}
      </style>
    </nav>
  );
};

export default TaskNavbar;