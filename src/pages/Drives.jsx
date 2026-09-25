// src/pages/Drives.jsx
// Upcoming campus placement drives, sorted by date.
import DriveCard from '../components/DriveCard';
import { usePlacement } from '../context/PlacementContext';

export default function Drives() {
  const { drives } = usePlacement();
  const sorted = [...drives].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="drives-page">
      <div className="page-head">
        <div>
          <h1>Placement Drives</h1>
          <p className="muted">{sorted.length} upcoming drives on campus</p>
        </div>
      </div>
      <div className="grid-2">
        {sorted.map((d) => (
          <DriveCard key={d.id} drive={d} />
        ))}
      </div>
    </div>
  );
}
