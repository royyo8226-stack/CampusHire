// src/pages/CompanyDetails.jsx
// Company profile + the jobs it is offering.
import { useParams, useNavigate } from 'react-router-dom';
import Avatar from '../components/Avatar';
import JobCard from '../components/JobCard';
import EmptyState from '../components/EmptyState';
import { usePlacement } from '../context/PlacementContext';

export default function CompanyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { companies, jobs } = usePlacement();

  const company = companies.find((c) => c.id === id);
  if (!company) {
    return <EmptyState icon="❓" title="Company not found" />;
  }

  const companyJobs = jobs.filter((j) => j.companyId === company.id);
  const totalOpenings = companyJobs.reduce((sum, j) => sum + j.openings, 0);

  return (
    <div className="company-details">
      <button className="back-link" onClick={() => navigate(-1)}>← Back</button>

      <div className="detail-header">
        <Avatar name={company.name} color={company.logoColor} size={64} square />
        <div className="detail-title">
          <h1>{company.name}</h1>
          <p className="muted">{company.industry} · {company.location}</p>
          <div className="detail-tags">
            <span className="tag tag-gray">🌐 {company.website}</span>
            <span className="tag tag-green">{totalOpenings} openings</span>
          </div>
        </div>
      </div>

      <section className="panel">
        <h2>About {company.name}</h2>
        <p>{company.about}</p>
      </section>

      <div className="section-head"><h2>Open Positions ({companyJobs.length})</h2></div>
      {companyJobs.length ? (
        <div className="card-list">
          {companyJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyState icon="💼" title="No open positions" message="Check back later for new roles." />
      )}
    </div>
  );
}
