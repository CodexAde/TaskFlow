import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import formateValidator from "../utils/formateValidator";
import UserContext from "../context/userContext";
import SkeletonLoader from "../components/RegisteringComponet/Skeleton";

const Registering = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
    language: "",
  });
  const [loading, setLoading] = useState(false);
  const { setCredentials, RegisteringUser } = useContext(UserContext);
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
    <div className="flex min-h-screen items-center justify-center bg-[#f2f6fb] text-gray-900 p-4">
      {loading ? (
        
        <SkeletonLoader />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/70 backdrop-blur-2xl border border-[#e2e8f0] shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-3xl p-8 relative"
        >
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#007aff]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#60a5fa]/10 rounded-full blur-3xl"></div>

          <h1 className="text-3xl font-extrabold text-center text-[#1e293b] mb-2">
            Create Account
          </h1>
          <p className="text-center text-[#6b7280] text-sm mb-8">
            Join Taskflow and stay organized effortlessly
          </p>

          {["name", "email", "password"].map((field) => (
            <div key={field} className="mb-5">
              <label className="block text-sm font-medium text-[#374151] mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                value={user[field]}
                onChange={(e) =>
                  setUser({ ...user, [field]: e.target.value })
                }
                placeholder={field}
                className="w-full px-4 py-2.5 rounded-xl border border-[#d1d5db] bg-[#f9fafb]/70 text-gray-900 focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/20 outline-none transition-all shadow-inner"
              />
            </div>
          ))}

          <div className="flex gap-3 mb-6">
            <select
              value={user.language}
              onChange={(e) =>
                setUser({ ...user, language: e.target.value })
              }
              className="flex-1 px-4 py-2.5 rounded-xl border border-[#d1d5db] bg-[#f9fafb]/70 focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/20 outline-none cursor-pointer shadow-inner"
            >
              <option>Select language</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="French">French</option>
              <option value="Spanish">Spanish</option>
            </select>

            <input
              type="file"
              onChange={(e) =>
                setUser({ ...user, avatar: e.target.files[0] })
              }
              className="flex-1 w-full px-4 py-2.5 rounded-xl border border-[#d1d5db] bg-[#f9fafb]/70 text-gray-700 cursor-pointer focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/20 outline-none shadow-inner"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-[#007aff] text-white font-semibold shadow-md hover:shadow-lg hover:bg-[#006ae0] transition-all active:scale-[0.98]"
          >
            Sign Up
          </button>

          <p className="text-sm text-[#6b7280] text-center mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#007aff] hover:underline font-medium"
            >
              Login here
            </Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default Registering;