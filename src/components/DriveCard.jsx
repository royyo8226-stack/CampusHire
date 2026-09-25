// src/components/DriveCard.jsx
// Card describing an upcoming campus placement drive.
import Avatar from './Avatar';
import { formatDate } from '../utils/helpers';

export default function DriveCard({ drive }) {
  return (
    <div className="drive-card">
      <div className="drive-head">
        <Avatar name={drive.company} color={drive.logoColor} size={46} square />
        <div>
          <h3>{drive.company} Placement Drive</h3>
          <p className="muted">{drive.role} · {drive.package}</p>
        </div>
      </div>

      <div className="drive-grid">
        <div><span className="lbl">Date</span>{formatDate(drive.date)}</div>
        <div><span className="lbl">Reporting Time</span>{drive.time}</div>
        <div><span className="lbl">Venue</span>{drive.venue}</div>
        <div><span className="lbl">Register By</span>{formatDate(drive.registrationDeadline)}</div>
      </div>

      <div className="drive-branches">
        <span className="lbl">Eligible Branches</span>
        <div className="chip-row">
          {drive.eligibleBranches.map((b) => (
            <span className="chip" key={b}>{b}</span>
          ))}
        </div>
      </div>

      <div className="drive-rounds">
        <span className="lbl">Selection Rounds</span>
        <ol>
          {drive.rounds.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
