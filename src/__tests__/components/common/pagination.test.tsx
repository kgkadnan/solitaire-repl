import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CustomPagination from '@/components/common/pagination';

describe('Pagination test', () => {
  test('clicking on pagination buttons invokes the correct function', () => {
    const setCurrentPageMock = jest.fn();
    const { getByText } = render(
      <CustomPagination
        currentPage={2}
        totalPages={10}
        handlePageClick={setCurrentPageMock}
        resultsPerPage={5}
        optionLimits={[{ id: 1, value: '5' }]}
        handleResultsPerPageChange={() => {}}
      />
    );

    const firstPageButton = getByText('1');
    fireEvent.click(firstPageButton);
    expect(setCurrentPageMock).toHaveBeenCalledWith(0);

    const lastPageButton = getByText('10');
    fireEvent.click(lastPageButton);
    expect(setCurrentPageMock).toHaveBeenCalledWith(9);
  });

  test('pagination buttons are disabled on first page', async () => {
    const { getByTestId } = render(
      <CustomPagination
        currentPage={0}
        totalPages={10}
        resultsPerPage={5}
        optionLimits={[
          { id: 1, value: '5' },
          { id: 2, value: '10' }
        ]}
        handleResultsPerPageChange={() => {}}
      />
    );

    const previousButton = getByTestId('ChevronBack');
    expect(previousButton).toHaveClass('disabled');

    const ChevronForward = getByTestId('ChevronForward');
    expect(ChevronForward).not.toHaveClass('disabled');
  });

  test('clicking on a page number updates the currentPage', async () => {
    const setCurrentPageMock = jest.fn();
    const { getByText } = render(
      <CustomPagination
        currentPage={1} // Set an initial currentPage value
        totalPages={10}
        resultsPerPage={5}
        handlePageClick={setCurrentPageMock}
        optionLimits={[{ id: 1, value: '5' }]}
        handleResultsPerPageChange={() => {}}
      />
    );

    const pageToClick = getByText('2'); // Change this to match the page number you want to click

    // Simulate a click event on the page number
    fireEvent.click(pageToClick);

    // Wait for asynchronous updates, if any
    await waitFor(() => {
      // Assert that the setCurrentPageMock function was called with the expected argument
      expect(setCurrentPageMock).toHaveBeenCalledWith(1);
    });
  });
});
