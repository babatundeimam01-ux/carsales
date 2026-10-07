import React from "react";
import { useAuth } from "../context/AuthContext";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";

export default function UserMenu() {
  const { currentUser, logout } = useAuth();
  if (!currentUser) return null;

  const name = currentUser.displayName || currentUser.email?.split("@")[0] || "User";

  return (
    <div className="user-menu">
      <FaUserCircle className="user-avatar" />
      <span className="user-name">{name}</span>
      <button onClick={logout} className="logout-btn" title="Log out">
        <FaSignOutAlt /> Log out
      </button>
    </div>
  );
}
