import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const author = "Anuj Kulal";
  
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  }
  const handleSignin = () => {
    navigate("/signin");
  }
  return (
    <div className="bg-zinc-900 text-white min-h-screen">
      {/* Navbar */}
      <header className="py-6 px-8 flex justify-between items-center border-b border-zinc-700">
        <h1 className="text-2xl font-bold">Expense Tracker</h1>
        <button onClick={handleSignup} className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-md transition duration-300 active:scale-95 cursor-pointer">
          Get Started
        </button>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h2 className="text-4xl font-extrabold mb-4">Track Your Expenses Easily</h2>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Manage your finances effortlessly with real-time tracking, detailed insights, and a clean, user-friendly interface.
        </p>
        <button onClick={handleSignin} className="mt-6 bg-green-600 hover:bg-green-500 transition duration-300 active:scale-95 px-6 py-3 rounded-lg text-lg cursor-pointer">
          Start Tracking
        </button>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 px-10 py-16 bg-zinc-800">
        {[
          { title: "Real-time Tracking", desc: "Get instant updates on your spending." },
          { title: "Detailed Reports", desc: "Analyze your expenses with detailed graphs." },
          { title: "Secure & Private", desc: "Your data is encrypted and secure." }
        ].map((feature, index) => (
          <div key={index} className="p-6 border border-zinc-700 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-zinc-400">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="py-6 text-center border-t border-zinc-700">
        <p className="text-zinc-500">&copy; {author} 2025 Expense Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
}
