import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const [todoInfo, setTodoInfo] = useState({ language: null, user: null, tone: null });
  const [users, setUsers] = useState([]);
  const [todo, setTodo] = useState(null);

  const languages = ["Hindi", "English", "French", "Spanish"];
  const tones = ["Harsh", "Soft", "Angry", "Calm", "Friendly", "Formal"];

  const cardStyle = {
    margin: "12px 0",
    padding: "14px 16px",
    borderRadius: "8px",
    background: "#2e2e3e",
    color: "#f0f0f0",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
    fontWeight: 500,
    textAlign: "center",
  };

  const hoverCardStyle = { background: "#3a3a4e" };

  const panelStyle = (isVisible, width) => ({
    width: isVisible ? width : 0,
    overflow: "hidden",
    background: "#1e1e2e",
    color: "#fff",
    transition: "width 0.25s ease-in-out",
    boxShadow: isVisible ? "inset 0 0 8px rgba(0,0,0,0.5)" : "none",
    padding: isVisible ? "20px" : "0px",
    position: "relative",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/dashboard/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleSelectLanguage = (lang) => {
    setTodoInfo({ language: lang, user: null, tone: null });
  };

  const handleSelectUser = (user) => {
    setTodoInfo((prev) => ({ ...prev, user: { id: user.id, name: user.name }, tone: null }));
  };

  const handleSelectTone = (tone) => {
    setTodoInfo((prev) => ({ ...prev, tone }));
    console.log("Selected Tone:", tone);
  };

const handleGetTodo = async () => {
    console.log("Sending request with:", todoInfo); // Debug log
    
    try {
        const res = await fetch("http://localhost:3000/api/dashboard/task", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                // Add auth header if you're using JWT
                // "Authorization": `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({
                user: {
                    id: todoInfo.user.id
                },
                tone: todoInfo.tone
            })
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        if (data.success) {
            setTodo(data.tasks);
            console.log("Fetched Todo:", data.tasks);
        }
    } catch (error) {
        console.error("Error fetching todo:", error);
    }
};



  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        fontFamily: "Inter, sans-serif",
        background: "#1e1e2e",
      }}
    >
      {/* Navbar */}
      <div
        style={{
          height: "60px",
          background: "#2e2e3e",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "1.2rem", color: "white" }}>Codevern</div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <input
            type="text"
            placeholder="Search..."
            style={{
              width: "50%",
              maxWidth: "400px",
              padding: "8px 14px",
              borderRadius: "20px",
              border: "none",
              outline: "none",
              background: "#1e1e2e",
              color: "#fff",
              boxShadow: "inset 0 0 6px rgba(0,0,0,0.4)",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <span style={{ cursor: "pointer" }}>🔔</span>
          <span style={{ cursor: "pointer" }}>⚙️</span>
          <span style={{ cursor: "pointer" }}>👤</span>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Language Bar */}
        <div
          style={{
            width: "13vw",
            minWidth: "60px",
            background: "rgb(46, 46, 62)",
            padding: "20px 10px",
            color: "#fff",
            boxShadow: "5px 10px 10px rgba(0,0,0,0.6)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {languages.map((lang) => (
            <div
              key={lang}
              style={{
                marginBottom: "30px",
                cursor: "pointer",
                fontWeight: todoInfo.language === lang ? "bold" : "normal",
                color: todoInfo.language === lang ? "white" : "#ddd",
              }}
              onClick={() => handleSelectLanguage(lang)}
            >
              {lang}
            </div>
          ))}
        </div>

        {/* Users Panel */}
        <div style={panelStyle(!!todoInfo.language, "18vw")}>
          {todoInfo.language && (
            <>
              <h3 style={{ marginBottom: "15px", color: "white" }}>{todoInfo.language} Users</h3>
              {users.map((user) => (
                <div
                  key={user.id}
                  style={cardStyle}
                  onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverCardStyle)}
                  onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
                  onClick={() => handleSelectUser(user)}
                >
                  {user.name}
                </div>
              ))}
            </>
          )}
        </div>

        {/* Tones Panel */}
        <div style={panelStyle(!!todoInfo.user, "22vw")}>
          {todoInfo.user && (
            <>
              <h3 style={{ marginBottom: "15px", color: "white" }}>{todoInfo.user.name}'s Tones</h3>
              {tones.map((tone) => (
                <div
                  key={tone}
                  style={cardStyle}
                  onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverCardStyle)}
                  onMouseLeave={(e) => Object.assign(e.currentTarget.style, cardStyle)}
                  onClick={() => handleSelectTone(tone)}
                >
                  {tone}
                </div>
              ))}
            </>
          )}
        </div>

        {/* Final Panel */}
        <div style={{ ...panelStyle(!!todoInfo.tone, "auto"), flex: 1 }}>
          {todoInfo.tone && (
            <>
              <h3 style={{ color: "white", fontSize: "1.2rem" }}>
                Selected Tone: {todoInfo.tone}
              </h3>
              <p style={{ color: "#bbb", marginTop: "10px" }}>
                Selected User is {todoInfo.user?.name} and his database id is {todoInfo.user?.id}
              </p>
              <button onClick={handleGetTodo} style={{ color: "#bbb", marginTop: "10px" }}>get the todo</button>
              {todo ? (<>
                <h2 style={{ marginTop: "20px", color: "white" }}>Fetched Todo:</h2>
                <div
                  style={{
                    marginTop: "10px",
                    padding: "15px",
                    background: "#2e2e3e",
                    borderRadius: "8px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
                  }}
                >
                  <h3 style={{ color: "#fff" }}>{todo.title}</h3>
                  <p style={{ color: "#ccc" }}>{todo.description}</p>
                  <p style={{ color: "#888", fontStyle: "italic" }}>Status: {todo.status}</p>
                </div>
              </> ) : (
                <p style={{ marginTop: "20px", color: "#bbb" }}>Click "get the todo" to fetch task</p>
              )}  
            </>
          )}
        </div>
      </div>
    </div>
  );
}