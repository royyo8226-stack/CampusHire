// src/components/StatusBadge.jsx
// Colored badge that reflects an application status.
const STATUS_CLASS = {
  Applied: 'badge badge-blue',
  'Under Review': 'badge badge-amber',
  Shortlisted: 'badge badge-violet',
  'Interview Scheduled': 'badge badge-cyan',
  Selected: 'badge badge-green',
  Rejected: 'badge badge-red',
};

export default function StatusBadge({ status }) {
  const className = STATUS_CLASS[status] || 'badge badge-gray';
  return <span className={className}>{status}</span>;
}
