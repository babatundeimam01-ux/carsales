import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaLock, FaUser, FaSignInAlt, FaUserPlus, FaSpinner } from "react-icons/fa";

export default function AuthPage({ onSuccess }) {
  const { login, signup, loginWithGoogle } = useAuth();
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        await signup(form.email, form.password, form.name);
      } else {
        await login(form.email, form.password);
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    try {
      await loginWithGoogle();
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>{mode === "login" ? "Welcome Back" : "Create Account"}</h2>
        <p className="auth-subtitle">
          {mode === "login" ? "Log in to book and manage your rentals." : "Sign up to start booking today."}
        </p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === "signup" && (
            <div className="auth-input-group">
              <FaUser className="auth-icon" />
              <input name="name" type="text" placeholder="Full name" value={form.name} onChange={handleChange} required />
            </div>
          )}
          <div className="auth-input-group">
            <FaEnvelope className="auth-icon" />
            <input name="email" type="email" placeholder="Email address" value={form.email} onChange={handleChange} required />
          </div>
          <div className="auth-input-group">
            <FaLock className="auth-icon" />
            <input name="password" type="password" placeholder="Password (min 6 chars)" value={form.password} onChange={handleChange} required minLength={6} />
          </div>

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? <FaSpinner className="spinner" /> : mode === "login" ? <><FaSignInAlt /> Log In</> : <><FaUserPlus /> Sign Up</>}
          </button>
        </form>

        <div className="auth-divider"><span>or</span></div>

        <button onClick={handleGoogle} className="google-btn">
          <FcGoogle /> Continue with Google
        </button>

        <p className="auth-switch">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button type="button" onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}>
            {mode === "login" ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
}
