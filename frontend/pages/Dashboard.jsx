import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [todoInfo, setTodoInfo] = useState({ language: null, user: null, style: null });
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [users, setUsers] = useState([]);
  const [toshow, setToshow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPanel, setCurrentPanel] = useState('welcome'); // 'welcome', 'language', 'users', 'tones', 'final'

  const languages = ["English", "Hindi", "French", "Spanish"];
  const tones = ["Harsh", "Soft", "Angry", "Calm", "Friendly", "Formal"];

  // Mobile detection
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Navigation handlers for mobile
  const navigateToPanel = (panelName) => {
    setCurrentPanel(panelName);
  };

  const goBack = () => {
    if (currentPanel === 'final') {
      setTodoInfo((prev) => ({ ...prev, style: null }));
      setSelectedStyle(null);
      setToshow(null);
      setCurrentPanel('tones');
    } else if (currentPanel === 'tones') {
      setTodoInfo((prev) => ({ ...prev, user: null, style: null }));
      setCurrentPanel('users');
    } else if (currentPanel === 'users') {
      setTodoInfo((prev) => ({ ...prev, language: null, user: null, style: null }));
      setUsers([]);
      setCurrentPanel('language');
    } else if (currentPanel === 'language') {
      setTodoInfo({ language: null, user: null, style: null });
      setUsers([]);
      setCurrentPanel('welcome');
    }
  };

  // Desktop navigation (original logic)
  const handleSelectLanguage = (lang) => {
    setTodoInfo({ language: lang, user: null, style: null });
    setToshow(null);
    setIsLoading(false);
    if (isMobile) navigateToPanel('users');
  };

  const handleSelectUser = (user) => {
    setTodoInfo((prev) => ({ ...prev, user: { id: user.id, name: user.name } }));
    setToshow(null);
    setIsLoading(false);
    if (isMobile) navigateToPanel('tones');
  };

  const handleSelectTone = (tone) => {
    setTodoInfo((prev) => ({ ...prev, style: tone }));
    setSelectedStyle(tone);
    if (isMobile) navigateToPanel('final');
  };

  const closePanel = () => {
    setTodoInfo((prev) => ({ ...prev, style: null }));
    setSelectedStyle(null);
    setToshow(null);
    if (isMobile) setCurrentPanel('tones');
  };

  // Styles
  const mainBackground = {
    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    minHeight: "100vh",
    maxWidth: "100vw",
    overflowX: "hidden"
  };

  const navbarStyle = {
    height: "70px",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
    color: "#333",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    width: "100vw"
  };

  const searchInputStyle = {
    width: isMobile ? "70%" : "50%",
    maxWidth: isMobile ? "200px" : "400px",
    padding: "8px 12px",
    borderRadius: "20px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    outline: "none",
    background: "rgba(255, 255, 255, 0.9)",
    color: "#333",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    transition: "all 0.3s ease",
    fontSize: isMobile ? "14px" : "16px"
  };

  const iconStyle = {
    cursor: "pointer",
    color: "#666",
    transition: "color 0.3s ease",
    fontSize: isMobile ? "18px" : "20px",
    padding: "4px"
  };

  const glassCardStyle = {
    margin: "8px 0",
    padding: "12px 16px",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    color: "#333",
    cursor: "pointer",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
    fontWeight: 500,
    textAlign: "center",
    transition: "all 0.3s ease",
    width: "100%",
    fontSize: isMobile ? "14px" : "16px"
  };

  const hoverGlassStyle = {
    background: "rgba(255, 255, 255, 0.4)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
    transform: "translateY(-2px)",
  };

  const panelStyle = (isVisible, width) => ({
    width: isVisible ? width : 0,
    overflow: "scroll",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(20px)",
    borderRight: isVisible ? "1px solid rgba(255, 255, 255, 0.2)" : "none",
    transition: "width 0.3s ease-in-out",
    boxShadow: isVisible ? "inset 0 0 20px rgba(0,0,0,0.05)" : "none",
    padding: isVisible ? "20px 16px" : "0px",
    position: "relative",
    color: "#333",
    minWidth: isVisible ? "fit-content" : "0",
    height: "calc(100vh - 70px)"
  });

  const taskCardStyle = {
    margin: "12px 0",
    padding: "16px",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(0, 0, 0, 0.05)",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
    transition: "all 0.3s ease",
    width: "100%"
  };

  const aiResponseStyle = {
    marginTop: "16px",
    padding: "12px",
    borderRadius: "8px",
    background: "rgba(59, 130, 246, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(59, 130, 246, 0.2)",
    color: "#333",
    boxShadow: "0 2px 8px rgba(59, 130, 246, 0.15)",
    width: "100%"
  };

  const loaderStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: isMobile ? "200px" : "300px",
    color: "#666",
    fontSize: "1.1rem",
    padding: "20px"
  };

  const emptyStateStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: isMobile ? "40px 20px" : "60px 40px",
    textAlign: "center",
    maxWidth: "500px",
    margin: "0 auto",
    width: "100%"
  };

  // Mobile overlay and panel styles
  const mobileOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.4)",
    backdropFilter: "blur(8px)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px"
  };

  const mobilePanelStyle = {
    width: "100%",
    maxWidth: "95vw",
    maxHeight: "95vh",
    overflowY: "auto",
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.98)",
    padding: "20px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    animation: "slideUp 0.3s ease-out"
  };

  const mobileHeaderStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    paddingBottom: "12px",
    borderBottom: "1px solid rgba(0,0,0,0.08)"
  };

  const backButtonStyle = {
    background: "none",
    border: "none",
    fontSize: "18px",
    color: "#3b82f6",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: 500,
    transition: "all 0.2s"
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "12px",
    right: "16px",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "none",
    background: "rgba(0,0,0,0.08)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    color: "#666",
    zIndex: 10000,
    transition: "all 0.2s"
  };

  const panelTitleStyle = {
    color: "#333",
    fontSize: isMobile ? "1.3rem" : "1.5rem",
    fontWeight: 600,
    margin: 0,
    textAlign: "center"
  };

  // Data fetching
  useEffect(() => {
    if (todoInfo.language) {
      fetchUsers(todoInfo.language);
      if (isMobile && currentPanel !== 'users') navigateToPanel('users');
    } else {
      setUsers([]);
    }
  }, [todoInfo.language]);

const fetchUsers = async (lang) => {
  try {
    const res = await fetch(`${backendUrl}/api/dashboard/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: lang }),
    });

    const data = await res.json();
    console.log("Fetched data:", data);

    // ✅ Map se default avatar laga dena
    const updatedData = (data.users || data).map((user) => ({
      ...user,
      avatar:
        user.avatar && user.avatar.trim() !== ""
          ? user.avatar
          : "https://img.icons8.com/?size=100&id=EInDLGZwVHf7&format=png&color=000000",
    }));

    // ✅ Set users
    setUsers(updatedData);

    console.log("Updated users:", updatedData);
  } catch (err) {
    console.error("Error fetching users:", err);
  }
};

    useEffect(() => {
      if (!selectedStyle) return;
      handleGetTodo();
      if (isMobile) navigateToPanel('final');
    }, [selectedStyle]);

    const handleGetTodo = async () => {
      setIsLoading(true);
      const info = {
        language: todoInfo.language,
        user_id: todoInfo.user.id,
        tone: selectedStyle
      };
      console.log("user: ", users);

      // console.log("Sending request with:", info);
      try {
        const res = await fetch(`${backendUrl}/api/dashboard/task`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info)
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        if (data.success) {
          setToshow(data);
          // console.log("Fetched Todo:", data);
        }
      } catch (error) {
        console.error("Error fetching todo:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Icons
    const BellIcon = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        className="bi bi-bell"
        viewBox="0 0 16 16"
        style={iconStyle}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#3b82f6")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
      >
        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
      </svg>
    );

    const GearIcon = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        className="bi bi-gear"
        viewBox="0 0 16 16"
        style={iconStyle}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#3b82f6")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
      >
        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
      </svg>
    );

    const PersonIcon = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        className="bi bi-person"
        viewBox="0 0 16 16"
        style={iconStyle}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#3b82f6")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
      >
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
      </svg>
    );

    const SadFaceIcon = () => (
      <svg
        width={isMobile ? "60" : "80"}
        height={isMobile ? "60" : "80"}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginBottom: "16px", opacity: 0.5 }}
      >
        <circle cx="12" cy="12" r="10" stroke="#ccc" strokeWidth="2" fill="none" />
        <circle cx="8" cy="8" r="1.5" fill="#999" />
        <circle cx="16" cy="8" r="1.5" fill="#999" />
        <path d="M8 15c1 0 2 0 3 0c0 -1 0 -2 0 -2" stroke="#999" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M15 15a3 3 0 0 0 -6 0" stroke="#999" strokeWidth="2" fill="none" />
      </svg>
    );

    const LoadingSpinner = () => (
      <div
        style={{
          width: "32px",
          height: "32px",
          border: "3px solid rgba(59, 130, 246, 0.1)",
          borderTop: "3px solid #3b82f6",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          marginBottom: "12px",
        }}
      />
    );

    // Mobile panels content
    const renderMobilePanel = () => {
      switch (currentPanel) {
        case 'welcome':
          return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "40px 20px" }}>
              <h1 style={{ marginBottom: "16px", color: "#333", fontSize: isMobile ? "1.8rem" : "2.5rem", fontWeight: "300" }}>Welcome to Codevern Dashboard</h1>
              <p style={{ color: "#666", fontSize: isMobile ? "1rem" : "1.2rem", marginBottom: "24px", lineHeight: "1.5" }}>
                Select a language from the sidebar to get started with user tones and tasks.
              </p>
              <p style={{ color: "#888", fontSize: isMobile ? "0.9rem" : "1rem", lineHeight: "1.4" }}>
                Manage multilingual todos with AI-generated responses tailored to user preferences.
              </p>
              <button
                onClick={() => navigateToPanel('language')}
                style={{
                  marginTop: "24px",
                  padding: "12px 24px",
                  background: "rgba(255, 255, 255, 0.9)",
                  color: "#374151", // Dark gray for text
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: "25px",
                  fontSize: "16px",
                  fontWeight: 500,
                  cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.2s ease",
                  position: "relative",
                  overflow: "hidden"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.95)";
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.12)";
                  e.target.style.border = "1px solid rgba(0, 0, 0, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.9)";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.08)";
                  e.target.style.border = "1px solid rgba(0, 0, 0, 0.08)";
                }}
              >
                Get Started
              </button>

            </div>
          );

        case 'language':
          return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
              <div style={mobileHeaderStyle}>
                <button onClick={goBack} style={backButtonStyle}>
                  ← Back
                </button>
                <h2 style={panelTitleStyle}>Select Language</h2>
                <div style={{ width: "36px" }}></div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", width: "100%" }}>
                {languages.map((lang) => (
                  <div
                    key={lang}
                    style={glassCardStyle}
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverGlassStyle)}
                    onMouseLeave={(e) => Object.assign(e.currentTarget.style, glassCardStyle)}
                    onClick={() => handleSelectLanguage(lang)}
                  >
                    {lang}
                  </div>
                ))}
              </div>
            </div>
          );

        case 'users':
          return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
              <div style={mobileHeaderStyle}>
                <button onClick={goBack} style={backButtonStyle}>
                  ← Back
                </button>
                <h2 style={panelTitleStyle}>{todoInfo.language} Users</h2>
                <div style={{ width: "36px" }}></div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", width: "100%" }}>
                {users.map((user) => (
                  <div
                    key={user.id}
                    style={{
                      ...glassCardStyle,
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "0.75rem 1rem",
                      borderRadius: "1rem",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      Object.assign(e.currentTarget.style, hoverGlassStyle)
                    }
                    onMouseLeave={(e) =>
                      Object.assign(e.currentTarget.style, glassCardStyle)
                    }
                    onClick={() => handleSelectUser(user)}
                  >
                    {/* 🖼️ Avatar */}
                    <img
                      src={user.avatar}
                      alt={`${user.name}'s avatar`}
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid rgba(255,255,255,0.2)",
                        boxShadow: "0 0 8px rgba(0,0,0,0.3)",
                      }}
                    />

                    {/* 👤 User Name */}
                    <span
                      style={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "black",
                        letterSpacing: "0.5px",
                        flex: 1,
                      }}
                    >
                      {user.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );

        case 'tones':
          return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
              <div style={mobileHeaderStyle}>
                <button onClick={goBack} style={backButtonStyle}>
                  ← Back
                </button>
                <h2 style={panelTitleStyle}>{todoInfo.user?.name}'s Tones</h2>
                <div style={{ width: "36px" }}></div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", width: "100%" }}>
                {tones.map((tone) => (
                  <div
                    key={tone}
                    style={glassCardStyle}
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverGlassStyle)}
                    onMouseLeave={(e) => Object.assign(e.currentTarget.style, glassCardStyle)}
                    onClick={() => handleSelectTone(tone)}
                  >
                    {tone}
                  </div>
                ))}
              </div>
            </div>
          );

        case 'final':
          return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
              <div style={mobileHeaderStyle}>
                <button onClick={goBack} style={backButtonStyle}>
                  ← Back
                </button>
                <h2 style={panelTitleStyle}></h2>
                <button style={closeButtonStyle} onClick={closePanel}>×</button>
              </div>
              {isLoading ? (
                <div style={loaderStyle}>
                  <LoadingSpinner />
                  <p>Loading tasks...</p>
                </div>
              ) : toshow ? (
                <>
                  {toshow.tasks && toshow.tasks.length > 0 ? (
                    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "40px" }}>
                      {toshow.tasks.map((task, index) => (
                        <div key={index} style={taskCardStyle} onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.12)")} onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.08)")}>
                          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                            {task.user_info?.avatar && (
                              <img
                                src={task.user_info.avatar}
                                alt={task.user_info.name}
                                style={{ width: "40px", height: "40px", borderRadius: "50%", flexShrink: 0, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)" }}
                              />
                            )}
                            <div style={{ flex: 1 }}>
                              <h3 style={{ color: "#333", marginBottom: "6px", fontSize: "1.1rem", fontWeight: "600" }}>{task.title}</h3>
                              <p style={{ color: "#666", marginBottom: "8px", lineHeight: "1.4", fontSize: "0.95rem" }}>{task.description}</p>
                              {task.user_info && (
                                <p style={{ color: "#888", marginBottom: "6px", fontStyle: "italic", fontSize: "0.9rem" }}>
                                  Assigned to: {task.user_info.name}
                                </p>
                              )}
                              <p style={{ color: "#888", fontStyle: "italic", fontSize: "0.9rem" }}>
                                Status: <span style={{ color: "#3b82f6", fontWeight: "500" }}>{task.status || "Pending"}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={emptyStateStyle}>
                      <SadFaceIcon />
                      <h3 style={{ color: "#666", margin: "12px 0", fontSize: "1.2rem", fontWeight: "500" }}>No Todos Exist</h3>
                      <p style={{ color: "#888", fontSize: "1rem", lineHeight: "1.4" }}>
                        There are no tasks available for the selected language, user, and tone. Try adjusting your selections to fetch some todos.
                      </p>
                    </div>
                  )}
                  {toshow.aiResponse && (
                    <div style={aiResponseStyle}>
                      <strong style={{ color: "#3b82f6", fontSize: "0.95rem" }}>AI Suggestions:</strong>
                      <div style={{ marginTop: "8px", fontSize: "0.9rem", lineHeight: "1.4" }}>{toshow.aiResponse}</div>
                    </div>
                  )}
                </>
              ) : (
                <div style={emptyStateStyle}>
                  <p style={{ color: "#888", fontSize: "1.1rem" }}>404 Internal Server error!. Please try again.</p>
                </div>
              )}
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <div style={mainBackground}>
        {/* Navbar */}
        <div style={navbarStyle}>
          <div style={{
            fontWeight: "bold",
            fontSize: isMobile ? "1.2rem" : "1.4rem",
            color: "#333",
            minWidth: isMobile ? "120px" : "auto"
          }}>
            CodexAde
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <input
              type="text"
              placeholder="Search..."
              style={searchInputStyle}
              onFocus={(e) => {
                e.target.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.2)";
                e.target.style.background = "rgba(255, 255, 255, 1)";
                e.target.style.transform = "scale(1.02)";
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)";
                e.target.style.background = "rgba(255, 255, 255, 0.9)";
                e.target.style.transform = "scale(1)";
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <BellIcon />
            <GearIcon />
            <PersonIcon />
          </div>
        </div>

        {/* Desktop Layout */}
        {!isMobile ? (
          <div style={{ display: "flex", flex: 1, minHeight: "calc(100vh - 70px)" }}>
            {/* Language Bar */}
            <div
              style={{
                width: "7vw",
                minWidth: "80px",
                background: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(20px)",
                padding: "32px 16px",
                borderRight: "1px solid rgba(0, 0, 0, 0.05)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "4px 0 20px rgba(0, 0, 0, 0.05)",
              }}
            >
              {languages.map((lang) => (
                <div
                  key={lang}
                  style={{
                    marginBottom: "32px",
                    cursor: "pointer",
                    fontWeight: todoInfo.language === lang ? "bold" : "500",
                    color: todoInfo.language === lang ? "#3b82f6" : "#666",
                    fontSize: "1rem",
                    transition: "all 0.3s ease",
                    userSelect: "none",
                  }}
                  onClick={() => handleSelectLanguage(lang)}
                >
                  {lang}
                </div>
              ))}
            </div>

            {/* Welcome Panel */}
            {!todoInfo.language && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "40px", width: "93vw" }}>
                <div style={{ textAlign: "center", margin: "0 auto", maxWidth: "600px" }}>
                  <h1 style={{ marginBottom: "16px", color: "#333", fontSize: "2.5rem", fontWeight: "300" }}>Welcome to Codevern Dashboard</h1>
                  <p style={{ color: "#666", fontSize: "1.2rem", marginBottom: "24px" }}>Select a language from the sidebar to get started with user tones and tasks.</p>
                  <p style={{ color: "#888", fontSize: "1rem" }}>Manage multilingual todos with AI-generated responses tailored to user preferences.</p>
                </div>
              </div>
            )}

            {/* Users Panel */}
            <div style={panelStyle(!!todoInfo.language, "18vw")}>
              {todoInfo.language && (
                <>
                  <h3 style={{ marginBottom: "24px", color: "#333", fontSize: "1.3rem", fontWeight: "500" }}>
                    {todoInfo.language} Users
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {users.map((user) => (
                      <div
                        key={user.id}
                        style={{
                          ...glassCardStyle,
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                          padding: "0.75rem 1rem",
                          borderRadius: "1rem",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverGlassStyle)}
                        onMouseLeave={(e) => Object.assign(e.currentTarget.style, glassCardStyle)}
                        onClick={() => handleSelectUser(user)}
                      >
                        {/* 👇 Avatar Image */}
                        <img
                          src={user.avatar}
                          alt={`${user.name}'s avatar`}
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "2px solid rgba(255,255,255,0.2)",
                            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                          }}
                        />

                        {/* 👇 User Name */}
                        <span
                          style={{
                            fontSize: "1rem",
                            fontWeight: "600",
                            color: "black",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {user.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Tones Panel */}
            <div style={panelStyle(!!todoInfo.user, "22vw")}>
              {todoInfo.user && (
                <>
                  <h3 style={{ marginBottom: "24px", color: "#333", fontSize: "1.3rem", fontWeight: "500" }}>
                    {todoInfo.user.name}'s Tones
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {tones.map((tone) => (
                      <div
                        key={tone}
                        style={glassCardStyle}
                        onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverGlassStyle)}
                        onMouseLeave={(e) => Object.assign(e.currentTarget.style, glassCardStyle)}
                        onClick={() => handleSelectTone(tone)}
                      >
                        {tone}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Final Panel Desktop */}
            <div style={{ ...panelStyle(!!todoInfo.style, "auto"), flex: 1, background: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(20px)", padding: todoInfo.style ? "32px" : "0", height: "calc(100vh - 70px)" }}>
              {todoInfo.style && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "800px", margin: "0 auto" }}>
                  {isLoading ? (
                    <div style={loaderStyle}>
                      <LoadingSpinner />
                      <p>Loading tasks...</p>
                    </div>
                  ) : toshow ? (
                    <>
                      {toshow.tasks && toshow.tasks.length > 0 ? (
                        <>
                          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                            {toshow.tasks.map((task, index) => (
                              <div key={index} style={taskCardStyle} onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.12)")} onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.08)")}>
                                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                                  {task.user_info?.avatar && (
                                    <img
                                      src={task.user_info.avatar}
                                      alt={task.user_info.name}
                                      style={{ width: "48px", height: "48px", borderRadius: "50%", flexShrink: 0, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
                                    />
                                  )}
                                  <div style={{ flex: 1 }}>
                                    <h3 style={{ color: "#333", marginBottom: "8px", fontSize: "1.3rem", fontWeight: "600" }}>{task.title}</h3>
                                    <p style={{ color: "#666", marginBottom: "12px", lineHeight: "1.5" }}>{task.description}</p>
                                    {task.user_info && (
                                      <p style={{ color: "#888", marginBottom: "8px", fontStyle: "italic" }}>
                                        Assigned to: {task.user_info.name}
                                      </p>
                                    )}
                                    <p style={{ color: "#888", fontStyle: "italic" }}>
                                      Status: <span style={{ color: "#3b82f6", fontWeight: "500" }}>{task.status || "Pending"}</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div style={emptyStateStyle}>
                          <SadFaceIcon />
                          <h3 style={{ color: "#666", margin: "16px 0", fontSize: "1.5rem", fontWeight: "500" }}>No Todos Exist</h3>
                          <p style={{ color: "#888", fontSize: "1.1rem", lineHeight: "1.5" }}>
                            There are no tasks available for the selected language, user, and tone. Try adjusting your selections to fetch some todos.
                          </p>
                        </div>
                      )}
                      {toshow.aiResponse && (
                        <div style={aiResponseStyle}>
                          <strong style={{ color: "#3b82f6" }}>AI Suggestions to keepup with teh task:</strong> {toshow.aiResponse}
                        </div>
                      )}
                    </>
                  ) : (
                    <div style={emptyStateStyle}>
                      <p style={{ color: "#888", fontSize: "1.1rem" }}>Failed to load tasks. Please try again.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          // Mobile Layout - Single Panel System
          <>
            {/* Show overlay when a panel is open (except welcome) */}
            {(currentPanel !== 'welcome') && (
              <div style={mobileOverlayStyle} onClick={goBack}>
                <div style={mobilePanelStyle} onClick={(e) => e.stopPropagation()}>
                  {renderMobilePanel()}
                </div>
              </div>
            )}

            {/* Welcome screen - no overlay */}
            {currentPanel === 'welcome' && (
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "calc(100vh - 70px)",
                padding: "20px",
                width: "100vw"
              }}>
                {renderMobilePanel()}
              </div>
            )}
          </>
        )}

        <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 768px) {
          .mobile-optimized {
            padding: 8px;
            font-size: 14px;
          }
        }
      `}</style>
      </div>
    );
  }
