import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";

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

export default function AddUser() {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        employeeId: "",
        designation: "",
        department: "",
        dob: "",
        doj: "",
        reportingManager: "",
        workedInTeams: "",
        password: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const generatePassword = () => {
        const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";

        let pass = "";

        for (let i = 0; i < 10; i++) {
            pass += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        setFormData({
            ...formData,
            password: pass,
        });
    };

    const copyPassword = () => {
        navigator.clipboard.writeText(formData.password);
        alert("Password copied!");
    };

    const handleRegister = async () => {
        // basic required-field check
        if (!formData.firstName || !formData.lastName || !formData.email) {
            setError("First name, last name and email are required.");
            return;
        }

        setError("");
        setIsSubmitting(true);

        try {
            // TODO: replace with your actual API base URL / endpoint
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/users/add-user`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (!response.ok) {
                const data = await response.json().catch(() => null);
                throw new Error(data?.message || "Failed to create user");
            }

            // Success — navigate to the employee list/screen
            // TODO: adjust the path below to match your actual route
            navigate("/employees");
        } catch (err: any) {
            setError(err?.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            style={isMobile ? styles.rootMobile : styles.root}
        >
            {/* Mobile hamburger topbar */}
            {isMobile && (
                <div style={styles.mobileTopbar}>
                    <button
                        style={styles.hamburgerBtn}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        type="button"
                    >
                        ☰
                    </button>
                    <span style={styles.mobileTitle}>Add New User</span>
                </div>
            )}

            {/* Sidebar */}
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
                        <Sidebar />
                    </div>
                </>
            ) : (
                <Sidebar />
            )}

            {/* Content */}
            <div style={isMobile ? styles.contentColMobile : styles.contentCol}>
                <div style={styles.contentBody}>
                    {!isMobile && (
                        <div style={styles.header}>
                            <h2 style={styles.heading}>Add New User</h2>
                        </div>
                    )}

                    <div style={isMobile ? styles.cardMobile : styles.card}>
                        <div style={isMobile ? styles.gridMobile : styles.grid}>
                            {/* Row 1 */}
                            <div>
                                <label style={styles.label}>Select User Name</label>
                                <select style={styles.input}>
                                    <option>Search User Name</option>
                                </select>
                            </div>

                            <div>
                                <label style={styles.label}>First Name</label>
                                <input
                                    style={styles.input}
                                    value={formData.firstName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, firstName: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <label style={styles.label}>Last Name</label>
                                <input
                                    style={styles.input}
                                    value={formData.lastName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, lastName: e.target.value })
                                    }
                                />
                            </div>

                            {/* Row 2 */}
                            <div>
                                <label style={styles.label}>Email</label>
                                <input
                                    type="email"
                                    style={styles.input}
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <label style={styles.label}>Employee ID</label>
                                <input
                                    style={styles.input}
                                    value={formData.employeeId}
                                    onChange={(e) =>
                                        setFormData({ ...formData, employeeId: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <label style={styles.label}>Designation</label>
                                <input
                                    style={styles.input}
                                    value={formData.designation}
                                    onChange={(e) =>
                                        setFormData({ ...formData, designation: e.target.value })
                                    }
                                />
                            </div>

                            {/* Row 3 */}
                            <div>
                                <label style={styles.label}>Department</label>
                                <select style={styles.input}>
                                    <option>Select Department</option>
                                </select>
                            </div>

                            <div>
                                <label style={styles.label}>Date of Birth</label>
                                <input
                                    type="date"
                                    style={styles.input}
                                    value={formData.dob}
                                    onChange={(e) =>
                                        setFormData({ ...formData, dob: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <label style={styles.label}>Date of Joining</label>
                                <input
                                    type="date"
                                    style={styles.input}
                                    value={formData.doj}
                                    onChange={(e) =>
                                        setFormData({ ...formData, doj: e.target.value })
                                    }
                                />
                            </div>

                            {/* Row 4 */}
                            <div>
                                <label style={styles.label}>Reporting Manager</label>
                                <select style={styles.input}>
                                    <option>Select Manager</option>
                                </select>

                                <p style={styles.note}>* Please enter Email only</p>
                            </div>

                            <div>
                                <label style={styles.label}>Password</label>
                                <input
                                    style={styles.input}
                                    value={formData.password}
                                    readOnly
                                />
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "end",
                                    gap: 10,
                                    flexWrap: "wrap",
                                }}
                            >
                                <button
                                    style={isMobile ? styles.smallButtonMobile : styles.smallButton}
                                    onClick={generatePassword}
                                    type="button"
                                >
                                    Generate
                                </button>

                                <button
                                    style={isMobile ? styles.smallButtonMobile : styles.smallButton}
                                    onClick={copyPassword}
                                    type="button"
                                >
                                    Copy
                                </button>
                            </div>

                            {/* Row 5 */}
                            <div>
                                <label style={styles.label}>Worked In Teams</label>
                                <select style={styles.input}>
                                    <option>Search User Name</option>
                                </select>
                            </div>
                        </div>

                        {error && <p style={styles.error}>{error}</p>}

                        <div style={isMobile ? styles.footerMobile : styles.footer}>
                            <button
                                style={{
                                    ...(isMobile ? styles.registerButtonMobile : styles.registerButton),
                                    opacity: isSubmitting ? 0.7 : 1,
                                    cursor: isSubmitting ? "not-allowed" : "pointer",
                                }}
                                onClick={handleRegister}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Saving..." : "Register"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, CSSProperties> = {
    root: {
        display: "flex",
        width: "100%",
        flex: 1,
        minHeight: 0,
        background: "#ececec",
        fontFamily: "'Segoe UI', sans-serif",
    },
    rootMobile: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
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
        borderBottom: "2px solid #d92f3b",
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
    mobileTitle: { fontSize: "16px", fontWeight: 700, color: "#1a1a2e" },
    overlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        zIndex: 40,
    },
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

    contentCol: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        minHeight: 0,
    },
    contentColMobile: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
    },
    contentBody: {
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        padding: "20px",
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
    },

    header: {
        background: "#fff",
        borderRadius: 10,
        borderBottom: "2px solid #d92f3b",
        textAlign: "center",
        padding: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
    },

    heading: {
        margin: 0,
        fontSize: 34,
        fontWeight: 700,
    },

    card: {
        background: "#fff",
        borderRadius: 10,
        padding: 30,
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
    },
    cardMobile: {
        background: "#fff",
        borderRadius: 8,
        padding: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "28px 40px",
    },
    gridMobile: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "16px",
    },

    label: {
        display: "block",
        marginBottom: 8,
        color: "#1c1975",
        fontSize: 16,
    },

    input: {
        width: "100%",
        padding: "12px",
        background: "#f5f5f5",
        border: "1px solid #ddd",
        outline: "none",
        fontSize: 15,
        borderRadius: 4,
        boxSizing: "border-box",
    },

    note: {
        color: "#d40000",
        marginTop: 8,
        fontWeight: 600,
    },

    error: {
        color: "#d40000",
        marginTop: 20,
        fontWeight: 600,
    },

    smallButton: {
        padding: "10px 18px",
        border: "1px solid #ccc",
        background: "#fff",
        cursor: "pointer",
        borderRadius: 4,
    },
    smallButtonMobile: {
        padding: "12px 16px",
        border: "1px solid #ccc",
        background: "#fff",
        cursor: "pointer",
        borderRadius: 4,
        flex: 1,
        fontSize: 15,
    },

    footer: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: 40,
    },
    footerMobile: {
        display: "flex",
        marginTop: 24,
    },

    registerButton: {
        background: "#df3740",
        color: "#fff",
        border: "none",
        borderRadius: 30,
        padding: "14px 80px",
        fontSize: 18,
        fontWeight: 700,
        cursor: "pointer",
    },
    registerButtonMobile: {
        background: "#df3740",
        color: "#fff",
        border: "none",
        borderRadius: 30,
        padding: "14px 0",
        fontSize: 16,
        fontWeight: 700,
        cursor: "pointer",
        width: "100%",
    },
};