import React, { useState, useEffect } from "react";
import TaskNavbar from "./TaskNavbar";
const AllTask = () => {
  const [tasks, setTasks] = useState([]);
  const [editedTasks, setEditedTasks] = useState({
    title: "To do",
    description: "i have to do this task",
    status: "Pending",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch("http://localhost:3000/api/tasks/getAllTasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setTasks(data.tasks || []);
      } catch (error) {
        console.error("Error while fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(
        `http://localhost:3000/api/tasks/deleteTask/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        setTasks(tasks.filter((task) => task._id !== taskId));
      }
    } catch (error) {
      console.error("Error while deleting task:", error);
    }
  };

  const handleEdit = async (taskId) => {
    const taskToEdit = tasks.find((task) => task._id === taskId);
    setEditedTasks(taskToEdit);
    setIsModalOpen(true);
    const res = await fetch(`http://localhost:3000/api/tasks/updateTask/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editedTasks)
    }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    if (data.success) {
      setTasks(tasks.filter((task) => task._id !== taskId));
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditedTasks({
      title: "To do",
      description: "i have to do this task",
      status: "Pending",
    });
  };

  const handleModalSave = (e) => {
    e.preventDefault();
    console.log("Updated Task:", editedTasks);
    // Later: connect API for updating here
    setIsModalOpen(false);
  };

  return (
    <>
      <TaskNavbar />
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #1e1e2e, #2e2e3e, #3b3b5c)",
          padding: "40px 20px",
        }}
      >


        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {tasks.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                color: "#ddd",
                fontSize: "1.2rem",
                background: "rgba(0,0,0,0.4)",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
              }}
            >
              No tasks available. Start by adding one 🚀
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                style={{
                  background: "linear-gradient(145deg, #2e2e3e, #1e1e2e)",
                  padding: "20px",
                  borderRadius: "18px",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.6)",
                  color: "#eee",
                  position: "relative",
                  transition: "transform 0.2s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.02)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <h2
                  style={{
                    marginBottom: "12px",
                    color: "#f472b6",
                    fontSize: "1.5rem",
                    fontWeight: "600",
                  }}
                >
                  {task.title}
                </h2>
                <p style={{ marginBottom: "12px", color: "#ddd", lineHeight: "1.5" }}>
                  {task.description}
                </p>
                <p
                  style={{
                    marginBottom: "10px",
                    fontWeight: "500",
                    color:
                      task.status === "Completed" ? "#34d399" : "#facc15",
                  }}
                >
                  <strong>Status:</strong> {task.status}
                </p>
                {task.dueDate && (
                  <p style={{ fontSize: "0.95rem", color: "#aaa" }}>
                    <strong>Due Date:</strong>{" "}
                    {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "15px",
                    gap: "15px",
                  }}
                >
                  <button
                    onClick={() => handleEdit(task._id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                    title="Edit Task"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                    title="Delete Task"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Popup */}
        {isModalOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: "linear-gradient(145deg, #2e2e3e, #1e1e2e)",
                padding: "35px 30px",
                borderRadius: "20px",
                boxShadow: "0 15px 40px rgba(0,0,0,0.8)",
                color: "#eee",
                width: "420px",
                transform: "scale(1)",
                animation: "popIn 0.3s ease",
              }}
            >
              <h2
                style={{
                  marginBottom: "20px",
                  color: "#a78bfa",
                  textAlign: "center",
                  fontWeight: "700",
                  fontSize: "1.8rem",
                }}
              >
                Edit Task
              </h2>
              <form onSubmit={handleModalSave}>
                <input
                  type="text"
                  value={editedTasks.title}
                  onChange={(e) =>
                    setEditedTasks({ ...editedTasks, title: e.target.value })
                  }
                  placeholder="Task Title"
                  style={{
                    width: "100%",
                    marginBottom: "15px",
                    padding: "12px",
                    borderRadius: "12px",
                    border: "none",
                    outline: "none",
                    fontSize: "1rem",
                    color: "rgb(40 40 56)",
                  }}
                />
                <textarea
                  value={editedTasks.description}
                  onChange={(e) =>
                    setEditedTasks({ ...editedTasks, description: e.target.value })
                  }
                  placeholder="Task Description"
                  rows="4"
                  style={{
                    width: "100%",
                    marginBottom: "15px",
                    padding: "12px",
                    borderRadius: "12px",
                    border: "none",
                    outline: "none",
                    resize: "none",
                    fontSize: "1rem",
                    color: "rgb(40 40 56)",

                  }}
                />
                <select
                  value={editedTasks.status}
                  onChange={(e) =>
                    setEditedTasks({ ...editedTasks, status: e.target.value })
                  }
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    padding: "12px",
                    borderRadius: "12px",
                    border: "none",
                    outline: "none",
                    fontSize: "1rem",
                    background: "#2e2e3e",
                    color: "#eee",
                  }}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <button
                    type="button"
                    onClick={handleModalClose}
                    style={{
                      flex: 1,
                      padding: "12px 0",
                      background: "#f87171",
                      border: "none",
                      borderRadius: "12px",
                      cursor: "pointer",
                      color: "white",
                      fontWeight: "600",
                      fontSize: "1rem",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: "12px 0",
                      background: "#34d399",
                      border: "none",
                      borderRadius: "12px",
                      cursor: "pointer",
                      color: "white",
                      fontWeight: "600",
                      fontSize: "1rem",
                    }}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllTask;