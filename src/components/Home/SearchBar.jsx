import { NavLink } from "react-router-dom";

export default function SearchBar({ onSearch, value }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Country:
        <input
          type="text"
          value={value}
          onChange={(e) => onSearch(e.target.value)}
        />
      </label>
    </form>
  );
}
