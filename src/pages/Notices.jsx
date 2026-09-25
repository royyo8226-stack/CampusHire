// src/pages/Notices.jsx
// Announcements page with category filtering.
import { useMemo, useState } from 'react';
import NoticeCard from '../components/NoticeCard';
import EmptyState from '../components/EmptyState';
import { usePlacement } from '../context/PlacementContext';

const CATEGORIES = ['All', 'Placement Drive', 'Important', 'Interview', 'Registration', 'General'];

export default function Notices() {
  const { notices } = usePlacement();
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    const sorted = [...notices].sort((a, b) => b.date.localeCompare(a.date));
    return category === 'All' ? sorted : sorted.filter((n) => n.category === category);
  }, [notices, category]);

  return (
    <div className="notices-page">
      <div className="page-head">
        <div>
          <h1>Notices & Announcements</h1>
          <p className="muted">Stay updated with the latest placement news</p>
        </div>
      </div>

      <div className="tab-row">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`tab ${category === c ? 'tab-active' : ''}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length ? (
        <div className="card-list tight">
          {filtered.map((n) => (
            <NoticeCard key={n.id} notice={n} />
          ))}
        </div>
      ) : (
        <EmptyState icon="📢" title="No notices in this category" />
      )}
    </div>
  );
}
