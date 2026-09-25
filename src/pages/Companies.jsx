// src/pages/Companies.jsx
// Company directory with live search.
import { useMemo, useState } from 'react';
import CompanyCard from '../components/CompanyCard';
import SearchBar from '../components/SearchBar';
import EmptyState from '../components/EmptyState';
import { usePlacement } from '../context/PlacementContext';

export default function Companies() {
  const { companies } = usePlacement();
  const [term, setTerm] = useState('');

  const results = useMemo(() => {
    const q = term.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.roles.some((r) => r.toLowerCase().includes(q))
    );
  }, [companies, term]);

  return (
    <div className="companies-page">
      <div className="page-head">
        <div>
          <h1>Company Directory</h1>
          <p className="muted">{results.length} companies participating in placements</p>
        </div>
      </div>

      <SearchBar value={term} onChange={setTerm} placeholder="Search companies or roles..." />

      {results.length ? (
        <div className="grid-4">
          {results.map((c) => (
            <CompanyCard key={c.id} company={c} />
          ))}
        </div>
      ) : (
        <EmptyState icon="🏢" title="No companies found" message="Try a different search term." />
      )}
    </div>
  );
}
