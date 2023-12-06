import React, { useEffect, useState } from 'react';
import CustomPagination from '.';

const CustomPaginationExample = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [resultsPerPage, setResultsPerPage] = useState(10); // You can set the initial value here
  const [numberOfPages, setNumberOfPages] = useState(0);

  //setNumberOfPages this using api call

  useEffect(() => {
    setNumberOfPages(10);
  }, []);

  const handleResultsPerPageChange = (event: any) => {
    const newResultsPerPage = parseInt(event, 10);
    setResultsPerPage(newResultsPerPage);
    setCurrentPage(0); // Reset current page when changing results per page
  };

  const handlePageClick = (page: number) => {
    if (page >= 0 && page <= numberOfPages) {
      setCurrentPage(page);
    }
  };

  let optionLimits = [
    { id: 1, value: '1' },
    { id: 2, value: '10' }
  ];
  return (
    <CustomPagination
      optionLimits={optionLimits}
      currentPage={currentPage}
      totalPages={numberOfPages}
      resultsPerPage={resultsPerPage}
      handlePageClick={handlePageClick}
      handleResultsPerPageChange={handleResultsPerPageChange}
    />
  );
};

export default CustomPaginationExample;
