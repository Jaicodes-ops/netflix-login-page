import { useState } from "react";
import axios from "axios";
import "./App.css";

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
      const res = await axios.post("https://netflix-login-page-2-p80v.onrender.com/api/login", {
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
      <div className="page">
        <div className="welcome-box">
          <h1 className="logo">NETFLIX</h1>
          <h2 className="welcome-text">Welcome, {user.email}!</h2>
          <div className="shows-box">
            <p className="logged-in-text">You are logged in</p>
            <div className="shows-grid">
              <div className="show-card">Show 1</div>
              <div className="show-card">Show 2</div>
              <div className="show-card">Show 3</div>
              <div className="show-card">Show 4</div>
            </div>
          </div>
          <button className="btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="login-box">
        <div className="login-header">
          <h1 className="logo red">NETFLIX</h1>
          <p className="subtitle">Login</p>
        </div>
        <form className="form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading} className="btn">
            {loading ? "Checking..." : "Login"}
          </button>
        </form>
        <div className="demo">
          <p>Demo:</p>
          <p>user@netflix.com / password:123</p>
        </div>
      </div>
    </div>
  );
}