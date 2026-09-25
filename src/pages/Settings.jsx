// src/pages/Settings.jsx
// Simple settings page with local UI preferences and account actions.
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { user, logout } = useAuth();
  const [prefs, setPrefs] = useState({
    emailAlerts: true,
    driveReminders: true,
    shortlistAlerts: true,
  });

  const toggle = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="settings-page">
      <div className="page-head">
        <div>
          <h1>Settings</h1>
          <p className="muted">Manage your account and notification preferences</p>
        </div>
      </div>

      <section className="panel">
        <h2>Account</h2>
        <ul className="kv-list">
          <li><span>Student ID</span><strong>{user?.studentId}</strong></li>
          <li><span>Session</span><strong>Active</strong></li>
        </ul>
      </section>

      <section className="panel">
        <h2>Notifications</h2>
        <div className="toggle-list">
          {[
            ['emailAlerts', 'Email alerts for new opportunities'],
            ['driveReminders', 'Reminders before placement drives'],
            ['shortlistAlerts', 'Alerts when I am shortlisted'],
          ].map(([key, label]) => (
            <label className="toggle-row" key={key}>
              <span>{label}</span>
              <input type="checkbox" checked={prefs[key]} onChange={() => toggle(key)} />
            </label>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Danger Zone</h2>
        <p className="muted">Logging out will clear your current session on this device.</p>
        <button className="btn btn-danger" onClick={logout}>Logout</button>
      </section>
    </div>
  );
}
