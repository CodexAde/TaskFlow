import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [user, setUser] = useState({ email: "", password: "" });
const navigate = useNavigate();
    useEffect(() => {
      const token = localStorage.getItem("authToken");
      
      if (token) {
        navigate("/allTasks");
      }
    }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch(`${backendUrl}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      console.log("Response:", data);
      if (data.success) {
        console.log("its done you authenticated");
        try {
          localStorage.setItem("authToken", data.token);
          console.log("token is save to local storage and the token is: ", data.token);
          window.location.href = "/allTasks";
        } catch (error) {
          console.log(error, "Problem while saving token");
        }
      setUser({ email: "", password: "" });
      navigate("/allTasks");

      }
      else alert(data.message);
    } catch (err) {
      console.error("Error:", err);
    }
  };



  return (
<div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #111827, #000000, #1f2937)",
    color: "white",
    padding: "1rem",
  }}
>
  <form
    onSubmit={handleSubmit}
    style={{
      width: "100%",
      maxWidth: "28rem",
      background: "rgba(31, 41, 55, 0.7)",
      backdropFilter: "blur(12px)",
      padding: "2.5rem",
      borderRadius: "1.5rem",
      boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
      border: "1px solid #374151",
      position: "relative",
    }}
  >
    {/* Glow Accents */}
    <div
      style={{
        position: "absolute",
        top: "-1.5rem",
        right: "-1.5rem",
        width: "8rem",
        height: "8rem",
        background: "#9333ea",
        borderRadius: "9999px",
        filter: "blur(48px)",
        opacity: 0.3,
        animation: "pulse 2s infinite",
      }}
    ></div>
    <div
      style={{
        position: "absolute",
        bottom: "-1.5rem",
        left: "-1.5rem",
        width: "8rem",
        height: "8rem",
        background: "#2563eb",
        borderRadius: "9999px",
        filter: "blur(48px)",
        opacity: 0.3,
        animation: "pulse 2s infinite",
      }}
    ></div>

    {/* Title */}
    <h1
      style={{
        fontSize: "2.25rem",
        fontWeight: "800",
        textAlign: "center",
        background: "linear-gradient(to right, #a78bfa, #ec4899)",
        WebkitBackgroundClip: "text",
        color: "transparent",
        textShadow: "0 2px 4px rgba(0,0,0,0.6)",
        marginBottom: "0.5rem",
      }}
    >
      Taskflow Login
    </h1>
    <p
      style={{
        textAlign: "center",
        color: "#9ca3af",
        fontSize: "0.875rem",
        marginBottom: "2rem",
      }}
    >
      Boost your productivity and manage tasks effortlessly 🚀
    </p>

    {/* Email Input */}
    <div style={{ marginBottom: "1.5rem" }}>
      <label
        style={{
          display: "block",
          fontSize: "0.875rem",
          fontWeight: "500",
          color: "#d1d5db",
          marginBottom: "0.5rem",
        }}
      >
        Email
      </label>
      <input
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        value={user.email}
        type="email"
        placeholder="Enter your email"
        autoComplete="email"
        style={{
          width: "100%",
          padding: "0.75rem",
          borderRadius: "0.75rem",
          background: "rgba(17, 24, 39, 0.6)",
          border: "1px solid #4b5563",
          color: "white",
          outline: "none",
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.6)",
        }}
      />
    </div>

    {/* Password Input */}
    <div style={{ marginBottom: "1.5rem" }}>
      <label
        style={{
          display: "block",
          fontSize: "0.875rem",
          fontWeight: "500",
          color: "#d1d5db",
          marginBottom: "0.5rem",
        }}
      >
        Password
      </label>
      <input
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        value={user.password}
        type="password"
        placeholder="Enter your password"
        autoComplete="current-password"
        style={{
          width: "100%",
          padding: "0.75rem",
          borderRadius: "0.75rem",
          background: "rgba(17, 24, 39, 0.6)",
          border: "1px solid #4b5563",
          color: "white",
          outline: "none",
          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.6)",
        }}
      />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      style={{
        width: "100%",
        background: "linear-gradient(to right, #9333ea, #ec4899)",
        padding: "0.75rem",
        borderRadius: "0.75rem",
        fontWeight: "600",
        boxShadow: "0 4px 10px rgba(147, 51, 234, 0.4)",
        border: "none",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
      onMouseOver={(e) =>
        (e.currentTarget.style.background =
          "linear-gradient(to right, #7e22ce, #db2777)")
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.background =
          "linear-gradient(to right, #9333ea, #ec4899)")
      }
    >
      Log In
    </button>

    {/* Extra note */}
    <p
      style={{
        fontSize: "0.875rem",
        color: "#9ca3af",
        textAlign: "center",
        marginTop: "1rem",
      }}
    >
      Don't have account?{" "}

      <span
        style={{
          color: "#a78bfa",
          cursor: "pointer",
          textDecoration: "underline",
        }}
      >
       <Link to="/register">Create an account</Link> 
      </span>
    </p>
  </form>
</div>


  );
};

export default Login;