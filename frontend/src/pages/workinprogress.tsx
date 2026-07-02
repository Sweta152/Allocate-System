export default function WorkInProgress() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "#f3f4f6",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }}>
      <div style={{ fontSize: 64 }}>🚧</div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1a1a2e", margin: "16px 0 8px" }}>
        Work In Progress
      </h2>
      <p style={{ fontSize: 14, color: "#6b7280" }}>
        This section is under development. Check back soon!
      </p>
    </div>
  );
}