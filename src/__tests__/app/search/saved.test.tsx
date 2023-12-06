import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SavedSearch from '@/app/search/saved';
import { renderWithProviders } from '@/__tests__/mock-handlers/test-utils';
import { setupSetupsavedSearchandlers } from '@/__tests__/mock-handlers/saved-search';
import { act } from 'react-dom/test-utils';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

describe('SavedSearch Component', () => {
  // Common test setup
  beforeEach(() => {
    // Mock the data to be returned by your API request
    setupSetupsavedSearchandlers();
    renderWithProviders(<SavedSearch />);
  });

  test('renders Saved Search component correctly', () => {
    expect(screen.getByText(/select all/i)).toBeInTheDocument();
    expect(screen.getByText(/filter by date/i)).toBeInTheDocument();
  });

  test('renders search input and suggestions correctly', () => {
    // Find the search input
    const searchInput = screen.getByPlaceholderText('Search by name');

    // Type into the search input
    fireEvent.change(searchInput, { target: { value: 'R2' } });
  });

  test('toggles Select All checkbox correctly', () => {
    // Find the 'Select All' checkbox
    const selectAllCheckbox = screen.getByTestId('Select All Checkbox');

    // Click the 'Select All' checkbox
    fireEvent.click(selectAllCheckbox);

    // Find all checkboxes
    const checkboxes = screen.getAllByRole('checkbox');

    // Check if all checkboxes are checked
    waitFor(() => {
      checkboxes.forEach(checkbox => {
        expect(checkbox.ariaChecked).toBe(true);
      });
    });
    // Click the 'Select All' checkbox again
    fireEvent.click(selectAllCheckbox);

    // Check if all checkboxes are unchecked
    waitFor(() => {
      checkboxes.forEach(checkbox => {
        expect(checkbox.ariaChecked).toBe(false);
      });
    });
  });

  test('Test delete functionality', async () => {
    // Find the card using its dynamic ID
    const cardId = 'saved_search_01H95GDK1N1Q1RBWF5VF5JPD7K';
    // Find the 'Select All' checkbox
    const selectAllCheckbox = screen.getByTestId('Select All Checkbox');

    // Click the 'Select All' checkbox
    fireEvent.click(selectAllCheckbox);
    expect(selectAllCheckbox).toBeChecked();

    let deleteButton = screen.getByText('Delete');

    fireEvent.click(deleteButton);

    // Use an `await` statement to wait for the card to be removed from the DOM
    await waitFor(() => {
      expect(screen.queryByTestId(`card-${cardId}`)).not.toBeInTheDocument();
    });
  });

  test('handles dialog state changes correctly', async () => {
    // Simulate clicking on delete button
    act(() => {
      fireEvent.click(screen.getByText('Delete'));
    });

    // Try using getByTestId again
    act(() => {
      fireEvent.click(screen.getByTestId('display-button'));
    });

    // Verify state changes after dialog action
    await waitFor(() => {
      expect(screen.queryByTestId('mocked-dialog')).not.toBeInTheDocument();
    });
  });
});
