// src/components/StatCard.jsx
// Summary card used on the dashboard.
export default function StatCard({ label, value, icon, accent = '#1e40af' }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: `${accent}1a`, color: accent }}>
        <span aria-hidden="true">{icon}</span>
      </div>
      <div className="stat-body">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}
