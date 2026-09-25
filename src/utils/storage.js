// src/utils/storage.js
// -----------------------------------------------------------------------------
// Thin, centralized wrappers around localStorage so components never touch
// localStorage keys directly. Keeps persistence logic in one place.
// -----------------------------------------------------------------------------

const KEYS = {
  auth: 'cph_auth',
  profile: 'cph_profile',
  applications: 'cph_applications',
  seeded: 'cph_seeded',
};

// Generic getters/setters with JSON handling + safe fallbacks
function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage may be unavailable (private mode) — fail silently */
  }
}

// --- Auth ---
export const getAuth = () => read(KEYS.auth, null);
export const setAuth = (auth) => write(KEYS.auth, auth);
export const clearAuth = () => localStorage.removeItem(KEYS.auth);

// --- Profile ---
export const getProfile = () => read(KEYS.profile, null);
export const setProfile = (profile) => write(KEYS.profile, profile);

// --- Applications ---
export const getApplications = () => read(KEYS.applications, []);
export const setApplications = (apps) => write(KEYS.applications, apps);

// --- First-run seeding flag ---
export const isSeeded = () => read(KEYS.seeded, false);
export const markSeeded = () => write(KEYS.seeded, true);

export { KEYS };
