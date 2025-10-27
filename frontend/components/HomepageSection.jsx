import React from "react";

const CompletePlatformControl = () => {
  const DashboardIcon = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
        fill="url(#gradient1)"
      />
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#a78bfa" }} />
          <stop offset="100%" style={{ stopColor: "#ec4899" }} />
        </linearGradient>
      </defs>
    </svg>
  );

  const RealTimeIcon = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
        fill="url(#gradient5)"
      />
      <defs>
        <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#06b6d4" }} />
          <stop offset="100%" style={{ stopColor: "#0891b2" }} />
        </linearGradient>
      </defs>
    </svg>
  );

  const AIInsightsIcon = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
      <path
        d="M11 21.5l-1-1-4.5-4.5-2-2-2-2V11l2 2 2 2 4.5 4.5 1 1 10-10 2-2V3h-5.5l-2 2-10 10z"
        fill="url(#gradient6)"
      />
      <defs>
        <linearGradient id="gradient6" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#8b5cf6" }} />
          <stop offset="100%" style={{ stopColor: "#a78bfa" }} />
        </linearGradient>
      </defs>
    </svg>
  );

  const EnterpriseIcon = () => (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 21V3h18v18H3zm2-2h14V5H5v14zm3-3h8v2H8v-2zm0-4h8v2H8v-2zm0-4h8v2H8V8z"
        fill="url(#gradient7)"
      />
      <defs>
        <linearGradient id="gradient7" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#10b981" }} />
          <stop offset="100%" style={{ stopColor: "#34d399" }} />
        </linearGradient>
      </defs>
    </svg>
  );

  const sections = [
    {
      icon: <DashboardIcon />,
      title: "Centralized Dashboard",
      desc: "Get a comprehensive overview of all platform activity, user engagement, and system performance in one unified interface.",
      bg: "rgba(147, 51, 234, 0.1)",
    },
    {
      icon: <RealTimeIcon />,
      title: "Real-Time Monitoring",
      desc: "Track user sessions, live activities, and system events as they happen with instant notifications and detailed logs.",
      bg: "rgba(16, 185, 129, 0.1)",
    },
    {
      icon: <AIInsightsIcon />,
      title: "AI-Driven Analytics",
      desc: "Leverage machine learning to identify patterns, predict user behavior, and receive actionable insights for optimization.",
      bg: "rgba(139, 92, 246, 0.1)",
    },
  ];

  const enterpriseFeatures = [
    {
      icon: <EnterpriseIcon />,
      title: "Enterprise-Grade Security",
      desc: "Advanced encryption, SSO, and access control policies for complete organizational security.",
      bg: "rgba(34,197,94,0.1)",
    },
    {
      icon: <EnterpriseIcon />,
      title: "Scalable Infrastructure",
      desc: "Auto-scaling cloud architecture ensuring consistent performance during high traffic loads.",
      bg: "rgba(59,130,246,0.1)",
    },
    {
      icon: <EnterpriseIcon />,
      title: "Custom Integrations",
      desc: "Seamless API and webhook support for integrating with CRMs, analytics, and automation tools.",
      bg: "rgba(234,179,8,0.1)",
    },
  ];

  return (
    <section
      style={{
        padding: "6rem 2rem",
        background:
          "linear-gradient(135deg, rgba(31,41,55,0.8) 0%, rgba(17,24,39,0.9) 100%)",
      }}
    >
      {/* MAIN TITLE */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h2
          style={{
            fontSize: "3rem",
            fontWeight: "800",
            background: "linear-gradient(135deg, #ffffff, #e2e8f0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Complete Platform Control
        </h2>
        <p
          style={{
            color: "#94a3b8",
            fontSize: "1.125rem",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Monitor, analyze, and manage every aspect of your user ecosystem with
          precision.
        </p>
      </div>

      {/* GRID FIX: 2 IN FIRST ROW, 1 CENTERED BELOW */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "2rem",
          maxWidth: "1000px",
          margin: "0 auto 5rem",
        }}
      >
        {sections.slice(0, 2).map((item, i) => (
          <div
            key={i}
            style={{
              flex: "1 1 45%",
              minWidth: "300px",
              maxWidth: "460px",
              background: `linear-gradient(135deg, ${item.bg}, rgba(31, 41, 55, 0.8))`,
              padding: "3rem 2rem",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow:
                "0 10px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)",
              transition: "all 0.3s ease",
            }}
          >
            {item.icon}
            <h3 style={{ color: "white", fontSize: "1.5rem", marginTop: "1rem" }}>
              {item.title}
            </h3>
            <p style={{ color: "#cbd5e1" }}>{item.desc}</p>
          </div>
        ))}

        {/* CENTERED THIRD CARD */}
        <div
          style={{
            flex: "1 1 100%",
            maxWidth: "460px",
            margin: "0 auto",
            background: `linear-gradient(135deg, ${sections[2].bg}, rgba(31, 41, 55, 0.8))`,
            padding: "3rem 2rem",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow:
              "0 10px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)",
          }}
        >
          {sections[2].icon}
          <h3 style={{ color: "white", fontSize: "1.5rem", marginTop: "1rem" }}>
            {sections[2].title}
          </h3>
          <p style={{ color: "#cbd5e1" }}>{sections[2].desc}</p>
        </div>
      </div>

    </section>
  );
};

export default CompletePlatformControl;