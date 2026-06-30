import { useState } from "react";

const Login = () => {
    const [step, setStep] = useState("select");
    const [role, setRole] = useState("EMPLOYEE");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
        const res = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: username, password }),
        });

        const data = await res.json();

        console.log("LOGIN RESPONSE:", data);

        if (!res.ok || !data.success) {
            throw new Error(data.message || "Login failed");
        }

        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.data.user));

        window.location.href = "/reportdashboard";

    } catch (err: any) {
        setError(err.message || "Login failed.");
    } finally {
        setLoading(false);
    }
};

    return (
        <div style={{
            minHeight: "100vh",
            fontFamily: "sans-serif",
            position: "relative",
            overflowX: "hidden",
        }}>

            {/* Background image with dark overlay */}
            <div style={{
                position: "fixed",
                inset: 0,
                backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: 0,
            }} />

            {/* Dark red overlay */}
            <div style={{
                position: "fixed",
                inset: 0,
                background: "linear-gradient(135deg, rgba(127,29,29,0.85) 0%, rgba(153,27,27,0.75) 40%, rgba(31,41,55,0.85) 100%)",
                zIndex: 1,
            }} />

            {/* Content Container */}
            <div style={{
                position: "relative",
                zIndex: 2,
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px", /* Prevents elements from touching screen edges on mobile */
                boxSizing: "border-box"
            }}>

                {/* STEP 1 — Role selection */}
                {step === "select" && (
                    <div className="card-container" style={{
                        background: "rgba(255,255,255,0.95)",
                        borderRadius: "20px",
                        padding: "40px 20px", /* Reduced padding for mobile utility */
                        textAlign: "center",
                        width: "100%",
                        maxWidth: "600px",
                        boxSizing: "border-box",
                        animation: "fadeIn 0.4s ease",
                    }}>
                        <h1 style={{
                            fontSize: "24px", /* Slightly smaller baseline for headers */
                            fontWeight: "700",
                            marginBottom: "8px",
                            color: "#111",
                        }}>
                            Daily work Allocation Task
                        </h1>
                        <p style={{ color: "#888", marginBottom: "36px", fontSize: "14px" }}>
                            Select your role to continue
                        </p>

                        <div className="role-cards-wrapper" style={{ 
                            display: "flex", 
                            gap: "20px", 
                            justifyContent: "center",
                            flexWrap: "wrap" /* Fallback wrapper */
                        }}>

                            {/* Admin card */}
                            <div
                                onClick={() => { setRole("ADMIN"); setStep("login"); }}
                                className="role-card"
                                style={{
                                    cursor: "pointer",
                                    borderRadius: "16px",
                                    overflow: "hidden",
                                    border: "2px solid #e5e7eb",
                                    width: "100%",
                                    maxWidth: "220px",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    boxSizing: "border-box"
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = "scale(1.06)";
                                    e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.25)";
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = "scale(1)";
                                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
                                }}
                            >
                                <div style={{ height: "180px", overflow: "hidden" }}>
                                    <img
                                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400"
                                        alt="Admin"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>
                                <div style={{
                                    background: "#be123c",
                                    padding: "14px",
                                    color: "#fff",
                                    fontWeight: "600",
                                    fontSize: "15px",
                                }}>
                                    Admin Login
                                </div>
                            </div>

                            {/* Employee card */}
                            <div
                                onClick={() => { setRole("EMPLOYEE"); setStep("login"); }}
                                className="role-card"
                                style={{
                                    cursor: "pointer",
                                    borderRadius: "16px",
                                    overflow: "hidden",
                                    border: "2px solid #e5e7eb",
                                    width: "100%",
                                    maxWidth: "220px",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    boxSizing: "border-box"
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = "scale(1.06)";
                                    e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.25)";
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = "scale(1)";
                                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
                                }}
                            >
                                <div style={{ height: "180px", overflow: "hidden" }}>
                                    <img
                                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400"
                                        alt="Employee"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>
                                <div style={{
                                    background: "#be123c",
                                    padding: "14px",
                                    color: "#fff",
                                    fontWeight: "600",
                                    fontSize: "15px",
                                }}>
                                    Employee Login
                                </div>
                            </div>

                        </div>
                    </div>
                )}

                {/* STEP 2 — Login form */}
                {step === "login" && (
                    <div style={{
                        background: "rgba(240,240,240,0.96)",
                        borderRadius: "20px",
                        padding: "40px 24px",
                        width: "100%",
                        maxWidth: "400px",
                        textAlign: "center",
                        boxSizing: "border-box",
                        animation: "slideIn 0.4s ease",
                    }}>

                        {/* Role icon */}
                        <div style={{
                            width: "70px",
                            height: "70px",
                            background: "#be123c",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "32px",
                            margin: "0 auto 16px",
                        }}>
                            {role === "ADMIN" ? "👨‍💼" : "👩‍💻"}
                        </div>

                        <h2 style={{
                            fontSize: "22px",
                            fontWeight: "700",
                            color: "#111",
                            marginBottom: "30px",
                        }}>
                            {role === "ADMIN" ? "Admin" : "Employee"} login
                        </h2> 

                        {error && (
                            <div style={{
                                background: "#fef2f2",
                                border: "1px solid #fecaca",
                                color: "#dc2626",
                                padding: "10px",
                                borderRadius: "8px",
                                fontSize: "13px",
                                marginBottom: "16px",
                            }}>
                                ⚠️ {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin}>
                            {/* Username */}
                            <input
                                type="text"
                                placeholder="User Name"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                                style={{
                                    width: "100%",
                                    padding: "14px 16px",
                                    border: "2px solid #e5e7eb",
                                    borderRadius: "10px",
                                    fontSize: "14px",
                                    marginBottom: "16px",
                                    outline: "none",
                                    boxSizing: "border-box",
                                    background: "#fff",
                                    color: "#b45309",
                                }}
                            />

                            {/* Password */}
                            <div style={{ position: "relative", marginBottom: "24px" }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "14px 46px 14px 16px",
                                        border: "2px solid #e5e7eb",
                                        borderRadius: "10px",
                                        fontSize: "14px",
                                        outline: "none",
                                        boxSizing: "border-box",
                                        background: "#fff",
                                    }}
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: "absolute",
                                        right: "14px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer",
                                        fontSize: "18px",
                                        color: "#6b21a8",
                                        userSelect: "none",
                                    }}
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </span>
                            </div>

                            {/* Login button */}
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: "100%",
                                    padding: "14px",
                                    background: loading ? "#f43f6e" : "#be123c",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "10px",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    cursor: loading ? "not-allowed" : "pointer",
                                    transition: "background 0.2s ease",
                                }}
                            >
                                {loading ? "Logging in..." : "Log in"}
                            </button>
                        </form>

                        {/* Back */}
                        <button
                            onClick={() => { setStep("select"); setError(""); }}
                            style={{
                                marginTop: "20px",
                                background: "none",
                                border: "none",
                                color: "#6b7280",
                                cursor: "pointer",
                                fontSize: "13px",
                                textDecoration: "underline",
                            }}
                        >
                            ← Back to role selection
                        </button>
                    </div>
                )}
            </div>

            {/* CSS animations & Mobile Responsiveness */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(30px); }
                    to { opacity: 1; transform: translateX(0); }
                }

                /* Mobile responsive tweaks */
                @media (max-width: 520px) {
                    .role-cards-wrapper {
                        flex-direction: column !important;
                        align-items: center;
                    }
                    .role-card {
                        max-width: 100% !important;
                        width: 100% !important;
                    }
                    .card-container {
                        padding: 30px 15px !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Login;