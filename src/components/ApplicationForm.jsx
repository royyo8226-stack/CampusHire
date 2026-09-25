// src/components/ApplicationForm.jsx
// Controlled form used inside the Apply modal. Prefills from the student profile.
import { useState } from 'react';
import { usePlacement } from '../context/PlacementContext';

export default function ApplicationForm({ job, onSubmit, onCancel }) {
  const { profile } = usePlacement();

  // Prefill fields from the saved profile — student can still edit them.
  const [form, setForm] = useState({
    name: profile.name,
    enrollment: profile.enrollment,
    email: profile.email,
    phone: profile.phone,
    cgpa: profile.cgpa,
    branch: profile.branch,
    resume: profile.resume || '',
  });
  const [errors, setErrors] = useState({});

  const setField = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.enrollment.trim()) e.enrollment = 'Enrollment number is required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!/^[+\d][\d\s-]{7,}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (!form.cgpa || Number(form.cgpa) < 0 || Number(form.cgpa) > 10) e.cgpa = 'CGPA must be 0-10';
    if (!form.resume) e.resume = 'Please attach your resume';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (validate()) onSubmit(form);
  };

  return (
    <form className="app-form" onSubmit={handleSubmit} noValidate>
      <p className="app-form-lead">
        Applying for <strong>{job.role}</strong> at <strong>{job.company}</strong>
      </p>

      <div className="form-grid">
        <label>
          Full Name
          <input value={form.name} onChange={(e) => setField('name', e.target.value)} />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </label>
        <label>
          Enrollment Number
          <input value={form.enrollment} onChange={(e) => setField('enrollment', e.target.value)} />
          {errors.enrollment && <span className="field-error">{errors.enrollment}</span>}
        </label>
        <label>
          Email
          <input type="email" value={form.email} onChange={(e) => setField('email', e.target.value)} />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </label>
        <label>
          Phone
          <input value={form.phone} onChange={(e) => setField('phone', e.target.value)} />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </label>
        <label>
          CGPA
          <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={form.cgpa}
            onChange={(e) => setField('cgpa', e.target.value)}
          />
          {errors.cgpa && <span className="field-error">{errors.cgpa}</span>}
        </label>
        <label>
          Branch
          <input value={form.branch} onChange={(e) => setField('branch', e.target.value)} />
        </label>
      </div>

      <label className="file-label">
        Resume (PDF)
        {/* Resume upload is simulated — we only keep the file name. */}
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setField('resume', e.target.files[0]?.name || '')}
        />
        {form.resume && <span className="file-chosen">📎 {form.resume}</span>}
        {errors.resume && <span className="field-error">{errors.resume}</span>}
      </label>

      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">Submit Application</button>
      </div>
    </form>
  );
}
