import { NavLink } from "react-router-dom";
import { Files, Wand2 } from "lucide-react";
import "./Sidebar.css";

export default function Sidebar({ collapsed }) {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Wordmark instead of image logo */}
      <div className="sidebar-brand">
        <div className={`brand-wordmark ${collapsed ? "collapsed" : ""}`}>
          Converters
        </div>
        {/* Optional sublabel ( hide on collapse ) */}
        {!collapsed && <div className="brand-title">Tools & Extractors</div>}
      </div>

      {/* Converts group */}
      <div className="nav-group">
        {!collapsed && <div className="nav-title">Projects</div>}
        <NavItem
          to="/converts/Projects"
          icon={<Wand2 size={18} />}
          text="All Projects"
          collapsed={collapsed}
        />

        {!collapsed && <div className="nav-title">Converts</div>}
        <NavItem
          to="/converts/bank-statement"
          icon={<Wand2 size={18} />}
          text="Bank Statements"
          collapsed={collapsed}
        />
        <NavItem
          to="/converts/invoices"
          icon={<Files size={18} />}
          text="Invoices"
          collapsed={collapsed}
        />
        <NavItem
          to="/converts/bills"
          icon={<Files size={18} />}
          text="Bills"
          collapsed={collapsed}
        />
        <NavItem
          to="/converts/"
          icon={<Files size={18} />}
          text="Bills"
          collapsed={collapsed}
        />
        
        
      </div>
    </aside>
  );
}

function NavItem({ to, icon, text, collapsed }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
    >
      <span className="nav-icon">{icon}</span>
      {!collapsed && <span className="nav-text">{text}</span>}
    </NavLink>
  );
}
