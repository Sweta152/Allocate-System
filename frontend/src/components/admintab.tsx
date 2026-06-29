import { useState } from "react";
import type { CSSProperties } from "react";

interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
  lastUpdate: string;
  modifiedBy: string;
}

interface AdminForm {
  name: string;
  email: string;
  role: string;
}

const initialAdmins: Admin[] = [
  { id: 1, name: "John Developer", email: "john@example.com", role: "Developer", lastUpdate: "14/01/2026 10:00", modifiedBy: "System" },
  { id: 2, name: "Sarah Manager", email: "sarah@example.com", role: "Manager", lastUpdate: "12/01/2026 14:22", modifiedBy: "Developer" },
  { id: 3, name: "Mike Admin", email: "mike@example.com", role: "Admin", lastUpdate: "10/01/2026 09:15", modifiedBy: "Developer" },
];

export default function AdminTab() {
  const [admins, setAdmins] = useState<Admin[]>(initialAdmins);
  const [search, setSearch] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<Admin | null>(null);
  const [form, setForm] = useState<AdminForm>({ name: "", email: "", role: "Developer" });

  const filtered = admins.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleNew = (): void => {
    setEditItem(null);
    setForm({ name: "", email: "", role: "Developer" });
    setShowModal(true);
  };

  const handleEdit = (item: Admin): void => {
    setEditItem(item);
    setForm({ name: item.name, email: item.email, role: item.role });
    setShowModal(true);
  };

  const handleDelete = (id: number): void => {
    if (window.confirm("Delete this admin?")) setAdmins((d) => d.filter((x) => x.id !== id));
  };

  const handleSave = (): void => {
    const now = new Date().toLocaleString("en-GB").replace(",", "");
    if (editItem) {
      setAdmins((d) =>
        d.map((x) => (x.id === editItem.id ? { ...x, ...form, lastUpdate: now } : x))
      );
    } else {
      setAdmins((d) => [
        ...d,
        { id: Date.now(), ...form, lastUpdate: now, modifiedBy: "Developer" },
      ]);
    }
    setShowModal(false);
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.toolbar}>
        <div style={styles.searchBox}>
          <span>🔍</span>
          <input
            style={styles.searchInput}
            placeholder="Search admins..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={styles.refreshBtn}>↻ Refresh</button>
          <button style={styles.newBtn} onClick={handleNew}>+ New</button>
        </div>
      </div>

      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thead}>
              {["Admin Name", "Admin Email", "Admin Role", "Last Update", "Modify by", "Actions"].map((h) => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={row.id} style={{ ...styles.tr, background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={styles.td}>{row.name}</td>
                <td style={styles.td}>{row.email}</td>
                <td style={styles.td}><span style={styles.roleBadge}>{row.role}</span></td>
                <td style={styles.td}>{row.lastUpdate}</td>
                <td style={styles.td}>{row.modifiedBy}</td>
                <td style={styles.td}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={styles.editBtn} onClick={() => handleEdit(row)}>✏ Edit</button>
                    <button style={styles.delBtn} onClick={() => handleDelete(row.id)}>🗑</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>{editItem ? "Edit Admin" : "New Admin"}</h3>
            {(
              [
                { label: "Full Name", key: "name" as const, type: "text", placeholder: "John Doe" },
                { label: "Email Address", key: "email" as const, type: "email", placeholder: "john@example.com" },
              ] as { label: string; key: keyof AdminForm; type: string; placeholder: string }[]
            ).map((f) => (
              <div key={f.key} style={styles.modalField}>
                <label style={styles.modalLabel}>{f.label}</label>
                <input
                  style={styles.modalInput}
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={(e) => setForm((x) => ({ ...x, [f.key]: e.target.value }))}
                />
              </div>
            ))}
            <div style={styles.modalField}>
              <label style={styles.modalLabel}>Role</label>
              <select
                style={styles.modalInput}
                value={form.role}
                onChange={(e) => setForm((x) => ({ ...x, role: e.target.value }))}
              >
                {["Developer", "Manager", "Admin", "Viewer"].map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
              <button style={styles.cancelBtn} onClick={() => setShowModal(false)}>Cancel</button>
              <button style={styles.saveBtn} onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrap: { display: "flex", flexDirection: "column", gap: 16 },
  toolbar: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 },
  searchBox: { display: "flex", alignItems: "center", gap: 8, background: "#f3f4f6", borderRadius: 8, padding: "8px 14px", flex: 1, maxWidth: 320 },
  searchInput: { border: "none", background: "transparent", outline: "none", fontSize: 14, color: "#111", width: "100%" },
  refreshBtn: { padding: "8px 16px", borderRadius: 6, border: "1.5px solid #d1d5db", background: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#374151" },
  newBtn: { padding: "8px 16px", borderRadius: 6, border: "none", background: "linear-gradient(135deg, #e53935, #c62828)", color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 700 },
  tableWrap: { borderRadius: 10, overflow: "hidden", border: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
  table: { width: "100%", borderCollapse: "collapse" },
  thead: { background: "#f9fafb" },
  th: { padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #e5e7eb" },
  tr: { borderBottom: "1px solid #f3f4f6" },
  td: { padding: "11px 16px", fontSize: 13, color: "#374151" },
  roleBadge: { background: "#eff6ff", color: "#1d4ed8", borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 600 },
  editBtn: { padding: "5px 12px", borderRadius: 5, border: "none", background: "#e53935", color: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600 },
  delBtn: { padding: "5px 9px", borderRadius: 5, border: "1px solid #e5e7eb", background: "#fff", cursor: "pointer", fontSize: 13 },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 },
  modal: { background: "#fff", borderRadius: 12, padding: "32px", width: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.25)" },
  modalTitle: { margin: "0 0 24px", fontSize: 18, fontWeight: 700, color: "#1a1a2e" },
  modalField: { display: "flex", flexDirection: "column", gap: 6, marginBottom: 18 },
  modalLabel: { fontSize: 13, fontWeight: 600, color: "#374151" },
  modalInput: { padding: "10px 14px", borderRadius: 8, border: "1.5px solid #e5e7eb", fontSize: 14, outline: "none", color: "#111" },
  cancelBtn: { padding: "9px 20px", borderRadius: 7, border: "1.5px solid #d1d5db", background: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600 },
  saveBtn: { padding: "9px 24px", borderRadius: 7, border: "none", background: "linear-gradient(135deg, #e53935, #c62828)", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700 },
};
