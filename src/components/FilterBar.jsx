// src/components/FilterBar.jsx
// A row of dropdown filters driven entirely by React state in the parent.
// `filters` describes each select; `values` and `onChange` connect to state.
export default function FilterBar({ filters, values, onChange, onReset }) {
  const hasActive = Object.values(values).some((v) => v && v !== 'All');
  return (
    <div className="filter-bar">
      {filters.map((f) => (
        <label className="filter-select" key={f.key}>
          <span className="filter-label">{f.label}</span>
          <select value={values[f.key]} onChange={(e) => onChange(f.key, e.target.value)}>
            {f.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      ))}
      {hasActive && (
        <button className="btn btn-ghost btn-sm" onClick={onReset}>
          Reset filters
        </button>
      )}
    </div>
  );
}
