import React, { useState } from 'react';

const SimplePagination = ({ onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    onPageChange(newPage);
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    handlePageChange(nextPage);
  };

  const handlePrevPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      handlePageChange(prevPage);
    }
  };

  return (
    <div className="flex justify-center space-x-2 mt-4">
      <button
        onClick={handlePrevPage}
        className={`px-4 py-2 rounded border text-white ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-amber-300 hover:text-black'
        }`}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <button
        onClick={handleNextPage}
        className="px-4 py-2 rounded border text-white hover:bg-amber-300 hover:text-black"
      >
        Next
      </button>
    </div>
  );
};

export default SimplePagination;
