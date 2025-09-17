import Navbar from "../components/navbar";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/allTasks");
    }
  }, [navigate]);

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        color: "white",
        background: "linear-gradient(to bottom right, #111827, #000000, #1f2937)",
      }}
    >
      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          padding: "5rem 2rem",
          gap: "2rem",
          minHeight: "100vh"

        }}
      >
        <div style={{ flex: "1 1 400px", maxWidth: "600px" }}>
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "800",
              background: "linear-gradient(to right, #a78bfa, #ec4899)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              marginBottom: "1rem",
              lineHeight: "1.2",
            }}
          >
            Simplify Your Workflow, Supercharge Your Productivity
          </h2>
          <p
            style={{
              color: "#d1d5db",
              fontSize: "1.2rem",
              marginBottom: "2rem",
              lineHeight: "1.6",
            }}
          >
            Taskflow is your intelligent to-do list app that helps you manage
            personal and professional tasks with ease. Stay on top of deadlines,
            collaborate with teams, and focus on what truly matters.
          </p>
          <Link to="/login">
            <button
              style={{
                background: "linear-gradient(to right, #9333ea, #ec4899)",
                padding: "1rem 2rem",
                borderRadius: "0.75rem",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(147, 51, 234, 0.5)",
              }}
            >
              Start Using Taskflow
            </button>
          </Link>
        </div>
        <div style={{ flex: "1 1 400px", textAlign: "center" }}>
          <img
            style={{
              margin: "auto",
              width: "100%",
              maxWidth: "550px",
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
            src="https://static.wingify.com/gcp/uploads/sites/18/2022/11/unnamed-27.png"
            alt="Taskflow Hero"
          />
        </div>
      </section>

      {/* How It Works */}
      <section
        style={{
          padding: "5rem 2rem",
          textAlign: "center",
          background: "rgba(31,41,55,0.7)",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "2rem",
          }}
        >
          How Taskflow Works
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {[
            {
              step: "Add Tasks",
              img: "https://images.pexels.com/photos/5912284/pexels-photo-5912284.jpeg",
              desc: "Easily create tasks and categorize them based on projects, urgency, or custom labels.",
            },
            {
              step: "Organize",
              img: "https://images.pexels.com/photos/670723/pexels-photo-670723.jpeg",
              desc: "Group tasks, prioritize them, and set deadlines so you stay in control.",
            },
            {
              step: "Track Progress",
              img: "https://images.pexels.com/photos/7887844/pexels-photo-7887844.jpeg",
              desc: "Monitor completion rates, visualize productivity, and celebrate wins!",
            },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: "rgba(17,24,39,0.85)",
                padding: "2rem",
                borderRadius: "1rem",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 6px 12px rgba(0,0,0,0.4)",
              }}
            >
              <img
                src={s.img}
                alt={s.step}
                style={{
                  marginBottom: "1.5rem",
                  width: "100%",
                  borderRadius: "12px",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                {s.step}
              </h3>
              <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section
        style={{
          padding: "4rem 2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "3rem",
          }}
        >
          Features That Make You Productive
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          {[
            {
              img: "https://www.proofhub.com/articles/wp-content/uploads/2023/12/Task-scheduling-software.jpg",
              title: "Smart Task Scheduling",
              desc: "Automatically organize tasks based on urgency, importance, and your daily routine.",
            },
            {
              img: "https://images.pexels.com/photos/8850706/pexels-photo-8850706.jpeg",
              title: "Custom Reminders",
              desc: "Never miss a deadline again with powerful reminders tailored to your workflow.",
            },
            {
              img: "https://images.pexels.com/photos/5912280/pexels-photo-5912280.jpeg",
              title: "Team Collaboration",
              desc: "Work together seamlessly. Share tasks, assign responsibilities, and track progress.",
            },
            {
              img: "https://images.pexels.com/photos/5882706/pexels-photo-5882706.jpeg",
              title: "Cloud Sync",
              desc: "Access your to-do lists anytime, anywhere. All your tasks stay in sync across devices.",
            },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                background: "rgba(31, 41, 55, 0.85)",
                padding: "2rem",
                borderRadius: "1rem",
                textAlign: "center",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
              }}
            >
              <img
                src={f.img}
                alt={f.title}
                style={{
                  marginBottom: "1.5rem",
                  width: "100%",
                  borderRadius: "12px",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                {f.title}
              </h3>
              <p style={{ color: "#9ca3af", fontSize: "0.95rem" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Productivity Tips Section */}
      <section
        style={{
          padding: "5rem 2rem",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "2rem",
          }}
        >
          Master Your Productivity
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          {[
            {
              title: "Stay Focused",
              img: "https://images.pexels.com/photos/1262304/pexels-photo-1262304.jpeg",
              desc: "Use Taskflow to cut through distractions and focus on one task at a time.",
            },
            {
              title: "Plan Your Day",
              img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
              desc: "Design your day with structured task blocks and never feel overwhelmed.",
            },
            {
              title: "Track Achievements",
              img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
              desc: "Celebrate progress by visualizing how much you’ve accomplished.",
            },
          ].map((tip, i) => (
            <div
              key={i}
              style={{
                borderRadius: "1rem",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
              }}
            >
              <img
                src={tip.img}
                alt={tip.title}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <div style={{ padding: "1.5rem", background: "rgba(31,41,55,0.9)" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                  {tip.title}
                </h3>
                <p style={{ color: "#9ca3af", fontSize: "0.95rem" }}>
                  {tip.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Download Section */}
      <section
        style={{
          textAlign: "center",
          padding: "5rem 2rem",
          background: "rgba(31,41,55,0.7)",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "1rem",
          }}
        >
          Get Taskflow Today
        </h2>
        <p style={{ color: "#9ca3af", marginBottom: "2rem", fontSize: "1.1rem" }}>
          Available on Web, iOS, and Android. Start organizing your life in just
          a few clicks.
        </p>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "2rem",
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          color: "#9ca3af",
        }}
      >
        <p>© {new Date().getFullYear()} Taskflow. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;