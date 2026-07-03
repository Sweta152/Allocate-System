import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/login";
import ReportDashboard from "./pages/admin/reportdashboard";
import Dashboard from "./pages/admin/dashboard";
import Header from "./components/header";

const PrivateRoute = ({ children, requiredRole = null }) => {
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!token) return <Navigate to="/login" replace />;
  if (requiredRole && user?.role !== requiredRole) return <Navigate to="/report" replace />;
  return children;
};

const AppLayout = ({ children, onLogout }) => {
  const handleRefresh = () => window.location.reload();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header
        onRefresh={handleRefresh}
        userName={user?.name || user?.email || ""}
        onLogout={onLogout}
      />
      <div style={{ flex: 1, display: "flex" }}>
        {children}
      </div>
    </div>
  );
};

function App() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/reportdashboard"
          element={
            <PrivateRoute>
              <AppLayout onLogout={handleLogout}>
                <ReportDashboard user={user} onLogout={handleLogout} />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/report"
          element={
            <PrivateRoute>
              <AppLayout onLogout={handleLogout}>
                <ReportDashboard user={user} onLogout={handleLogout} />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <AppLayout onLogout={handleLogout}>
                <Dashboard user={user} onLogout={handleLogout} />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;