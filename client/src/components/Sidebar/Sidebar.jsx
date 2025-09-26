import { NavLink } from "react-router-dom";
import {
  FolderKanban,      // All Projects
  Landmark,          // Bank (bank statements)
  FileSpreadsheet,   // Invoices (tabular docs)
  Receipt,           // Bills / receipts
  IdCard,            // Emirates ID
  BookUser,          // Passport
  PlaneTakeoff,      // Visa / travel
  BadgeCheck         // Trade license / certified
} from "lucide-react";
import "./Sidebar.css";

export default function Sidebar({ collapsed }) {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-brand">
        <div className={`brand-wordmark ${collapsed ? "collapsed" : ""}`}>
          Converters
        </div>
        {!collapsed && <div className="brand-title">Tools & Extractors</div>}
      </div>

      <div className="nav-group">
        {!collapsed && <div className="nav-title">Projects</div>}
        <NavItem
          to="/"
          icon={<FolderKanban size={18} />}
          text="All Projects"
          collapsed={collapsed}
        />

        {!collapsed && <div className="nav-title">Converts</div>}
        <NavItem
          to="/converts/bank-statement"
          icon={<Landmark size={18} />}
          text="Bank Statements"
          collapsed={collapsed}
        />
        <NavItem
          to="/converts/invoices"
          icon={<FileSpreadsheet size={18} />}
          text="Invoices"
          collapsed={collapsed}
        />
        <NavItem
          to="/converts/bills"
          icon={<Receipt size={18} />}
          text="Bills"
          collapsed={collapsed}
        />
        <NavItem
          to="/converts/emiratesid"
          icon={<IdCard size={18} />}
          text="Emirates ID"
          collapsed={collapsed}
        />
        <NavItem
          to="/converts/passport"
          icon={<BookUser size={18} />}
          text="Passport"
          collapsed={collapsed}
        />
        <NavItem
          to="/converts/visa"
          icon={<PlaneTakeoff size={18} />}
          text="Visa"
          collapsed={collapsed}
        />
        <NavItem
          to="/converts/tradelicense"
          icon={<BadgeCheck size={18} />}
          text="Trade License"
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
