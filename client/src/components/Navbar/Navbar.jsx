import { Menu, User2 } from "lucide-react";
import "./Navbar.css";

export default function Navbar({ onToggleSidebar }) {
  return (
    <header className="topbar">
      <button className="menu-btn" onClick={onToggleSidebar} aria-label="Toggle sidebar">
        <Menu size={18} />
      </button>

      <div className="topbar-title"></div>

      <div className="topbar-right">
        <div className="profile">
          <User2 size={18} />
          <span className="profile-name">John Doe</span>
        </div>
      </div>
    </header>
  );
}
