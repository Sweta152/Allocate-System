import { useState } from "react";

type MenuItem = {
  label: string;
  icon: string;
  path: string;
  roles: string[];
};

const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: "📊", path: "/dashboard", roles: ["ADMIN", "MANAGER", "EMPLOYEE"] },
  { label: "My Tasks", icon: "✅", path: "/tasks", roles: ["EMPLOYEE", "MANAGER", "ADMIN"] },
  { label: "Daily Report", icon: "📝", path: "/report", roles: ["EMPLOYEE"] },
  { label: "My Team", icon: "👥", path: "/team", roles: ["MANAGER", "ADMIN"] },
  { label: "Assign Tasks", icon: "📌", path: "/assign-tasks", roles: ["MANAGER", "ADMIN"] },
  { label: "Performance", icon: "📈", path: "/performance", roles: ["MANAGER", "ADMIN"] },
  { label: "All Employees", icon: "🏢", path: "/employees", roles: ["ADMIN"] },
];

interface SidebarProps {
  active?: string;
  setActive?: (label: string) => void;
  onLogout?: () => void;
}

const Sidebar = ({ active: activeProp, setActive: setActiveProp, onLogout }: SidebarProps) => {
  const [internalActive, setInternalActive] = useState("Dashboard");

  // Use external active/setActive if provided, otherwise use internal state
  const active = activeProp ?? internalActive;
  const setActive = setActiveProp ?? setInternalActive;

  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;
  const role = user?.role || "EMPLOYEE";

  const visibleItems = menuItems.filter(item => item.roles.includes(role));

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.clear();
      window.location.href = "/login";
    }
  };

  return (
    <aside style={{
      width: "240px",
      background: "#1e293b",
      color: "#fff",
      padding: "0",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Logo area */}
      <div style={{
        padding: "24px 20px",
        borderBottom: "1px solid #334155",
      }}>
        <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#fff", margin: 0 }}>
          🏢 CMS System
        </h2>
        <p style={{ fontSize: "12px", color: "#94a3b8", margin: "4px 0 0" }}>
          Case Management
        </p>
      </div>

      {/* User info */}
      {user && (
        <div style={{
          padding: "16px 20px",
          borderBottom: "1px solid #334155",
          background: "#0f172a",
        }}>
          <p style={{ fontSize: "13px", fontWeight: "600", margin: 0 }}>
            {user.firstName} {user.lastName}
          </p>
          <span style={{
            fontSize: "11px",
            background: role === "ADMIN" ? "#7c3aed" : role === "MANAGER" ? "#0369a1" : "#065f46",
            color: "#fff",
            padding: "2px 8px",
            borderRadius: "20px",
            marginTop: "4px",
            display: "inline-block",
          }}>
            {role}
          </span>
        </div>
      )}

      {/* Menu items */}
      <nav style={{ padding: "12px 0", flex: 1 }}>
        {visibleItems.map(item => (
          <div
            key={item.label}
            onClick={() => setActive(item.label)}
            style={{
              padding: "12px 20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "14px",
              background: active === item.label ? "#3b82f6" : "transparent",
              color: active === item.label ? "#fff" : "#cbd5e1",
              borderLeft: active === item.label ? "3px solid #93c5fd" : "3px solid transparent",
              transition: "all 0.2s",
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ padding: "16px 20px", borderTop: "1px solid #334155" }}>
        <button
          onClick={handleLogout}
          style={{
            width: "100%",
            padding: "10px",
            background: "#dc2626",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "500",
          }}
        >
          🚪 Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
