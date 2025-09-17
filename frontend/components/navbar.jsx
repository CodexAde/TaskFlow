import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 960 : true
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef(null);
 
  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 960;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };
    const onScroll = () => setScrolled(window.scrollY > 4);
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    onResize();
    onScroll();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const wrap = (styles) => Object.assign({}, styles); // tiny helper

  const shellStyles = wrap({
    position: "sticky",
    top: 0,
    zIndex: 100,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    background: scrolled ? "rgba(17,24,39,0.85)" : "rgba(17,24,39,0.35)",
    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.06)",
    transition: "background 220ms ease, border-color 220ms ease, box-shadow 220ms ease",
    boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.45)" : "none",
  });

  const container = wrap({
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0.75rem 1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
  });

  const brandWrap = wrap({
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    textDecoration: "none",
    color: "white",
    cursor: "pointer",
  });

  const brandText = wrap({
    fontWeight: 800,
    fontSize: "1.25rem",
    background: "linear-gradient(to right, #a78bfa, #ec4899)",
    WebkitBackgroundClip: "text",
    color: "transparent",
    letterSpacing: "0.3px",
  });

  const navWrap = wrap({
    display: isMobile ? "none" : "flex",
    alignItems: "center",
    gap: "1.25rem",
  });

  const linkStyle = wrap({
    fontSize: "0.98rem",
    color: "#d1d5db",
    textDecoration: "none",
    padding: "0.4rem 0.5rem",
    borderRadius: "0.5rem",
    transition: "color 160ms ease, background 160ms ease, transform 160ms ease",
  });

  const ctaStyle = wrap({
    background: "linear-gradient(to right, #9333ea, #ec4899)",
    border: "none",
    color: "white",
    padding: "0.6rem 1rem",
    borderRadius: "0.75rem",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 6px 16px rgba(147, 51, 234, 0.45)",
    transition: "transform 160ms ease, box-shadow 160ms ease, opacity 160ms ease",
    whiteSpace: "nowrap",
  });

  const burgerBtn = wrap({
    display: isMobile ? "inline-flex" : "none",
    alignItems: "center",
    justifyContent: "center",
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(31,41,55,0.5)",
    cursor: "pointer",
    transition: "background 160ms ease, transform 160ms ease",
  });

  const panel = wrap({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    background: "rgba(17,24,39,0.96)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    transform: menuOpen ? "translateY(0)" : "translateY(-12px)",
    opacity: menuOpen ? 1 : 0,
    pointerEvents: menuOpen ? "auto" : "none",
    transition: "transform 220ms ease, opacity 220ms ease",
    zIndex: 90,
  });

  const panelInner = wrap({
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0.75rem 1rem 1rem",
  });

  const panelList = wrap({
    display: "grid",
    gap: "0.5rem",
    padding: "0.5rem 0",
  });

  const panelLink = wrap({
    textDecoration: "none",
    color: "white",
    background: "rgba(31,41,55,0.7)",
    padding: "0.9rem 1rem",
    borderRadius: "0.9rem",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
  });

  const gradientBadge = wrap({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    borderRadius: 10,
    background: "linear-gradient(135deg, #9333ea, #ec4899)",
    boxShadow: "0 8px 18px rgba(236,72,153,0.35)",
  });

  const icon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 7L9 18l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how" },
    { label: "Productivity", href: "#tips" },
    { label: "Download", href: "#download" },
  ];

  return (
    <>
      {/* Mobile panel */}
      <div ref={panelRef} style={panel} role="dialog" aria-modal="true" aria-label="Mobile Navigation">
        <div style={panelInner}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
            <a href="#" style={brandWrap}>
              <span style={gradientBadge}>{icon}</span>
              <span style={brandText}>Taskflow</span>
            </a>
            <button
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              style={wrap({
                ...burgerBtn,
                display: "inline-flex",
                transform: "none",
              })}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav style={panelList} aria-label="Mobile primary">
            {navItems.map((n) => (
              <a key={n.href} href={n.href} style={panelLink} onClick={() => setMenuOpen(false)}>
                {n.label}
              </a>
            ))}
            <button style={{ ...ctaStyle, width: "100%", marginTop: "0.5rem" }} onClick={() => setMenuOpen(false)}>
              Get Started
            </button>
          </nav>
        </div>
      </div>

      {/* Sticky navbar */}
      <div style={shellStyles}>
        <div style={container}>
          {/* Brand */}
          <a href="#" style={brandWrap}>
            <span style={gradientBadge}>{icon}</span>
            <span style={brandText}>Taskflow</span>
          </a>

          {/* Desktop nav */}
          <nav style={navWrap} role="navigation" aria-label="Primary">
            {navItems.map((n) => (
              <a
                key={n.href}
                href={n.href}
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {n.label}
              </a>
            ))}
           <Link to="/login"><button
              style={ctaStyle}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              Get Started
            </button></Link>
          </nav>

          {/* Burger */}
          <button
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            style={burgerBtn}
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  );
}