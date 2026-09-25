// src/pages/Jobs.jsx
// Browse, search and filter placement opportunities. All filtering is client-side.
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import EmptyState from '../components/EmptyState';
import { usePlacement } from '../context/PlacementContext';
import { branches, jobTypes, locations } from '../data/mockData';

const SALARY_OPTIONS = [
  { value: 'All', label: 'Any package' },
  { value: '5', label: '₹5 LPA+' },
  { value: '10', label: '₹10 LPA+' },
  { value: '15', label: '₹15 LPA+' },
  { value: '20', label: '₹20 LPA+' },
];

const toOptions = (arr, allLabel) => [
  { value: 'All', label: allLabel },
  ...arr.map((v) => ({ value: v, label: v })),
];

export default function Jobs() {
  const { jobs, applications, checkEligibility } = usePlacement();
  const [params] = useSearchParams();
  const [term, setTerm] = useState(params.get('q') || '');
  const [values, setValues] = useState({
    branch: 'All',
    location: 'All',
    salary: 'All',
    type: 'All',
    status: 'All',
  });

  const appliedIds = useMemo(() => new Set(applications.map((a) => a.jobId)), [applications]);

  const onChange = (key, val) => setValues((v) => ({ ...v, [key]: val }));
  const onReset = () =>
    setValues({ branch: 'All', location: 'All', salary: 'All', type: 'All', status: 'All' });

  const filters = [
    { key: 'branch', label: 'Branch', options: toOptions(branches, 'All branches') },
    { key: 'location', label: 'Location', options: toOptions(locations, 'All locations') },
    { key: 'salary', label: 'Package', options: SALARY_OPTIONS },
    { key: 'type', label: 'Job Type', options: toOptions(jobTypes, 'All types') },
    {
      key: 'status',
      label: 'Application',
      options: [
        { value: 'All', label: 'All' },
        { value: 'applied', label: 'Applied' },
        { value: 'not-applied', label: 'Not applied' },
        { value: 'eligible', label: 'Eligible only' },
      ],
    },
  ];

  // Derive the visible list from term + filters (recomputed on each render via useMemo).
  const results = useMemo(() => {
    const q = term.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesSearch =
        !q ||
        job.company.toLowerCase().includes(q) ||
        job.role.toLowerCase().includes(q) ||
        job.skills.some((s) => s.toLowerCase().includes(q));

      const matchesBranch = values.branch === 'All' || job.eligibleBranches.includes(values.branch);
      const matchesLocation = values.location === 'All' || job.location === values.location;
      const matchesType = values.type === 'All' || job.type === values.type;
      const matchesSalary = values.salary === 'All' || job.packageValue >= Number(values.salary);

      let matchesStatus = true;
      if (values.status === 'applied') matchesStatus = appliedIds.has(job.id);
      else if (values.status === 'not-applied') matchesStatus = !appliedIds.has(job.id);
      else if (values.status === 'eligible') matchesStatus = checkEligibility(job).eligible;

      return (
        matchesSearch &&
        matchesBranch &&
        matchesLocation &&
        matchesType &&
        matchesSalary &&
        matchesStatus
      );
    });
  }, [jobs, term, values, appliedIds, checkEligibility]);

  return (
    <div className="jobs-page">
      <div className="page-head">
        <div>
          <h1>Job Opportunities</h1>
          <p className="muted">{results.length} of {jobs.length} opportunities shown</p>
        </div>
      </div>

      <SearchBar value={term} onChange={setTerm} placeholder="Search by company, role or skill..." />
      <FilterBar filters={filters} values={values} onChange={onChange} onReset={onReset} />

      {results.length ? (
        <div className="card-list">
          {results.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="🔍"
          title="No matching opportunities"
          message="Try adjusting your search or resetting the filters."
        />
      )}
    </div>
  );
}
