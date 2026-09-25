// src/components/Navbar.jsx
// Top navbar: hamburger (mobile), global search, notifications, profile dropdown.
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from './Avatar';
import { useAuth } from '../context/AuthContext';
import { usePlacement } from '../context/PlacementContext';

export default function Navbar({ onToggleSidebar }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { profile, notices } = usePlacement();
  const [term, setTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdowns when clicking outside them.
  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/jobs?q=${encodeURIComponent(term)}`);
  };

  return (
    <header className="navbar">
      <button className="hamburger" onClick={onToggleSidebar} aria-label="Toggle menu">☰</button>

      <form className="navbar-search" onSubmit={submitSearch}>
        <span aria-hidden="true">🔍</span>
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search jobs, companies, roles..."
          aria-label="Global search"
        />
      </form>

      <div className="navbar-right" ref={menuRef}>
        <button
          className="icon-btn"
          onClick={() => { setNotifOpen((o) => !o); setMenuOpen(false); }}
          aria-label="Notifications"
        >
          🔔<span className="notif-dot" />
        </button>

        {notifOpen && (
          <div className="dropdown notif-dropdown">
            <div className="dropdown-head">Notifications</div>
            {notices.slice(0, 4).map((n) => (
              <button
                key={n.id}
                className="dropdown-item notif-item"
                onClick={() => { setNotifOpen(false); navigate('/notices'); }}
              >
                <strong>{n.title}</strong>
                <span className="muted">{n.category}</span>
              </button>
            ))}
            <button className="dropdown-item view-all" onClick={() => { setNotifOpen(false); navigate('/notices'); }}>
              View all notices
            </button>
          </div>
        )}

        <button
          className="profile-trigger"
          onClick={() => { setMenuOpen((o) => !o); setNotifOpen(false); }}
        >
          <Avatar name={profile.name} size={36} />
          <span className="profile-name">{profile.name}</span>
          <span className="caret" aria-hidden="true">▾</span>
        </button>

        {menuOpen && (
          <div className="dropdown profile-dropdown">
            <button className="dropdown-item" onClick={() => { setMenuOpen(false); navigate('/profile'); }}>
              👤 My Profile
            </button>
            <button className="dropdown-item" onClick={() => { setMenuOpen(false); navigate('/settings'); }}>
              ⚙️ Settings
            </button>
            <button className="dropdown-item danger" onClick={logout}>🚪 Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}
