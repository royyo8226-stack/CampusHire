// src/components/Sidebar.jsx
// App sidebar navigation. Collapses into an off-canvas drawer on mobile.
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { to: '/jobs', label: 'Job Opportunities', icon: '💼' },
  { to: '/drives', label: 'Placement Drives', icon: '📅' },
  { to: '/companies', label: 'Companies', icon: '🏢' },
  { to: '/applications', label: 'My Applications', icon: '📝' },
  { to: '/notices', label: 'Notices', icon: '📢' },
  { to: '/profile', label: 'Profile', icon: '👤' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
];

export default function Sidebar({ open, onNavigate }) {
  const { logout } = useAuth();

  return (
    <>
      {/* Dark overlay behind the drawer on mobile */}
      {open && <div className="sidebar-backdrop" onClick={onNavigate} />}

      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-mark">CH</div>
          <div>
            <div className="brand-name">CampusHire</div>
            <div className="brand-sub">Placement Portal</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) => `nav-item ${isActive ? 'nav-active' : ''}`}
            >
              <span className="nav-icon" aria-hidden="true">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button className="nav-item nav-logout" onClick={logout}>
          <span className="nav-icon" aria-hidden="true">🚪</span>
          Logout
        </button>
      </aside>
    </>
  );
}
