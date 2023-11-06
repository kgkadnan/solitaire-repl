import { ISelectData } from '../select';

export interface ICustomPaginationProps {
  currentPage: number;
  totalPages: number;
  resultsPerPage: number;
  optionLimits: ISelectData[];
  handleResultsPerPageChange: (event: string) => void;
  handlePageClick: (page: number) => void;
  paginationStyle?: { paginationContainerStyle: string };
}
