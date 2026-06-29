type HeaderProps = {
  title?: string;
};

const Header = ({ title = "Dashboard" }: HeaderProps) => {
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });

  return (
    <header style={{
      background: "#ffffff",
      padding: "16px 24px",
      borderBottom: "1px solid #e2e8f0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
      <div>
        <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "600", color: "#1e293b" }}>
          {title}
        </h2>
        <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>
          {today}
        </p>
      </div>

      {user && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: 0, fontSize: "14px", fontWeight: "500", color: "#1e293b" }}>
              {user.firstName} {user.lastName}
            </p>
            <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>
              {user.department || user.role}
            </p>
          </div>
          <div style={{
            width: "36px",
            height: "36px",
            background: "#3b82f6",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: "600",
            fontSize: "14px",
          }}>
            {user.firstName?.[0]}{user.lastName?.[0]}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;