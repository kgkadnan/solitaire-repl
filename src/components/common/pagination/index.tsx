import React from 'react';
import styles from './pagination.module.scss'; // Import your CSS module
import ChevronBack from '@public/assets/icons/chevron-back-circle-outline.svg?url';
import ChevronForward from '@public/assets/icons/chevron-forward-circle-outline.svg?url';
import { CustomSelect, ISelectData } from '../select';
import { ManageLocales } from '@/utils/translate';

interface ICustomPaginationProps {
  currentPage: number;
  totalPages: number;
  resultsPerPage: number;
  optionLimits: ISelectData[];
  handleResultsPerPageChange: (event: string) => void;
  handlePageClick?: any;
  paginationStyle?: any;
}

const CustomPagination: React.FC<ICustomPaginationProps> = ({
  currentPage,
  totalPages,
  resultsPerPage,
  optionLimits,
  handleResultsPerPageChange,
  handlePageClick,
  paginationStyle,
}) => {
  const pagesToShow = 3; // Number of pages to show in the range

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
      className={`${styles.paginationContainer} ${paginationStyle?.paginationContainerStyle}`}
    >
      <div className={styles.resultsPerPage}>
        <CustomSelect
          data={optionLimits}
          onChange={handleResultsPerPageChange}
          placeholder={resultsPerPage}
          style={customSelectStyle}
        />
      </div>
      <div className={styles.showResult}>
        <p>
          {ManageLocales('app.pagination.showingResults')} {currentPage + 1} of{' '}
          {totalPages}
        </p>
      </div>
      <div className={styles.paginationControls}>
        <div
          onClick={() => handlePageClick(currentPage - 1)}
          className={`${styles.paginationButton} ${
            currentPage === 0 ? styles.disabled : ''
          }`}
          data-testid="ChevronBack"
        >
          <ChevronBack
            style={{
              stroke:
                currentPage === 0
                  ? 'hsl(var(--solitaire-senary))'
                  : 'hsl(var(--solitaire-tertiary))',
            }}
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
          data-testid="ChevronForward"
        >
          <ChevronForward
            style={{
              stroke:
                currentPage === totalPages - 1
                  ? 'hsl(var(--solitaire-senary))'
                  : 'hsl(var(--solitaire-tertiary))',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomPagination;
