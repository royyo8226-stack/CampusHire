// src/pages/JobDetails.jsx
// Full job description + eligibility + apply flow (opens ApplicationForm modal).
import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import Avatar from '../components/Avatar';
import Modal from '../components/Modal';
import ApplicationForm from '../components/ApplicationForm';
import EmptyState from '../components/EmptyState';
import { usePlacement } from '../context/PlacementContext';
import { formatDate } from '../utils/helpers';

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { jobs, companies, checkEligibility, hasApplied, applyToJob, profile } = usePlacement();

  const job = jobs.find((j) => j.id === id);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // If we arrived via an "Apply" button, open the modal automatically (when eligible).
  useEffect(() => {
    if (location.state?.apply && job && checkEligibility(job).eligible && !hasApplied(job.id)) {
      setModalOpen(true);
    }
  }, [location.state, job, checkEligibility, hasApplied]);

  if (!job) {
    return (
      <EmptyState
        icon="❓"
        title="Job not found"
        message="This opportunity may have been removed."
      />
    );
  }

  const company = companies.find((c) => c.id === job.companyId);
  const { eligible, reasons } = checkEligibility(job);
  const applied = hasApplied(job.id);

  const handleSubmit = () => {
    const res = applyToJob(job);
    setModalOpen(false);
    if (res.ok) setSubmitted(true);
    else alert(res.message);
  };

  return (
    <div className="job-details">
      <button className="back-link" onClick={() => navigate(-1)}>← Back</button>

      {submitted && (
        <div className="alert alert-success">
          ✅ Application submitted successfully! Track it in{' '}
          <Link to="/applications">My Applications</Link>.
        </div>
      )}

      <div className="detail-header">
        <Avatar name={job.company} color={company?.logoColor} size={64} square />
        <div className="detail-title">
          <h1>{job.role}</h1>
          <p className="muted">
            <Link to={`/companies/${job.companyId}`}>{job.company}</Link> · {job.location} · {job.type}
          </p>
          <div className="detail-tags">
            <span className="tag tag-green">{job.package}</span>
            <span className="tag tag-gray">{job.openings} openings</span>
            <span className={`elig-pill ${eligible ? 'elig-yes' : 'elig-no'}`}>
              {eligible ? '✓ You are eligible' : '✕ You are not eligible'}
            </span>
          </div>
        </div>
        <div className="detail-cta">
          <button
            className="btn btn-primary"
            disabled={applied || !eligible}
            onClick={() => setModalOpen(true)}
          >
            {applied ? 'Already Applied' : 'Apply Now'}
          </button>
        </div>
      </div>

      {!eligible && (
        <div className="alert alert-warning">
          You don’t meet all criteria for this role:
          <ul>
            {reasons.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="detail-grid">
        <div className="detail-main">
          <section className="panel">
            <h2>Job Description</h2>
            <p>{job.description}</p>
          </section>

          <section className="panel">
            <h2>Responsibilities</h2>
            <ul className="bullet-list">
              {job.responsibilities.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>

          <section className="panel">
            <h2>Required Skills</h2>
            <div className="chip-row">
              {job.skills.map((s) => (
                <span className="chip" key={s}>{s}</span>
              ))}
            </div>
          </section>

          <section className="panel">
            <h2>Selection Process</h2>
            <ol className="process-list">
              {job.selectionProcess.map((step, i) => (
                <li key={step}><span className="step-num">{i + 1}</span>{step}</li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="detail-side">
          <section className="panel">
            <h2>Eligibility Criteria</h2>
            <ul className="kv-list">
              <li><span>Minimum CGPA</span><strong>{job.minimumCGPA}</strong></li>
              <li><span>Eligible Branches</span><strong>{job.eligibleBranches.join(', ')}</strong></li>
              <li><span>Max Backlogs</span><strong>{job.maximumBacklogs}</strong></li>
              <li><span>Graduation Year</span><strong>{job.graduationYear}</strong></li>
            </ul>
            <div className="your-profile">
              <span className="lbl">Your profile</span>
              CGPA {profile.cgpa} · {profile.branch} · {profile.backlogs} backlogs
            </div>
          </section>

          <section className="panel">
            <h2>Important Dates</h2>
            <ul className="kv-list">
              {job.importantDates.map((d) => (
                <li key={d.label}><span>{d.label}</span><strong>{formatDate(d.date)}</strong></li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <Modal open={modalOpen} title="Job Application" onClose={() => setModalOpen(false)}>
        <ApplicationForm job={job} onSubmit={handleSubmit} onCancel={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
}
