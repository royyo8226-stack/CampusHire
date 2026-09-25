// src/utils/helpers.js
// -----------------------------------------------------------------------------
// Pure helper functions: eligibility logic, date formatting, avatars.
// Written as plain JS so the logic is easy to read and reuse.
// -----------------------------------------------------------------------------

// Determine whether a student profile satisfies a job's eligibility criteria.
// Returns { eligible: boolean, reasons: string[] } so callers can show details.
export function checkEligibility(profile, job) {
  const reasons = [];
  if (!profile || !job) return { eligible: false, reasons: ['Missing data'] };

  if (Number(profile.cgpa) < Number(job.minimumCGPA)) {
    reasons.push(`CGPA ${profile.cgpa} is below required ${job.minimumCGPA}`);
  }
  if (!job.eligibleBranches.includes(profile.branch)) {
    reasons.push(`Branch ${profile.branch} is not eligible`);
  }
  if (Number(profile.backlogs) > Number(job.maximumBacklogs)) {
    reasons.push(`Backlogs ${profile.backlogs} exceed allowed ${job.maximumBacklogs}`);
  }
  if (Number(profile.graduationYear) !== Number(job.graduationYear)) {
    reasons.push(`Graduation year must be ${job.graduationYear}`);
  }

  return { eligible: reasons.length === 0, reasons };
}

// Simple boolean version for quick checks (used on cards).
export const isEligible = (profile, job) => checkEligibility(profile, job).eligible;

// Format an ISO date (YYYY-MM-DD) into a friendly readable form.
export function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// Short date form: "25 Aug"
export function formatShortDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

// Build initials for an avatar from a company or person name.
export function getInitials(name = '') {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Deterministic color from a string (fallback avatar background).
export function colorFromString(str = '') {
  const palette = ['#1e40af', '#0369a1', '#7c3aed', '#be123c', '#047857', '#b45309'];
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return palette[Math.abs(hash) % palette.length];
}

// Generate a reasonably unique id for new records.
export const makeId = (prefix = 'id') =>
  `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
