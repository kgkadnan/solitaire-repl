import React from 'react';
import styles from './pagination.module.scss'; // Import your CSS module
import ChevronBack from '@public/assets/icons/chevron-back-circle-outline.svg?url';
import ChevronForward from '@public/assets/icons/chevron-forward-circle-outline.svg?url';
import { CustomSelect } from '../select';

interface ICustomPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  resultsPerPage?: any;
  setResultsPerPage?: any;
}

const CustomPagination: React.FC<ICustomPaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
  resultsPerPage,
  setResultsPerPage,
}) => {
  const pagesToShow = 3; // Number of pages to show in the range

  let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  let endPage = startPage + pagesToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - pagesToShow + 1);
  }

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleResultsPerPageChange = (event: any) => {
    const newResultsPerPage = parseInt(event, 10);
    setResultsPerPage(newResultsPerPage);
    setCurrentPage(1); // Reset current page when changing results per page
  };

  let limits = [
    { id: 1, value: '1' },
    { id: 2, value: '10' },
  ];

  let customSelectStyle = {
    selectTrigger: styles.selectTrigger,
    selectContent: styles.selectContent,
    selectElement: styles.selectElement,
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.resultsPerPage}>
        <CustomSelect
          data={limits}
          onChange={handleResultsPerPageChange}
          placeholder={resultsPerPage}
          style={customSelectStyle}
        />
      </div>
      <div className={styles.showResult}>
        <p>
          Showing Results {currentPage} of {totalPages}
        </p>
      </div>
      <div className={styles.paginationControls}>
        <div
          onClick={() => handlePageClick(currentPage - 1)}
          className={`${styles.paginationButton} ${
            currentPage === 1 ? styles.disabled : ''
          }`}
        >
          <ChevronBack
            style={{ stroke: currentPage === 1 ? '#354444' : '#CED2D2' }}
          />
        </div>
        <div className={styles.pageNumbers}>
          {startPage > 1 && (
            <>
              <span
                onClick={() => handlePageClick(1)}
                className={`${styles.pageNumber}`}
              >
                1
              </span>
              {startPage > 2 && (
                <span className={`${styles.pageNumber}`}>...</span>
              )}
            </>
          )}
          {Array.from(
            { length: endPage - startPage + 1 },
            (_, index) => startPage + index
          ).map((page) => (
            <span
              key={page}
              onClick={() => handlePageClick(page)}
              className={`${styles.pageNumber} ${
                currentPage === page ? styles.activePage : ''
              }`}
            >
              {page}
            </span>
          ))}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className={`${styles.pageNumber}`}>...</span>
              )}
              <span
                onClick={() => handlePageClick(totalPages)}
                className={`${styles.pageNumber}`}
              >
                {totalPages}
              </span>
            </>
          )}
        </div>
        <div
          onClick={() => handlePageClick(currentPage + 1)}
          className={`${styles.paginationButton} ${
            currentPage === totalPages ? styles.disabled : ''
          }`}
        >
          <ChevronForward
            style={{
              stroke: currentPage === totalPages ? '#354444' : '#CED2D2',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomPagination;
