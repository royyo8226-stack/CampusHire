// src/pages/Login.jsx
// Mock login screen. Demo credentials: student123 / 123456
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login({ studentId, password, remember });
    if (res.ok) navigate(from, { replace: true });
    else setError(res.message);
  };

  const fillDemo = () => {
    setStudentId('student123');
    setPassword('123456');
    setError('');
  };

  return (
    <div className="login-page">
      <div className="login-hero">
        <div className="login-hero-inner">
          <div className="brand-mark large">CH</div>
          <h1>CampusHire</h1>
          <p>The all-in-one campus placement portal — discover opportunities, track applications and land your dream role.</p>
          <ul className="hero-points">
            <li>Browse verified placement opportunities</li>
            <li>Automatic eligibility checking</li>
            <li>Track every application in one place</li>
          </ul>
        </div>
      </div>

      <div className="login-panel">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Student Login</h2>
          <p className="muted">Sign in to access your placement dashboard.</p>

          {error && <div className="alert alert-error">{error}</div>}

          <label>
            Student ID / Enrollment Number
            <input
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="e.g. student123"
              autoComplete="username"
            />
          </label>

          <label>
            Password
            <div className="password-field">
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button type="button" className="pwd-toggle" onClick={() => setShowPwd((s) => !s)}>
                {showPwd ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          <div className="login-row">
            <label className="checkbox">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              Remember me
            </label>
            <button type="button" className="link-btn" onClick={() => alert('Please contact the Training & Placement Cell to reset your password.')}>
              Forgot password?
            </button>
          </div>

          <button type="submit" className="btn btn-primary btn-block">Login</button>

          <div className="demo-hint">
            <span>Demo credentials — <strong>student123 / 123456</strong></span>
            <button type="button" className="link-btn" onClick={fillDemo}>Autofill</button>
          </div>
        </form>
      </div>
    </div>
  );
}
