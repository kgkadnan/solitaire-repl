import React from 'react';
import styles from './pagination.module.scss'; // Import your CSS module
import ChevronBack from '@public/assets/icons/chevron-back-circle-outline.svg?url';
import ChevronForward from '@public/assets/icons/chevron-forward-circle-outline.svg?url';
import { CustomSelect, ISelectData } from '../select';

interface ICustomPaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  resultsPerPage: number;
  limits: ISelectData[];
  handleResultsPerPageChange: (event: string) => void;
}

const CustomPagination: React.FC<ICustomPaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
  resultsPerPage,
  limits,
  handleResultsPerPageChange,
}) => {
  const pagesToShow = 3; // Number of pages to show in the range

  const handlePageClick = (page: number) => {
    if (page >= 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startPage = Math.max(0, currentPage - 1);
  const endPage = Math.min(startPage + pagesToShow, totalPages);

  const pageRange = Array.from(
    { length: endPage - startPage },
    (_, i) => startPage + i
  );

  let customSelectStyle = {
    selectTrigger: styles.selectTrigger,
    selectContent: styles.selectContent,
    selectElement: styles.selectElement,
  };

  return (
    <div
      className={`border-t border-solitaireSenary py-2 ${styles.paginationContainer}`}
    >
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
          Showing Results {currentPage + 1} of {totalPages}
        </p>
      </div>
      <div className={styles.paginationControls}>
        <div
          onClick={() => handlePageClick(currentPage - 1)}
          className={`${styles.paginationButton} ${
            currentPage === 0 ? styles.disabled : ''
          }`}
        >
          <ChevronBack
            style={{ stroke: currentPage === 0 ? '#354444' : '#CED2D2' }}
          />
        </div>

        <div className={styles.pageNumbers}>
          {startPage > 0 && (
            <>
              <span
                onClick={() => handlePageClick(0)} // Jump to the first page
                className={`${styles.pageNumber}`}
              >
                1
              </span>
              {startPage > 1 && (
                <span className={`${styles.pageNumber}`}>...</span>
              )}
            </>
          )}

          {pageRange.map((page) => (
            <span
              key={page}
              onClick={() => handlePageClick(page)}
              className={`${styles.pageNumber} ${
                currentPage === page ? styles.activePage : ''
              }`}
            >
              {page + 1}
            </span>
          ))}

          {endPage < totalPages - 1 && (
            <span className={`${styles.pageNumber}`}>...</span>
          )}
          {endPage < totalPages && (
            <span
              onClick={() => handlePageClick(totalPages - 1)} // Jump to the last page
              className={`${styles.pageNumber}`}
            >
              {totalPages}
            </span>
          )}
        </div>
        <div
          onClick={() => handlePageClick(currentPage + 1)}
          className={`${styles.paginationButton} ${
            currentPage === totalPages - 1 ? styles.disabled : ''
          }`}
        >
          <ChevronForward
            style={{
              stroke: currentPage === totalPages - 1 ? '#354444' : '#CED2D2',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomPagination;
