import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronBackCircle } from "react-icons/io5";

export default function Signup() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const { signUp, authMessage, user, setAuthError, authError } = useGlobalContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);
    await signUp(formData);
    console.log("autherror:::",authError)
    if (!authError) {
      navigate("/signin");
      // setAuthError(null)
    } else {
      // setAuthMessage(error);
      console.log("Invalid credentials",authError)
    }
  };


  const handleNavigateHome = () => {
    navigate("/");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-zinc-900 to-black">
  <div className="w-96 shadow-2xl rounded-2xl p-6 bg-zinc-800"> 
    <button onClick={handleNavigateHome} className="text-white cursor-pointer text-2xl transition duration-300 active:scale-75">
        <IoChevronBackCircle/>
    </button>
    <h2 className="text-center text-2xl font-bold text-zinc-200">Sign Up</h2>
    {authError && <p className="text-red-500 text-center">{authError}</p>}
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <input
        name="username"
        type="text"
        placeholder="Full Name"
        value={formData.username}
        onChange={handleChange}
        required
        className="p-3 border border-zinc-600 rounded-lg w-full bg-zinc-700 text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
      />
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
        className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 rounded-lg transition duration-300 active:scale-95 shadow-md hover:shadow-teal-500/50 cursor-pointer"
      >
        Sign Up
      </button>
      <Link to="/signin" className="block text-center text-teal-400 hover:text-teal-300 hover:underline">
        Already have an account? Sign In
      </Link>
    </form>
  </div>
</div>

  );
}