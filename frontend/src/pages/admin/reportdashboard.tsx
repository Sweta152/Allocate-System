import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";

interface StatCardData {
    title: string;
    today: number;
    total: number;
}

interface VerticalCase {
    name: string;
    count: number;
}

const statCards: StatCardData[] = [
    { title: "Completed Cases", today: 0, total: 0 },
    { title: "Pending Cases", today: 0, total: 0 },
    { title: "Working Hours", today: 0, total: 0 },
    { title: "No of user", today: 0, total: 0 },
];

// Replace with real data from your API
const verticalCases: VerticalCase[] = [];

const MOBILE_BREAKPOINT = 768;

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false
    );
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);
    return isMobile;
}

export default function ReportDashboard() {
    const isMobile = useIsMobile();
    const [activeNav, setActiveNav] = useState("Report");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSetActiveNav = (label: string) => {
        setActiveNav(label);
        if (isMobile) setSidebarOpen(false);
    };

    // Replace with a real refetch/API call once data is wired up
    const handleRefresh = () => {
        window.location.reload();
    };
    return (
        <div style={isMobile ? styles.rootMobile : styles.root}>

            {isMobile && (
                <div style={styles.mobileTopbar}>
                    <button
                        style={styles.hamburgerBtn}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        ☰
                    </button>

                    <span style={styles.mobileTitle}>Report Dashboard</span>
                </div>
            )}


            {/* ✅ 2. SIDEBAR (PUT HERE - AFTER TOPBAR) */}
            {isMobile ? (
                <>
                    {sidebarOpen && (
                        <div
                            style={styles.overlay}
                            onClick={() => setSidebarOpen(false)}
                        />
                    )}

                    <div
                        style={{
                            ...styles.sidebarDrawer,
                            transform: sidebarOpen
                                ? "translateX(0)"
                                : "translateX(-100%)",
                        }}
                    >
                        <Sidebar
                            active={activeNav}
                            setActive={setActiveNav}
                        />
                    </div>
                </>
            ) : (
                <Sidebar
                    active={activeNav}
                    setActive={setActiveNav}
                />
            )}

            {/* Content column — flex sibling of the sidebar, takes remaining width */}
            <div style={isMobile ? styles.contentColMobile : styles.contentCol}>
                <Header onRefresh={handleRefresh} />

                <div style={styles.contentBody}>
                    <div style={isMobile ? styles.statsRowMobile : styles.statsRow}>
                        {statCards.map((card) => (
                            <StatCard key={card.title} {...card} />
                        ))}
                    </div>

                    <div style={isMobile ? styles.contentRowMobile : styles.contentRow}>
                        <div style={styles.leftCol}>
                            <div style={styles.panel}>
                                <p style={styles.panelTitle}>Billable data</p>
                                <div style={styles.chartPlaceholder}>
                                    <BillableChart />
                                </div>
                            </div>

                            <div style={styles.panel}>
                                <p style={styles.panelTitle}>Work Progress Report</p>
                                <div style={styles.emptyState}>No data yet</div>
                            </div>
                        </div>

                        <div style={styles.rightCol}>
                            <div style={styles.tableHead}>
                                <span style={styles.tableHeadLabel}>Vertical Name</span>
                                <span style={styles.tableHeadLabel}>Total Number of Vertical Cases</span>
                            </div>
                            <div style={styles.tableBody}>
                                {verticalCases.length === 0 ? (
                                    <div style={styles.emptyState}>No vertical data yet</div>
                                ) : (
                                    verticalCases.map((v) => (
                                        <div key={v.name} style={styles.tableRow}>
                                            <span>{v.name}</span>
                                            <span>{v.count}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, today, total }: StatCardData) {
    return (
        <div style={styles.statCard}>
            <div style={styles.statHead}>{title}</div>
            <div style={styles.statBody}>
                <div style={styles.statLine}>
                    <span style={styles.statLabel}>Today</span>
                    <span style={styles.statNum}>{today}</span>
                </div>
                <div style={styles.statBar} />
                <div style={styles.statLine}>
                    <span style={styles.statLabel}>Total</span>
                    <span style={styles.statNum}>{total}</span>
                </div>
            </div>
        </div>
    );
}

// Simple inline line chart placeholder — swap for a real charting library (recharts, chart.js) once data is wired up
function BillableChart() {
    return (
        <svg viewBox="0 0 300 140" style={{ width: "100%", height: "100%" }}>
            <polyline
                points="0,130 60,125 120,128 180,90 240,40 300,20"
                fill="none"
                stroke="#e24b4a"
                strokeWidth="2"
            />
            <line x1="0" y1="135" x2="300" y2="135" stroke="#eee" strokeWidth="1" />
        </svg>
    );
}

const styles: Record<string, CSSProperties> = {
    // Desktop: sidebar + content side by side in one row
    root: {
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        minHeight: "100vh",
        width: "100%",
        background: "#ececec",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    // Mobile: stacked, sidebar becomes an overlay drawer (handled by sidebarDrawer below)
    rootMobile: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        background: "#ececec",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        position: "relative",
    },
    mobileTopbar: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 16px",
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        position: "sticky",
        top: 0,
        zIndex: 30,
    },
    hamburgerBtn: {
        border: "none",
        background: "transparent",
        fontSize: "20px",
        cursor: "pointer",
        padding: 4,
    },
    mobileTitle: { fontSize: "15px", fontWeight: 700, color: "#1a1a2e" },
    overlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        zIndex: 40,
    },
    // Sidebar drawer: fixed/overlay on mobile only — on desktop the sidebar
    // renders inline as a normal flex child with a fixed width via flexShrink
    sidebarDrawer: {
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: "230px",
        maxWidth: "80vw",
        zIndex: 50,
        transition: "transform 0.25s ease",
        boxShadow: "2px 0 12px rgba(0,0,0,0.15)",
        overflowY: "auto",
    },
    // Content column sits beside the sidebar and takes the remaining width.
    // No padding here — the Header should sit flush at the top; padding lives in contentBody instead.
    contentCol: {
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
    },
    contentColMobile: {
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
    },
    contentBody: {
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        padding: "16px",
    },
    statsRow: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "12px",
    },
    statsRowMobile: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "10px",
    },
    statCard: {
        background: "#fff",
        borderRadius: "8px",
        overflow: "hidden",
    },
    statHead: {
        background: "#2b2b3d",
        color: "#fff",
        fontSize: "11px",
        fontWeight: 500,
        textAlign: "center",
        padding: "7px",
    },
    statBody: { padding: "10px 14px" },
    statLine: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "6px",
    },
    statLabel: { fontSize: "11px", color: "#185fa5", fontWeight: 500 },
    statNum: { fontSize: "20px", fontWeight: 700, color: "#1a1a2e" },
    statBar: { height: "3px", background: "#e24b4a", borderRadius: "2px", margin: "4px 0 8px" },

    contentRow: {
        display: "grid",
        gridTemplateColumns: "1.6fr 1fr",
        gap: "14px",
        flex: 1,
        minWidth: 0,
    },
    contentRowMobile: {
        display: "flex",
        flexDirection: "column",
        gap: "14px",
    },
    leftCol: { display: "flex", flexDirection: "column", gap: "14px", minWidth: 0 },
    panel: { background: "#fff", borderRadius: "8px", padding: "14px 16px", minHeight: 200 },
    panelTitle: {
        fontSize: "13px",
        fontWeight: 600,
        color: "#1a1a2e",
        textAlign: "center",
        margin: "0 0 8px",
    },
    chartPlaceholder: { height: 140 },
    emptyState: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#999",
        fontSize: "12px",
        padding: "24px",
        minHeight: 140,
    },

    rightCol: {
        background: "#fff",
        borderRadius: "8px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
    },
    tableHead: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 16px",
        borderBottom: "2px solid #e24b4a",
        background: "#f3f3f3",
        gap: "12px",
    },
    tableHeadLabel: { fontSize: "12px", fontWeight: 600, color: "#a32d2d" },
    tableBody: { flex: 1, display: "flex", flexDirection: "column" },
    tableRow: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 16px",
        borderBottom: "1px solid #f1f1f1",
        fontSize: "13px",
        color: "#374151",
    },
};
