import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const [task, setTask] = useState({
    title: "To do",
    description: "i have to do this task",
    status: "Pending",
    tone: "Angry", // new field
    language: "English", // new field
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch("http://localhost:3000/api/tasks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setTask({ title: "", description: "", status: "", tone: "" });
      navigate("/allTasks");
    } catch (error) {
      console.error("Error while creating task:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #1e1e2e, #2e2e3e)",
        color: "#fff",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "rgba(40,40,60,0.9)",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.5)",
          width: "100%",
          maxWidth: "450px",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "28px",
            fontWeight: "bold",
            marginBottom: "20px",
            background: "linear-gradient(to right, #a855f7, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Create a New Task
        </h2>

        {/* Title */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "500", display: "block", marginBottom: "6px" }}>
            Title
          </label>
          <input
            type="text"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            placeholder="Enter task title"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #555",
              background: "#1e1e2e",
              color: "#fff",
              outline: "none",
            }}
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "500", display: "block", marginBottom: "6px" }}>
            Description
          </label>
          <textarea
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            placeholder="Enter task description"
            rows="3"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #555",
              background: "#1e1e2e",
              color: "#fff",
              outline: "none",
            }}
          />
        </div>

        {/* Status */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "500", display: "block", marginBottom: "6px" }}>
            Status
          </label>
          <select
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #555",
              background: "#1e1e2e",
              color: "#fff",
              outline: "none",
            }}
          >
            <option value="">Select status</option>
            <option value="pending">Pending ⏳</option>
            <option value="in-progress">In Progress 🚧</option>
            <option value="completed">Completed ✅</option>
          </select>
        </div>

        {/* Tone (New Field) */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "500", display: "block", marginBottom: "6px" }}>
            Tone
          </label>
          <select
            value={task.tone}
            onChange={(e) => setTask({ ...task, tone: e.target.value })}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #555",
              background: "#1e1e2e",
              color: "#fff",
              outline: "none",
            }}
          >
            <option value="">Select tone</option>
            <option value="Harsh">Harsh</option>
            <option value="Soft">Soft</option>
            <option value="Angry">Angry</option>
            <option value="Calm">Calm</option>
            <option value="Friendly">Friendly</option>
            <option value="Formal">Formal</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            fontWeight: "600",
            fontSize: "16px",
            background: "linear-gradient(to right, #a855f7, #ec4899)",
            color: "#fff",
            cursor: "pointer",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseOver={(e) =>
            (e.target.style.transform = "scale(1.05)") ||
            (e.target.style.boxShadow = "0 4px 15px rgba(168,85,247,0.6)")
          }
          onMouseOut={(e) =>
            (e.target.style.transform = "scale(1)") ||
            (e.target.style.boxShadow = "none")
          }
        >
          Create Task 🚀
        </button>
      </form>
    </div>
  );
};

export default CreateTask;