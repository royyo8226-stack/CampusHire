# CampusHire — Campus Placement Portal

A modern, responsive **Campus Placement Portal** built with **React.js + Vite**. Students can browse placement opportunities, check eligibility automatically, apply for jobs, track application status, view drives, explore the company directory, read notices, and manage their profile — all on the frontend with `localStorage` for mock persistence (no backend).

---

## 1. Installation & Setup

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# build for production
npm run build

# preview the production build
npm run preview
```

Then open the URL Vite prints (usually `http://localhost:5173`).

### Demo login
```
Student ID : student123
Password   : 123456
```
(The login screen has an **Autofill** button for convenience.)

---

## 2. Folder Structure

```
react01/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                 # entry: Router + context providers
    ├── App.jsx                  # route table (protected + public)
    ├── index.css                # full design system + responsive styles
    │
    ├── components/
    │   ├── Layout.jsx           # sidebar + navbar + <Outlet/>
    │   ├── Navbar.jsx           # search, notifications, profile dropdown
    │   ├── Sidebar.jsx          # nav links (drawer on mobile)
    │   ├── ProtectedRoute.jsx   # auth guard
    │   ├── StatCard.jsx
    │   ├── JobCard.jsx
    │   ├── CompanyCard.jsx
    │   ├── DriveCard.jsx
    │   ├── NoticeCard.jsx
    │   ├── StatusBadge.jsx
    │   ├── SearchBar.jsx
    │   ├── FilterBar.jsx
    │   ├── Modal.jsx
    │   ├── ApplicationForm.jsx
    │   ├── Avatar.jsx           # initials-based avatar (no image assets)
    │   └── EmptyState.jsx
    │
    ├── pages/
    │   ├── Login.jsx
    │   ├── Dashboard.jsx
    │   ├── Jobs.jsx
    │   ├── JobDetails.jsx
    │   ├── Applications.jsx
    │   ├── Drives.jsx
    │   ├── Companies.jsx
    │   ├── CompanyDetails.jsx
    │   ├── Notices.jsx
    │   ├── Profile.jsx
    │   └── Settings.jsx
    │
    ├── context/
    │   ├── AuthContext.jsx      # mock auth + session
    │   └── PlacementContext.jsx # data, applications, profile, stats
    │
    ├── data/
    │   └── mockData.js          # 10 companies, 15 jobs, 8 drives, 10 notices
    │
    └── utils/
        ├── helpers.js           # eligibility logic, date formatting, avatars
        └── storage.js           # centralized localStorage helpers
```

---

## 3. Major Features

- **Mock authentication** with session persistence and protected routes.
- **Dashboard** with summary stat cards and curated sections (recommended jobs, drives, application status, announcements, companies).
- **Job Opportunities** with live search (company / role / skill) and multi-filter (branch, location, package, job type, application status).
- **Job Details** page with full description, responsibilities, selection process, eligibility criteria and an **Apply** modal.
- **Automatic eligibility checking** based on CGPA, branch, backlogs and graduation year — shown on cards and the details page with the exact reasons when not eligible.
- **Application system** with a validated form, duplicate-apply prevention, and `localStorage` persistence.
- **My Applications** — responsive table (desktop) that becomes stacked cards (mobile), with colored status badges.
- **Placement Drives**, **Company Directory** (+ company detail pages), and **Notices** with category tabs.
- **Editable Student Profile** persisted to `localStorage`.
- **Fully responsive** layout: sidebar collapses to a hamburger drawer, grids stack, tables reflow to cards.

---

## 4. React Concepts Demonstrated

**React:** functional components, props, `useState`, `useEffect`, `useContext`, `useMemo`, `useRef`, conditional rendering, list rendering with `.map()`, controlled forms, event handling, reusable components.

**React Router DOM:** `Routes`/`Route`, nested/layout routes, dynamic routes (`/jobs/:id`, `/companies/:id`), `useNavigate`, `useParams`, `useLocation`, `useSearchParams`, `NavLink`, and protected routes.

**JavaScript (ES6+):** array methods (`filter`, `map`, `reduce`, `some`, `sort`), searching & filtering logic, conditional eligibility logic, object manipulation/spreads, and `localStorage`.

---

## 5. Main Application Flow

```
Login (student123 / 123456)
  → Dashboard (stats + highlights)
    → Job Opportunities
      → Search / Filter (live, no reload)
        → View Job Details
          → Eligibility auto-checked (✓ / ✕)
            → Apply Now (validated modal form)
              → "Application submitted successfully!"
                → My Applications
                  → Track status via badges
```

Auth state, the student profile, and all applications are stored in `localStorage`, so data survives page refreshes. Sample applications and a profile are seeded on first launch.

---

## 6. Future Improvements (with a backend)

- **Node.js + Express** REST API and **MongoDB** for real data storage.
- **JWT authentication** with hashed passwords and refresh tokens.
- **Admin dashboard**, **company login**, and a **placement officer dashboard**.
- **Real resume uploads** (file storage / S3) instead of simulated file names.
- **Email notifications** for shortlists, interviews and deadlines.
- **Real-time application status** updates (WebSockets).
- **Database-driven eligibility checking** and analytics/reporting.

---

*Built as a learning-friendly, portfolio-ready React project. Data is mocked and lives in `src/data/mockData.js`.*
