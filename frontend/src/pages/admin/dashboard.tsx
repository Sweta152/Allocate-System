import { useState } from "react";
import type { CSSProperties } from "react";
import Sidebar from "../../components/sidebar";
import VerticalsTab from "../../components/verticalstab";
import AdminTab from "../../components/admintab";
import TeamTab from "../../components/teamtab";


interface User {
    name: string;
    role: string;
}

interface DashboardProps {
    user: User;
    onLogout: () => void;
}

type Tab = "Verticals" | "Admin" | "Team" | "Client" | "Sub Client" | "Role";

const TABS: Tab[] = ["Verticals", "Admin", "Team", "Client", "Sub Client", "Role"];

export default function Dashboard({ user, onLogout }: DashboardProps) {
    const [activeNav, setActiveNav] = useState<string>("Admin");
    const [activeTab, setActiveTab] = useState<Tab>("Verticals");

    return (
        <div style={styles.root}>
            <Sidebar active={activeNav} setActive={setActiveNav} onLogout={onLogout} />

            <div style={styles.main}>
                <div style={styles.header}>
                    <div>
                        <span style={styles.welcomeLabel}>Welcome,</span>
                        <span style={styles.welcomeName}>
                            {user.name || user.role}
                        </span>
                    </div>
                    <div style={styles.userBadge}>
                        <div style={styles.avatar}>A</div>
                        <div>
                            <div style={styles.userName}>{user.name}</div>
                            <div style={styles.userRole}>{user.role}</div>
                        </div>
                    </div>
                </div>

                <div style={styles.tabBar}>
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{ ...styles.tab, ...(activeTab === tab ? styles.tabActive : {}) }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div style={styles.content}>
                    {activeTab === "Verticals" && <VerticalsTab />}
                    {activeTab === "Admin" && <AdminTab />}
                    {activeTab === "Team" && <TeamTab />}
                    {(["Client", "Sub Client", "Role"] as Tab[]).includes(activeTab) && (
                        <div style={styles.placeholder}>
                            <div style={styles.placeholderIcon}>🚧</div>
                            <h3 style={styles.placeholderTitle}>{activeTab} Management</h3>
                            <p style={styles.placeholderText}>This section is under development.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, CSSProperties> = {
  root: {
    display: "flex",
    height: "calc(100vh - 50px)",
    margin: "25px",
    background: "#f3f4f6",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    boxSizing: "border-box",
    overflow: "hidden",
},
   main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    borderRadius: 12,
    overflow: "hidden",
},
    header: { background: "#fff", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" },
    welcomeLabel: { fontSize: 16, color: "#6b7280" },
    welcomeName: { fontSize: 16, fontWeight: 700, color: "#1a1a2e" },
    userBadge: { display: "flex", alignItems: "center", gap: 10 },
    avatar: { width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #e53935, #c62828)", color: "#fff", fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" },
    userName: { fontSize: 13, fontWeight: 600, color: "#1a1a2e" },
    userRole: { fontSize: 11, color: "#6b7280" },
    tabBar: { display: "flex", gap: 4, padding: "14px 28px 0", background: "#fff", borderBottom: "1px solid #e5e7eb" },
    tab: { padding: "10px 20px", border: "none", borderRadius: "8px 8px 0 0", background: "#f3f4f6", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#6b7280", transition: "all 0.15s" },
    tabActive: { background: "linear-gradient(135deg, #e53935, #c62828)", color: "#fff" },
   content: {
    flex: 1,
    padding: "24px 28px",
    overflowY: "auto",
},
    placeholder: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300, gap: 12, background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb" },
    placeholderIcon: { fontSize: 48 },
    placeholderTitle: { margin: 0, fontSize: 18, fontWeight: 700, color: "#1a1a2e" },
    placeholderText: { margin: 0, color: "#6b7280", fontSize: 14 },
};
