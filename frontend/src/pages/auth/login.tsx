import { useState } from "react";
import { GiRobotLeg } from "react-icons/gi";

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
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: username,
                    password,
                }),
            });

            const data = await res.json();

            console.log("LOGIN RESPONSE:", data);

            if (!res.ok || !data.success) {
                throw new Error(data.message || "Login failed");
            }

            localStorage.setItem(
                "accessToken",
                data.data.accessToken
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.data.user)
            );


            const userRole = data.data.user.role;

            if (userRole === "ADMIN") {
                window.location.href = "/dashboard";
            } else {
                window.location.href = "/report";
            }

        } catch (err: any) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div
            style={{
                minHeight: "100vh",
                fontFamily: "sans-serif",
                position: "relative",
                overflowX: "hidden",
            }}
        >

            {/* Background */}
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    zIndex: 0,
                    pointerEvents: "none",
                }}
            />


            {/* Overlay */}
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    background:
                        "linear-gradient(135deg, rgba(127,29,29,0.85), rgba(153,27,27,0.75), rgba(31,41,55,0.85))",
                    zIndex: 1,
                    pointerEvents: "none",
                }}
            />


            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    boxSizing: "border-box",
                }}
            >


                {/* ROLE SELECT */}
                {step === "select" && (
                    <div
                        style={{
                            background: "rgba(255,255,255,0.95)",
                            borderRadius: "20px",
                            padding: "40px 20px",
                            width: "100%",
                            maxWidth: "600px",
                            textAlign: "center",
                        }}
                    >

                        <h1
                            style={{
                                fontSize: "24px",
                                fontWeight: "700",
                                color: "#111",
                            }}
                        >
                            Daily Work Allocation Task
                        </h1>


                        <p
                            style={{
                                color: "#888",
                                marginBottom: "30px",
                            }}
                        >
                            Select your role to continue
                        </p>


                        <div
                            style={{
                                display: "flex",
                                gap: "20px",
                                justifyContent: "center",
                                flexWrap: "wrap",
                            }}
                        >

                            <div
                                onClick={() => {
                                    setRole("ADMIN");
                                    setStep("login");
                                }}
                                style={{
                                    cursor: "pointer",
                                    width: "220px",
                                    borderRadius: "16px",
                                    overflow: "hidden",
                                    border: "2px solid #ddd",
                                }}
                            >

                                <img
                                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400"
                                    style={{
                                        width: "100%",
                                        height: "160px",
                                        objectFit: "cover",
                                    }}
                                />

                                <div
                                    style={{
                                        background:"#be123c",
                                        color:"#fff",
                                        padding:"15px",
                                    }}
                                >
                                    Admin Login
                                </div>

                            </div>



                            <div
                                onClick={() => {
                                    setRole("EMPLOYEE");
                                    setStep("login");
                                }}
                                style={{
                                    cursor:"pointer",
                                    width:"220px",
                                    borderRadius:"16px",
                                    overflow:"hidden",
                                    border:"2px solid #ddd",
                                }}
                            >

                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400"
                                    style={{
                                        width:"100%",
                                        height:"160px",
                                        objectFit:"cover",
                                    }}
                                />

                                <div
                                    style={{
                                        background:"#be123c",
                                        color:"#fff",
                                        padding:"15px",
                                    }}
                                >
                                    Employee Login
                                </div>

                            </div>

                        </div>

                    </div>
                )}



                {/* LOGIN FORM */}
                {step === "login" && (
                    <div
                        style={{
                            background:"rgba(240,240,240,0.96)",
                            borderRadius:"20px",
                            padding:"40px 24px",
                            width:"100%",
                            maxWidth:"400px",
                            textAlign:"center",
                        }}
                    >

                        <div
                            style={{
                                fontSize:"40px",
                            }}
                        >
                            {role === "ADMIN" ? "👨‍💼" : "👩‍💻"}
                        </div>


                        <h2>
                            {role === "ADMIN"
                                ? "Admin Login"
                                : "Employee Login"}
                        </h2>


                        {error && (
                            <p style={{color:"red"}}>
                                {error}
                            </p>
                        )}


                        <form onSubmit={handleLogin}>

                                                   <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                style={{
                                    width: "100%",
                                    padding: "14px 16px",
                                    border: "2px solid #e5e7eb",
                                    borderRadius: "10px",
                                    fontSize: "14px",
                                    marginBottom: "16px",
                                    boxSizing: "border-box",
                                    background: "#fff",
                                    color: "#111",
                                }}
                            />


                            <div
                                style={{
                                    position: "relative",
                                    marginBottom: "20px",
                                }}
                            >

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "14px 45px 14px 16px",
                                        border: "2px solid #e5e7eb",
                                        borderRadius: "10px",
                                        fontSize: "14px",
                                        boxSizing: "border-box",
                                        background:"#fff",
                                    }}
                                />


                                <span
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    style={{
                                        position:"absolute",
                                        right:"15px",
                                        top:"50%",
                                        transform:"translateY(-50%)",
                                        cursor:"pointer",
                                    }}
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </span>

                            </div>


                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width:"100%",
                                    padding:"14px",
                                    background: loading
                                        ? "#f43f6e"
                                        : "#be123c",
                                    color:"#fff",
                                    border:"none",
                                    borderRadius:"10px",
                                    fontSize:"16px",
                                    fontWeight:"600",
                                    cursor: loading
                                        ? "not-allowed"
                                        : "pointer",
                                }}
                            >
                                {loading
                                    ? "Logging in..."
                                    : "Login"}
                            </button>

                        </form>


                        <button
                            onClick={() => {
                                setStep("select");
                                setError("");
                            }}
                            style={{
                                marginTop:"20px",
                                background:"none",
                                border:"none",
                                color:"#6b7280",
                                cursor:"pointer",
                                textDecoration:"underline",
                            }}
                        >
                           
                        </button>

                    </div>
                )}

            </div>


            <style>{`

                @keyframes fadeIn {
                    from {
                        opacity:0;
                        transform:translateY(20px);
                    }
                    to {
                        opacity:1;
                        transform:translateY(0);
                    }
                }


                @keyframes slideIn {
                    from {
                        opacity:0;
                        transform:translateX(30px);
                    }
                    to {
                        opacity:1;
                        transform:translateX(0);
                    }
                }


                @media(max-width:520px){

                    input,
                    button {
                        font-size:14px;
                    }

                }

            `}</style>

        </div>
    );
};


export default Login;     