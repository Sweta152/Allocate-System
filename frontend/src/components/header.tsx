import type { CSSProperties } from "react";

interface HeaderProps {
  userName?: string;
  logoSrc?: string;
  onRefresh?: () => void;
  onHelp?: () => void;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
}

export default function Header({
  userName,
  logoSrc,
  onRefresh,
  onHelp,
  onNotificationsClick,
  onProfileClick,
}: HeaderProps) {
  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <div style={styles.logo}>
          {logoSrc ? (
            <img src={logoSrc} alt="Company logo" style={styles.logoImg} />
          ) : (
            <span style={styles.logoFallback}>LOGO</span>
          )}
        </div>
        <span style={styles.welcome}>Welcome,{userName ? ` ${userName}` : ""}</span>
        <span style={styles.emoji} aria-hidden="true">
          🎉
        </span>
      </div>

      <div style={styles.right}>
        <button style={styles.iconBtn} aria-label="Help" onClick={onHelp}>
          <i className="ti ti-question-mark" style={{ fontSize: 15 }} aria-hidden="true" />
        </button>

        <button style={styles.bellBtn} aria-label="Notifications" onClick={onNotificationsClick}>
          <i className="ti ti-bell" style={{ fontSize: 18 }} aria-hidden="true" />
        </button>

        <button style={styles.avatarBtn} aria-label="User profile" onClick={onProfileClick} />

        <button style={styles.refreshBtn} onClick={onRefresh}>
          Refresh
        </button>
      </div>
    </header>
  );
}

const styles: Record<string, CSSProperties> = {
  header: {
    background: "#d9d9d9",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 18px",
    height: "64px",
    flexShrink: 0,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  left: { display: "flex", alignItems: "center", gap: "14px" },
  logo: {
    width: "48px",
    height: "48px",
    borderRadius: "6px",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flexShrink: 0,
  },
  logoImg: { width: "100%", height: "100%", objectFit: "contain" },
  logoFallback: { fontWeight: 700, color: "#1a1a2e", fontSize: "11px" },
  welcome: { fontSize: "15px", fontWeight: 700, color: "#1a1a2e" },
  emoji: { fontSize: "16px" },
  right: { display: "flex", alignItems: "center", gap: "16px" },
  iconBtn: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: "1.5px solid #a32d2d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#a32d2d",
    background: "transparent",
    cursor: "pointer",
  },
  bellBtn: {
    border: "none",
    background: "transparent",
    color: "#a32d2d",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: 0,
  },
  avatarBtn: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: "#e8e15a",
    border: "none",
    cursor: "pointer",
    padding: 0,
  },
  refreshBtn: {
    background: "#a32d2d",
    color: "#fff",
    border: "none",
    borderRadius: "3px",
    padding: "5px 12px",
    fontSize: "11px",
    fontWeight: 600,
    cursor: "pointer",
  },
};
