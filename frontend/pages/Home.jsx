import Navbar from "../components/navbar";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import EnhancedCTAAndFooter from "../components/Homepage";

const Icon = {
  Gauge: ({ size = 24, color = "#a78bfa" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 13l6-6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M12 21a9 9 0 1 0-9-9" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="12" cy="13" r="2" fill={color} />
    </svg>
  ),
  Users: ({ size = 24, color = "#ec4899" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="8" cy="9" r="3" stroke={color} strokeWidth="2" />
      <path d="M2 20c0-3.314 2.686-6 6-6" stroke={color} strokeWidth="2" />
      <circle cx="17" cy="8" r="3" stroke={color} strokeWidth="2" />
      <path d="M22 20c0-3.314-2.686-6-6-6" stroke={color} strokeWidth="2" />
    </svg>
  ),
  Activity: ({ size = 24, color = "#22d3ee" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M3 12h4l2 6 4-12 2 6h6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Lightning: ({ size = 24, color = "#f59e0b" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" stroke={color} strokeWidth="2" fill="none" />
    </svg>
  ),
};

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) navigate("/allTasks");
  }, [navigate]);

  const glass = {
    background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
  };

  const pill = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 14px",
    borderRadius: "999px",
    background: "rgba(167,139,250,0.12)",
    border: "1px solid rgba(167,139,250,0.35)",
    color: "#c4b5fd",
    fontWeight: 600,
    fontSize: "0.85rem",
  };

  const badge = (text) => (
    <span style={{ ...pill, marginRight: 8, marginBottom: 8 }}>{text}</span>
  );

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        color: "white",
        background:
          "radial-gradient(1200px 600px at 10% -10%, #1e293b 0%, rgba(2,6,23,0) 60%), radial-gradient(1000px 500px at 100% 0%, #0ea5e9 0%, rgba(2,6,23,0) 55%), linear-gradient(180deg, #0b1020 0%, #090c16 100%)",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "5rem 1.5rem 3rem",
          maxWidth: "1200px",
          margin: "0 auto",
          gap: "3rem",
        }}
      >
        {/* Left Text */}
        <div
          style={{
            flex: "1 1 480px",
            minWidth: "320px",
            textAlign: "left",
          }}
        >
          <div style={{ marginBottom: 16 }}>
            <span style={pill}>
              <Icon.Lightning size={18} color="#fbbf24" />
              AI Operations Hub
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.3rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              background: "linear-gradient(90deg, #e5e7eb, #a78bfa 40%, #ec4899 80%)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              marginBottom: "1rem",
            }}
          >
            Track every user, action, and outcome—live.  
            Elevate your platform with <span style={{ color: "#a78bfa" }}>TaskFlow</span>.
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              maxWidth: "640px",
              marginBottom: "1.5rem",
            }}
          >
            TaskFlow is an AI-powered centralized dashboard to monitor users, sessions, and workflows
            in real time — uncover insights, predict risks, and automate your admin tasks instantly.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
            {badge("Realtime Activity")}
            {badge("Anomaly Alerts")}
            {badge("Role-based Control")}
            {badge("Workflow Automation")}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link to="/login">
              <button
                style={{
                  background: "linear-gradient(90deg, #7c3aed, #ec4899)",
                  padding: "0.9rem 1.6rem",
                  borderRadius: 12,
                  border: "none",
                  fontWeight: 700,
                  cursor: "pointer",
                  color: "white",
                  boxShadow: "0 8px 24px rgba(236,72,153,0.35)",
                  transition: "transform 0.25s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                Launch Admin Console
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div
            style={{
              ...glass,
              marginTop: 30,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 16,
              borderRadius: 16,
              padding: "16px 18px",
            }}
          >
            {[
              { icon: <Icon.Gauge />, title: "99.95% Uptime", desc: "Global edge" },
              { icon: <Icon.Users />, title: "1.2M Users", desc: "Tracked live" },
              { icon: <Icon.Activity />, title: "+37% Throughput", desc: "AI routing" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {item.icon}
                <div>
                  <div style={{ fontWeight: 700 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div
          style={{
            flex: "1 1 480px",
            textAlign: "center",
            marginTop: "1.5rem",
          }}
        >
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              style={{
                width: "100%",
                maxWidth: "540px",
                borderRadius: 20,
                boxShadow: "0 20px 60px rgba(0,0,0,0.55)",
                transition: "transform 0.6s ease",
              }}
              src="https://static.wingify.com/gcp/uploads/sites/18/2022/11/unnamed-27.png"
              alt="TaskFlow Overview"
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
            <div
              style={{
                position: "absolute",
                inset: "-10%",
                background:
                  "radial-gradient(500px 200px at 30% 20%, rgba(124,58,237,0.18), transparent 60%), radial-gradient(500px 200px at 75% 70%, rgba(236,72,153,0.18), transparent 60%)",
                filter: "blur(10px)",
                zIndex: -1,
              }}
            />
          </div>
        </div>
      </section>

      <EnhancedCTAAndFooter />
    </div>
  );
};

export default Home;