// FilterBar.js
import React from 'react';

const FilterBar = ({ onFilterChange, selectedFilter }) => {
  const botClasses = ["Support", "Medic", "Assault", "Defender", "Captain", "Witch"];

  return (
    <div className="mb-3">
      <label className="me-2" htmlFor="filterClass">
        Filter by Class:
      </label>
      <select
        className="form-select"
        id="filterClass"
        onChange={(e) => onFilterChange(e.target.value)}
        value={selectedFilter}
      >
        <option value="">All Classes</option>
        {botClasses.map((botClass) => (
          <option key={botClass} value={botClass}>
            {botClass}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
