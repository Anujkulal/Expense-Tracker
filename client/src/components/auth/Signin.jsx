import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBackCircle } from "react-icons/io5";

export default function Signin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { signIn, user, error, setError, setAuthMessage, authMessage, authError, setAuthError, setIsAuth } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.length !== 0) {
      navigate("/dashboard"); // Redirect if user is already signed in
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors before attempting sign-in
    // setAuthMessage(null)
    setAuthError(null)
    try {
      const response = await signIn(formData);
      console.log("response in::::",response.success)
      if (response && response.success) {
        setIsAuth(true)
        navigate("/dashboard");
      } else {
        // setAuthMessage(error);
        console.log("Invalid credentials",authError)
      }
    } catch (error) {
      console.error("Signin Error:", error);
      setError(error.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-zinc-900 to-black">
      <div className="w-96 shadow-2xl rounded-2xl p-6 bg-zinc-800">
        <button onClick={() => navigate("/")} className="text-white cursor-pointer text-2xl transition duration-300 active:scale-75">
          <IoChevronBackCircle />
        </button>
        <h2 className="text-center text-2xl font-bold text-zinc-200">Sign In</h2>
        {authError && <p className="text-red-500 text-center">{authError}</p>} {/* Display errors if any */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 border border-zinc-600 rounded-lg w-full bg-zinc-700 text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-3 border border-zinc-600 rounded-lg w-full bg-zinc-700 text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 rounded-lg transition duration-300 shadow-md hover:shadow-teal-500/50 active:scale-95 cursor-pointer"
          >
            Sign In
          </button>
          <Link to="/signup" className="block text-center text-teal-400 hover:text-teal-300 hover:underline">
            Don't have an account? Sign Up
          </Link>
        </form>
      </div>
    </div>
  );
}
