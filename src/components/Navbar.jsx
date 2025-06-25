
import React from 'react';

const Navbar = ({ search, setSearch, onAddWidget }) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0 p-4 bg-white shadow-sm border-b">
      {/* Title */}
      <h1 className="text-base md:text-lg font-semibold text-gray-800">
        CNAPP Dashboard
      </h1>

      {/* Search + Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <input
          type="text"
          placeholder="Search widgets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-1.5 rounded bg-gray-100 border border-gray-300 text-sm w-full sm:w-[220px] focus:outline-none focus:border-blue-600"
        />
        <button
          onClick={onAddWidget}
          className="bg-white border px-3 py-1 rounded shadow-sm hover:border-blue-500 text-sm w-full sm:w-auto"
        >
          + Add Widget
        </button>
      </div>
    </div>
  );
};

export default Navbar;
