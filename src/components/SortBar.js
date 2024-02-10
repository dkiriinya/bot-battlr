import React from 'react';

const SortBar = ({ onSortChange, sortOrder, sortCategory }) => {
  const categories = ['all','health', 'armor', 'damage'];

  return (
    <div className="mb-3">
      <label className="me-2" htmlFor="sortCategory">
        Sort by:
      </label>
      <select
        className="form-select me-2"
        id="sortCategory"
        onChange={(e) => onSortChange(e.target.value)}
        value={sortCategory}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
      <button
        className="btn btn-secondary"
        onClick={() => onSortChange(sortCategory)}
      >
        Toggle {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
      </button>
    </div>
  );
};

export default SortBar;
