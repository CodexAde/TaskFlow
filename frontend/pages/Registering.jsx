import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Registering = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "", avatar: null, language: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/allTasks");
    }
    console.log("its done you authenticated");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.name || !user.email || !user.password) {
      alert("All fields (name, email, password) are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      alert("Please enter a valid email address!");
      return;
    }

    if (user.password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (data.success) {
        setUser({ name: "", email: "", password: "", language: "English" });
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
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
        {/* Glow accents */}
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
          Taskflow Signup
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

        {/* Name input */}
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
            Name
          </label>
          <input
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            value={user.name}
            type="text"
            placeholder="Choose a name"
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

        {/* Email input */}
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

        {/* Password input */}
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

        {/* Avatar + Language select container */}
<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1.5rem",
    width: "100%",
  }}
>
  {/* Language select */}
  <select
    value={user.language}
    onChange={(e) => setUser({ ...user, language: e.target.value })}
    style={{
      flex: 1,
      padding: "0.75rem",
      borderRadius: "0.75rem",
      background: "rgba(17, 24, 39, 0.6)",
      border: "1px solid #4b5563",
      color: "white",
      outline: "none",
      boxShadow: "inset 0 2px 4px rgba(0,0,0,0.6)",
      cursor: "pointer",
      fontSize: "0.875rem",
      width: "20%",
    }}
  >
    <option value="English">English</option>
    <option value="Hindi">Hindi</option>
    <option value="French">French</option>
    <option value="Spanish">Spanish</option>
  </select>

  {/* Avatar upload */}
  <input
    type="file"
    onChange={(e) => setUser({ ...user, avatar: e.target.files[0] })}
    style={{
      flex: 1,
      padding: "0.75rem",
      borderRadius: "0.75rem",
      background: "rgba(17, 24, 39, 0.6)",
      border: "1px solid #4b5563",
      color: "white",
      outline: "none",
      boxShadow: "inset 0 2px 4px rgba(0,0,0,0.6)",
      cursor: "pointer",
      fontSize: "0.875rem",
      width: "80%",
    }}
  />
</div>

        {/* Submit button */}
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
          Sign Up
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
          By signing up, you agree to our{" "}
          <span
            style={{
              color: "#a78bfa",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            terms & conditions
          </span>
        </p>
      </form>
    </div>
  );
};

export default Registering;