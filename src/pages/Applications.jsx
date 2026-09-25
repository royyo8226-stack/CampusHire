// src/pages/Applications.jsx
// Lists all applications submitted by the student. Table on desktop, cards on mobile.
import { Link } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import { usePlacement } from '../context/PlacementContext';
import { formatDate } from '../utils/helpers';

export default function Applications() {
  const { applications } = usePlacement();

  if (!applications.length) {
    return (
      <div className="applications-page">
        <div className="page-head"><h1>My Applications</h1></div>
        <EmptyState
          icon="📝"
          title="No applications yet"
          message="Browse opportunities and apply to see them tracked here."
        />
        <Link to="/jobs" className="btn btn-primary">Browse Jobs</Link>
      </div>
    );
  }

  return (
    <div className="applications-page">
      <div className="page-head">
        <div>
          <h1>My Applications</h1>
          <p className="muted">{applications.length} applications submitted</p>
        </div>
      </div>

      {/* Desktop table */}
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {applications.map((a) => (
              <tr key={a.id}>
                <td data-label="Company"><strong>{a.company}</strong></td>
                <td data-label="Role">{a.role}</td>
                <td data-label="Applied">{formatDate(a.appliedDate)}</td>
                <td data-label="Status"><StatusBadge status={a.status} /></td>
                <td data-label="">
                  <Link to={`/jobs/${a.jobId}`} className="link-btn">View job</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="app-cards">
        {applications.map((a) => (
          <div className="app-card" key={a.id}>
            <div className="app-card-top">
              <strong>{a.company}</strong>
              <StatusBadge status={a.status} />
            </div>
            <p className="muted">{a.role}</p>
            <div className="app-card-foot">
              <span>Applied {formatDate(a.appliedDate)}</span>
              <Link to={`/jobs/${a.jobId}`} className="link-btn">View job</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
