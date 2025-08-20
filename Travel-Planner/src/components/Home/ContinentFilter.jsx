export default function ContinentFilter({ value, onChange }) {
  return (
    <div className="continent-filter">
      <label htmlFor="continent-select" style={{ marginRight: "8px" }}>
        Filter by Continent:
      </label>
      <select
        id="continent-select"
        value={value} // controlled by parent
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Africa">Africa</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Americas">Americas</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
}
