import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CompletePlatformControl from "./HomepageSection";

// Minimal inline SVG icon set (enterprise outline style)
const Icon = {
  Lock: ({ size = 22, color = "#34d399" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
      <rect x="4" y="10" width="16" height="10" rx="2" stroke={color} strokeWidth="2" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke={color} strokeWidth="2" />
    </svg>
  ),
  Shield: ({ size = 22, color = "#60a5fa" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3l8 4v5c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V7l8-4z" stroke={color} strokeWidth="2" fill="none" />
      <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Activity: ({ size = 22, color = "#22d3ee" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 12h4l2 6 4-12 2 6h6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Users: ({ size = 22, color = "#f472b6" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="8" cy="9" r="3" stroke={color} strokeWidth="2" />
      <path d="M2 20c0-3.314 2.686-6 6-6" stroke={color} strokeWidth="2" />
      <circle cx="17" cy="8" r="3" stroke={color} strokeWidth="2" />
      <path d="M22 20c0-3.314-2.686-6-6-6" stroke={color} strokeWidth="2" />
    </svg>
  ),
  Cog: ({ size = 22, color = "#a78bfa" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" />
      <path d="M19.4 15a7.8 7.8 0 0 0 .1-6l2-1-2-3-2 1a7.8 7.8 0 0 0-5-2l-1-2H10l-1 2a7.8 7.8 0 0 0-5 2l-2-1-2 3 2 1a7.8 7.8 0 0 0 0 6l-2 1 2 3 2-1a7.8 7.8 0 0 0 5 2l1 2h2l1-2a7.8 7.8 0 0 0 5-2l2 1 2-3-2-1z" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  ),
  Check: ({ size = 18, color = "#22c55e" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 12l4 4L19 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Api: ({ size = 22, color = "#f59e0b" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 12h4M16 12h4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <rect x="9" y="6" width="6" height="12" rx="2" stroke={color} strokeWidth="2" />
    </svg>
  ),
};

// Responsive hook for inline styles
const useBreakpoints = () => {
  const get = () => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    return {
      sm: w < 640,
      md: w >= 640 && w < 1024,
      lg: w >= 1024,
      w,
    };
  };
  const [bp, setBp] = useState(get());
  useEffect(() => {
    const onResize = () => setBp(get());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return bp;
};

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

const EnhancedCTAAndFooter = () => {
  const bp = useBreakpoints();

  const sectionPad = bp.sm ? "4rem 1rem" : bp.md ? "5rem 1.5rem" : "6rem 2rem";
  const titleFS = bp.sm ? "1.9rem" : bp.md ? "2.2rem" : "2.5rem";
  const paraFS = bp.sm ? "1rem" : "1.15rem";

  const gridCols = bp.sm ? "1fr" : bp.md ? "repeat(2,1fr)" : "repeat(3,1fr)";
  const logoSize = bp.sm ? 24 : 28;

  return (
    <div style={{ fontFamily: "Inter, ui-sans-serif, system-ui", color: "white", background: "linear-gradient(180deg, #0b1020 0%, #0a0e19 100%)" }}>

      {/* Analytics Snapshots */}
      <section style={{ padding: sectionPad, maxWidth: 1200, margin: "0 auto" }}>
        <h3 style={{ textAlign: "center", fontSize: bp.sm ? "1.6rem" : "2rem", fontWeight: 800, marginBottom: "1rem" }}>
          Live analytics you can act on
        </h3>
        <p style={{ textAlign: "center", color: "#94a3b8", margin: "0 auto 1.75rem", maxWidth: 800 }}>
          Monitor users, sessions, and throughput; get AI insights that highlight anomalies and opportunities instantly.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: bp.sm ? "1fr" : "repeat(3,1fr)",
            gap: "1rem",
          }}
        >
          {[
            { label: "Active users", value: "12,480", delta: "+3.2%" },
            { label: "Avg. session", value: "7m 14s", delta: "+0.8%" },
            { label: "Task throughput", value: "+37%", delta: "+1.1%" },
          ].map((kpi, i) => (
            <div key={i} style={{ ...glass, padding: "1.25rem", borderRadius: 16 }}>
              <div style={{ color: "#94a3b8", fontSize: 12, marginBottom: 6 }}>{kpi.label}</div>
              <div style={{ fontSize: bp.sm ? "1.6rem" : "2rem", fontWeight: 900 }}>{kpi.value}</div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 8 }}>
                <Icon.Check />
                <span style={{ color: "#22c55e", fontWeight: 700 }}>{kpi.delta}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CompletePlatformControl />


      {/* Testimonials */}
      <section style={{ padding: sectionPad, background: "rgba(2,6,23,0.45)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h3 style={{ textAlign: "center", fontSize: bp.sm ? "1.6rem" : "2rem", fontWeight: 800, marginBottom: "1rem" }}>
            Trusted by modern platform teams
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: bp.sm ? "1fr" : bp.md ? "repeat(2,1fr)" : "repeat(3,1fr)",
              gap: "1rem",
            }}
          >
            {[
              { quote: "TaskFlow gave us a real-time lens into user behavior and risk.", name: "Head of Ops" },
              { quote: "We automated escalations and cut response times by 40%.", name: "Platform Lead" },
              { quote: "Insights are actionable, not just charts. Huge difference.", name: "VP, Engineering" },
            ].map((t, i) => (
              <div key={i} style={{ ...glass, borderRadius: 14, padding: "1.25rem" }}>
                <p style={{ margin: 0, color: "#e5e7eb" }}>"{t.quote}"</p>
                <div style={{ marginTop: 10, color: "#94a3b8", fontSize: 14 }}>— {t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Compact FAQ */}
      <section style={{ padding: sectionPad, background: "rgba(15,23,42,0.55)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h3 style={{ textAlign: "center", fontSize: bp.sm ? "1.6rem" : "2rem", fontWeight: 800, marginBottom: "1rem" }}>
            Frequently asked questions
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: bp.sm ? "1fr" : "repeat(2,1fr)", gap: "1rem" }}>
            {[
              { q: "How fast can we integrate?", a: "Most teams connect SSO and stream events within a day using our APIs." },
              { q: "Is TaskFlow secure?", a: "Yes—encryption at rest/in transit, RBAC, and full audit logs by default." },
              { q: "Do you support on-prem?", a: "Cloud-first, with private-cloud options for enterprise." },
              { q: "Can we customize roles?", a: "Granular roles and policy-based controls are built-in." },
            ].map((f, i) => (
              <div key={i} style={{ ...glass, borderRadius: 12, padding: "1rem" }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>{f.q}</div>
                <div style={{ color: "#9ca3af" }}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Footer (responsive) */}
      {/* Your CTA section (responsive tweaks) */}
      <section
        style={{
          textAlign: "center",
          padding: sectionPad,
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: bp.sm ? "-70%" : "-50%",
            right: "-20%",
            width: bp.sm ? "300px" : "400px",
            height: bp.sm ? "300px" : "400px",
            background: "radial-gradient(circle, rgba(167, 139, 250, 0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            zIndex: 1,
          }}
        />
        <div style={{ position: "relative", zIndex: 2, maxWidth: bp.sm ? "95%" : "800px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: titleFS,
              fontWeight: "800",
              marginBottom: "1rem",
              background: "linear-gradient(135deg, #a78bfa, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Ready to Transform Your Platform Management?
          </h2>
          <p
            style={{
              color: "#94a3b8",
              fontSize: paraFS,
              marginBottom: "2.25rem",
              lineHeight: "1.7",
            }}
          >
            Join thousands of teams who trust TaskFlow for comprehensive user tracking and platform management
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/login">
              <button
                style={{
                  background: "linear-gradient(135deg, #9333ea, #ec4899)",
                  padding: bp.sm ? "1rem 2rem" : "1.25rem 3rem",
                  borderRadius: "50px",
                  border: "none",
                  fontWeight: "700",
                  fontSize: bp.sm ? "1rem" : "1.1rem",
                  cursor: "pointer",
                  color: "white",
                  boxShadow: "0 10px 30px rgba(147, 51, 234, 0.4)",
                  minWidth: "200px",
                }}
              >
                Get Started Free
              </button>
            </Link>
            <Link to="/contact">
              <button
                style={{
                  background: "transparent",
                  padding: bp.sm ? "1rem 2rem" : "1.25rem 3rem",
                  borderRadius: "50px",
                  border: "2px solid #64748b",
                  fontWeight: "600",
                  fontSize: bp.sm ? "1rem" : "1.1rem",
                  cursor: "pointer",
                  color: "#e2e8f0",
                  minWidth: "200px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(100, 116, 139, 0.1)";
                  e.currentTarget.style.borderColor = "#a78bfa";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "#64748b";
                }}
              >
                Schedule Demo
              </button>
            </Link>
          </div>

          <div style={{ marginTop: "2.25rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <p style={{ color: "#64748b", fontSize: "0.9rem", margin: 0 }}>
              No credit card required • 14-day free trial • Enterprise ready
            </p>
          </div>
        </div>
      </section>

      {/* Effects: shimmer on buttons */}
<style>{`
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  @keyframes iconFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
  }
  * { box-sizing: border-box; }
  button { position: relative; overflow: hidden; }
  button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  button:hover::before { left: 100%; }
`}</style>
    </div>
  );
};

export default EnhancedCTAAndFooter;
