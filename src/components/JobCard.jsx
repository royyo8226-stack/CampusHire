// src/components/JobCard.jsx
// Compact job/opportunity card with eligibility indicator and actions.
import { useNavigate } from 'react-router-dom';
import Avatar from './Avatar';
import { usePlacement } from '../context/PlacementContext';
import { formatDate } from '../utils/helpers';

export default function JobCard({ job }) {
  const navigate = useNavigate();
  const { checkEligibility, hasApplied, companies } = usePlacement();
  const { eligible } = checkEligibility(job);
  const applied = hasApplied(job.id);
  const company = companies.find((c) => c.id === job.companyId);

  return (
    <div className="job-card">
      <div className="job-card-head">
        <Avatar name={job.company} color={company?.logoColor} size={46} square />
        <div className="job-card-title">
          <h3>{job.role}</h3>
          <p className="muted">{job.company}</p>
        </div>
        <span className={`elig-pill ${eligible ? 'elig-yes' : 'elig-no'}`}>
          {eligible ? '✓ Eligible' : '✕ Not eligible'}
        </span>
      </div>

      <div className="job-meta">
        <span>💰 {job.package}</span>
        <span>📍 {job.location}</span>
        <span>💼 {job.type}</span>
        <span>🎓 CGPA ≥ {job.minimumCGPA}</span>
      </div>

      <div className="chip-row">
        {job.skills.slice(0, 4).map((s) => (
          <span className="chip" key={s}>{s}</span>
        ))}
      </div>

      <div className="job-card-foot">
        <div className="job-foot-info">
          <span className="branches">{job.eligibleBranches.join(', ')}</span>
          <span className="deadline">Deadline: {formatDate(job.deadline)}</span>
        </div>
        <div className="job-actions">
          <button className="btn btn-ghost" onClick={() => navigate(`/jobs/${job.id}`)}>
            View Details
          </button>
          <button
            className="btn btn-primary"
            disabled={applied}
            onClick={() => navigate(`/jobs/${job.id}`, { state: { apply: true } })}
          >
            {applied ? 'Applied' : 'Apply'}
          </button>
        </div>
      </div>
    </div>
  );
}
