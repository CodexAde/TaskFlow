import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import formateValidator from "../utils/formateValidator";
import UserContext from "../context/userContext";
import { Link } from "react-router-dom";

const Registering = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
    language: "",
  });
  const [loading, setLoading] = useState(false); // 🔥 for spinner
  const { setCredentials, credentials, RegisteringUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) navigate("/allTasks");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = formateValidator(user);
    if (validation !== true) return;
    

    setCredentials(user);

    setLoading(true);

    const response = await RegisteringUser(user);

    setLoading(false); 

    if (response && response.success === true) {
      setUser({ name: "", email: "", password: "", language: "" });
      navigate("/login");
    } else {
      alert(response.message || "Registration failed");
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
{loading ? (
  // 🌈 Animated Loader UI
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1.75rem",
      animation: "fadeIn 0.8s ease-out",
    }}
  >
    <div
      style={{
        position: "relative",
        width: "4.5rem",
        height: "4.5rem",
      }}
    >
      {/* outer ring */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          border: "5px solid rgba(255, 255, 255, 0.15)",
          borderTopColor: "#a78bfa",
          animation: "spin 1.2s linear infinite",
          boxShadow: "0 0 20px rgba(167,139,250,0.3)",
        }}
      ></div>

      {/* glowing center pulse */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "1.5rem",
          height: "1.5rem",
          background: "radial-gradient(circle, #a78bfa, #9333ea)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          animation: "pulseGlow 1.8s ease-in-out infinite",
          filter: "blur(2px)",
        }}
      ></div>
    </div>

    <p
      style={{
        color: "#a78bfa",
        fontWeight: "600",
        fontSize: "1.05rem",
        letterSpacing: "0.5px",
        animation: "fadeText 1.5s ease-in-out infinite",
      }}
    >
      Creating your account...
    </p>

    {/* animation styles */}
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      @keyframes pulseGlow {
        0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.9; }
        50% { transform: translate(-50%, -50%) scale(1.4); opacity: 0.6; }
      }

      @keyframes fadeText {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 1; }
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  </div>
) : (
        // 🔥 Signup form
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

          {/* Input Fields */}
          {["name", "email", "password"].map((field) => (
            <div key={field} style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#d1d5db",
                  marginBottom: "0.5rem",
                }}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                onChange={(e) => setUser({ ...user, [field]: e.target.value })}
                value={user[field]}
                type={field === "password" ? "password" : "text"}
                placeholder={field}
                autoComplete={field === "password" ? "current-password" : "on"}
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
          ))}

          {/* Language and Avatar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}
          >
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
    cursor: "pointer",
  }}
>
  <option >Select language</option>
  <option value="English">English</option>
  <option value="Hindi">Hindi</option>
  <option value="French">French</option>
  <option value="Spanish">Spanish</option>
</select>

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
                cursor: "pointer",
                width: "100%",
              }}
            />
          </div>

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
          >
            Sign Up
          </button>

          <p
            style={{
              fontSize: "0.875rem",
              color: "#9ca3af",
              textAlign: "center",
              marginTop: "1rem",
            }}
          >
            Already have an account?{" "}
            <span
              style={{
                color: "#a78bfa",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              <Link to="/login">Login here</Link>
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default Registering;