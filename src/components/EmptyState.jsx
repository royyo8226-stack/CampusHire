// src/components/EmptyState.jsx
// Friendly placeholder shown when a list/table has no results.
export default function EmptyState({ icon = '📭', title = 'Nothing here yet', message = '' }) {
  return (
    <div className="empty-state">
      <div className="empty-icon" aria-hidden="true">{icon}</div>
      <h3>{title}</h3>
      {message && <p>{message}</p>}
    </div>
  );
}
