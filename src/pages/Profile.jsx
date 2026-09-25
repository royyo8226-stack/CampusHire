// src/pages/Profile.jsx
// View and edit the student profile. Edits persist to localStorage via context.
import { useState } from 'react';
import Avatar from '../components/Avatar';
import { usePlacement } from '../context/PlacementContext';

export default function Profile() {
  const { profile, updateProfile } = usePlacement();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  const setField = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const startEdit = () => {
    setForm(profile);
    setEditing(true);
    setSaved(false);
  };

  const save = (e) => {
    e.preventDefault();
    // Skills come in as a comma string when edited — normalize to an array.
    const skills = Array.isArray(form.skills)
      ? form.skills
      : String(form.skills).split(',').map((s) => s.trim()).filter(Boolean);
    updateProfile({
      ...form,
      skills,
      cgpa: Number(form.cgpa),
      backlogs: Number(form.backlogs),
      graduationYear: Number(form.graduationYear),
    });
    setEditing(false);
    setSaved(true);
  };

  return (
    <div className="profile-page">
      <div className="page-head">
        <div>
          <h1>My Profile</h1>
          <p className="muted">Manage your placement profile and resume</p>
        </div>
        {!editing && (
          <button className="btn btn-primary" onClick={startEdit}>Edit Profile</button>
        )}
      </div>

      {saved && <div className="alert alert-success">✅ Profile updated successfully.</div>}

      <div className="profile-card">
        <div className="profile-banner">
          <Avatar name={profile.name} size={88} />
          <div>
            <h2>{profile.name}</h2>
            <p className="muted">{profile.course}</p>
            <p className="muted">{profile.enrollment} · {profile.semester}</p>
          </div>
        </div>

        {editing ? (
          <form className="form-grid profile-form" onSubmit={save}>
            <label>Full Name<input value={form.name} onChange={(e) => setField('name', e.target.value)} /></label>
            <label>Email<input value={form.email} onChange={(e) => setField('email', e.target.value)} /></label>
            <label>Phone<input value={form.phone} onChange={(e) => setField('phone', e.target.value)} /></label>
            <label>Branch<input value={form.branch} onChange={(e) => setField('branch', e.target.value)} /></label>
            <label>Course<input value={form.course} onChange={(e) => setField('course', e.target.value)} /></label>
            <label>Semester<input value={form.semester} onChange={(e) => setField('semester', e.target.value)} /></label>
            <label>CGPA<input type="number" step="0.1" min="0" max="10" value={form.cgpa} onChange={(e) => setField('cgpa', e.target.value)} /></label>
            <label>Backlogs<input type="number" min="0" value={form.backlogs} onChange={(e) => setField('backlogs', e.target.value)} /></label>
            <label>Graduation Year<input type="number" value={form.graduationYear} onChange={(e) => setField('graduationYear', e.target.value)} /></label>
            <label className="full">Skills (comma separated)
              <input
                value={Array.isArray(form.skills) ? form.skills.join(', ') : form.skills}
                onChange={(e) => setField('skills', e.target.value)}
              />
            </label>
            <label className="full">Resume file name
              <input value={form.resume} onChange={(e) => setField('resume', e.target.value)} />
            </label>
            <div className="form-actions full">
              <button type="button" className="btn btn-ghost" onClick={() => setEditing(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
          </form>
        ) : (
          <div className="profile-view">
            <div className="kv-grid">
              <div><span>Email</span><strong>{profile.email}</strong></div>
              <div><span>Phone</span><strong>{profile.phone}</strong></div>
              <div><span>Branch</span><strong>{profile.branch}</strong></div>
              <div><span>Course</span><strong>{profile.course}</strong></div>
              <div><span>Semester</span><strong>{profile.semester}</strong></div>
              <div><span>CGPA</span><strong>{profile.cgpa}</strong></div>
              <div><span>Backlogs</span><strong>{profile.backlogs}</strong></div>
              <div><span>Graduation Year</span><strong>{profile.graduationYear}</strong></div>
            </div>

            <div className="profile-section">
              <span className="lbl">Skills</span>
              <div className="chip-row">
                {profile.skills.map((s) => (
                  <span className="chip" key={s}>{s}</span>
                ))}
              </div>
            </div>

            <div className="profile-section">
              <span className="lbl">Resume</span>
              <div className="resume-row">
                <span>📄 {profile.resume || 'No resume uploaded'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
