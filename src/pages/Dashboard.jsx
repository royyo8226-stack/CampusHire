// src/pages/Dashboard.jsx
// Landing page after login: stat cards + curated sections.
import { Link, useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import JobCard from '../components/JobCard';
import CompanyCard from '../components/CompanyCard';
import NoticeCard from '../components/NoticeCard';
import DriveCard from '../components/DriveCard';
import StatusBadge from '../components/StatusBadge';
import { usePlacement } from '../context/PlacementContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { stats, jobs, companies, drives, notices, applications, profile, checkEligibility } =
    usePlacement();

  // Recommended = eligible jobs the student hasn't applied to yet.
  const recommended = jobs.filter((j) => checkEligibility(j).eligible).slice(0, 2);
  const upcoming = [...drives].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);
  const recentCompanies = companies.slice(0, 4);
  const latestNotices = notices.slice(0, 3);

  return (
    <div className="dashboard">
      <div className="page-head">
        <div>
          <h1>Welcome back, {profile.name.split(' ')[0]} 👋</h1>
          <p className="muted">Here’s what’s happening with campus placements today.</p>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard label="Eligible Jobs" value={stats.eligible} icon="✅" accent="#047857" />
        <StatCard label="Applications" value={stats.applied} icon="📝" accent="#1e40af" />
        <StatCard label="Shortlisted" value={stats.shortlisted} icon="⭐" accent="#7c3aed" />
        <StatCard label="Upcoming Drives" value={stats.upcomingDrives} icon="📅" accent="#b45309" />
      </div>

      <div className="dash-columns">
        <section className="dash-col-main">
          <div className="section-head">
            <h2>Recommended for you</h2>
            <Link to="/jobs" className="link-btn">View all jobs →</Link>
          </div>
          <div className="card-list">
            {recommended.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          <div className="section-head">
            <h2>Upcoming placement drives</h2>
            <Link to="/drives" className="link-btn">View all drives →</Link>
          </div>
          <div className="grid-2">
            {upcoming.map((d) => (
              <DriveCard key={d.id} drive={d} />
            ))}
          </div>
        </section>

        <aside className="dash-col-side">
          <div className="panel">
            <div className="section-head">
              <h2>Application status</h2>
              <Link to="/applications" className="link-btn">All →</Link>
            </div>
            <ul className="mini-list">
              {applications.slice(0, 4).map((a) => (
                <li key={a.id}>
                  <div>
                    <strong>{a.company}</strong>
                    <span className="muted">{a.role}</span>
                  </div>
                  <StatusBadge status={a.status} />
                </li>
              ))}
            </ul>
          </div>

          <div className="panel">
            <div className="section-head">
              <h2>Announcements</h2>
              <Link to="/notices" className="link-btn">All →</Link>
            </div>
            <div className="card-list tight">
              {latestNotices.map((n) => (
                <NoticeCard key={n.id} notice={n} />
              ))}
            </div>
          </div>
        </aside>
      </div>

      <section>
        <div className="section-head">
          <h2>Recently added companies</h2>
          <Link to="/companies" className="link-btn">View directory →</Link>
        </div>
        <div className="grid-4">
          {recentCompanies.map((c) => (
            <CompanyCard key={c.id} company={c} />
          ))}
        </div>
      </section>
    </div>
  );
}
