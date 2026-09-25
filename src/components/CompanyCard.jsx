// src/components/CompanyCard.jsx
// Card for the company directory.
import { useNavigate } from 'react-router-dom';
import Avatar from './Avatar';
import { usePlacement } from '../context/PlacementContext';

export default function CompanyCard({ company }) {
  const navigate = useNavigate();
  const { jobs } = usePlacement();
  const openings = jobs
    .filter((j) => j.companyId === company.id)
    .reduce((sum, j) => sum + j.openings, 0);

  return (
    <div className="company-card" onClick={() => navigate(`/companies/${company.id}`)}>
      <Avatar name={company.name} color={company.logoColor} size={54} square />
      <h3>{company.name}</h3>
      <p className="muted">{company.industry}</p>
      <div className="company-meta">
        <span>📍 {company.location}</span>
        <span>👥 {openings} openings</span>
      </div>
      <div className="chip-row">
        {company.roles.map((r) => (
          <span className="chip" key={r}>{r}</span>
        ))}
      </div>
    </div>
  );
}
