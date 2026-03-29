import { useState } from "react";
import axios from "axios";

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (email === "" || password === "") {
      setError("Enter email and password");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter correct email");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(const res = await axios.post("https://netflix-login-page-ijh6.onrender.com/api/login",  {
        email,
        password
      });

      if (res.data.success) {
        setUser(res.data.user);
        setIsLoggedIn(true);
        setEmail("");
        setPassword("");
      } else {
        setError("Wrong email or password");
      }

    } catch (err) {
      setError("Backend not running");
    }

    setLoading(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
        <div className="text-center text-white">

          <h1 className="text-5xl font-bold mb-4">NETFLIX</h1>
          <h2 className="text-3xl mb-8">
            Welcome, {user.email}!
          </h2>

          <div className="bg-gray-800 p-8 rounded-lg mb-8">
            <p className="mb-4">You are logged in</p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-600 p-4 rounded hover:bg-red-700">Show 1</div>
              <div className="bg-red-600 p-4 rounded hover:bg-red-700">Show 2</div>
              <div className="bg-red-600 p-4 rounded hover:bg-red-700">Show 3</div>
              <div className="bg-red-600 p-4 rounded hover:bg-red-700">Show 4</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 px-6 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md px-4">

        <div className="text-center mb-10">
          <h1 className="text-5xl text-red-600 mb-2"> NETFLIX</h1>
          <p className="text-gray-400">Login</p>
        </div>

        <form onSubmit={handleLogin} className="bg-gray-900 p-6 rounded">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 bg-gray-700 text-white rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-3 bg-gray-700 text-white rounded"
          />

          {error && (
            <p className="text-red-400 mb-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 p-3 rounded hover:bg-red-700"
          >
            {loading ? "Checking..." : "Login"}
          </button>

        </form>

        <div className="mt-6 text-gray-400 text-sm text-center">
          <p>Demo:</p>
          <p>user@netflix.com / password:123</p>
        </div>

      </div>
    </div>
  );
}
