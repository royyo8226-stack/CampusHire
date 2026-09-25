// src/context/PlacementContext.jsx
// -----------------------------------------------------------------------------
// Central store for placement data: profile, applications and derived helpers.
// Seeds sample data into localStorage on first run and keeps it in sync.
// -----------------------------------------------------------------------------
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  jobs as allJobs,
  companies as allCompanies,
  drives as allDrives,
  notices as allNotices,
  defaultProfile,
  sampleApplications,
} from '../data/mockData';
import {
  getProfile,
  setProfile as persistProfile,
  getApplications,
  setApplications as persistApplications,
  isSeeded,
  markSeeded,
} from '../utils/storage';
import { checkEligibility, makeId } from '../utils/helpers';

const PlacementContext = createContext(null);

export function PlacementProvider({ children }) {
  const [profile, setProfileState] = useState(defaultProfile);
  const [applications, setApplicationsState] = useState([]);

  // Seed sample data the first time the app is ever opened, then load.
  useEffect(() => {
    if (!isSeeded()) {
      persistProfile(defaultProfile);
      persistApplications(sampleApplications);
      markSeeded();
    }
    setProfileState(getProfile() || defaultProfile);
    setApplicationsState(getApplications() || []);
  }, []);

  // Update the profile (used by the Profile page) and persist it.
  const updateProfile = (next) => {
    setProfileState(next);
    persistProfile(next);
  };

  // Whether the student has already applied to a given job.
  const hasApplied = (jobId) => applications.some((a) => a.jobId === jobId);

  // Submit a new application (prevents duplicates).
  const applyToJob = (job) => {
    if (hasApplied(job.id)) return { ok: false, message: 'You have already applied to this job.' };
    const application = {
      id: makeId('a'),
      jobId: job.id,
      company: job.company,
      role: job.role,
      appliedDate: new Date().toISOString().slice(0, 10),
      status: 'Applied',
    };
    const next = [application, ...applications];
    setApplicationsState(next);
    persistApplications(next);
    return { ok: true };
  };

  // Derived counts for dashboard stat cards.
  const stats = useMemo(() => {
    const eligibleCount = allJobs.filter((j) => checkEligibility(profile, j).eligible).length;
    const shortlisted = applications.filter((a) =>
      ['Shortlisted', 'Interview Scheduled', 'Selected'].includes(a.status)
    ).length;
    return {
      eligible: eligibleCount,
      applied: applications.length,
      shortlisted,
      upcomingDrives: allDrives.length,
    };
  }, [profile, applications]);

  const value = {
    // static datasets
    jobs: allJobs,
    companies: allCompanies,
    drives: allDrives,
    notices: allNotices,
    // dynamic state
    profile,
    applications,
    stats,
    // actions
    updateProfile,
    applyToJob,
    hasApplied,
    checkEligibility: (job) => checkEligibility(profile, job),
  };

  return <PlacementContext.Provider value={value}>{children}</PlacementContext.Provider>;
}

export function usePlacement() {
  const ctx = useContext(PlacementContext);
  if (!ctx) throw new Error('usePlacement must be used within a PlacementProvider');
  return ctx;
}
