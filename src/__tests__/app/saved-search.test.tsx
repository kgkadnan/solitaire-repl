import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import SavedSearch from '@/app/search/saved';
import { renderWithProviders } from '@/mock-handlers/test-utils';
import { setupSetupsavedSearchandlers } from '@/mock-handlers/saved-search';
import Image from 'next/image';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));
jest.mock('next/image', () => {
  return {
    __esModule: true,
    default: ({
      src,
      alt,
      width,
      height,
      ...rest
    }: {
      src: string;
      alt: string;
      width: number;
      height: number;
      // Add more specific types for other props if needed
      // ...rest: SomeType;
    }) => <img src={src} alt={alt} width={width} height={height} {...rest} />,
  };
});

describe('SavedSearch Component - Render Card Data', () => {
  // Common test setup
  beforeEach(() => {
    // Mock the data to be returned by your API request
    setupSetupsavedSearchandlers();
    renderWithProviders(<SavedSearch />);
  });

  test('renders Saved Search component correctly', () => {
    // Assert the presence of key UI elements
    expect(screen.getByText(/saved search/i)).toBeInTheDocument();
    expect(screen.getByText(/select all/i)).toBeInTheDocument();
  });

  // it("renders search input and suggestions correctly", () => {
  //   const { getByPlaceholderText, screen.getByText } = render(<SavedSearch />);

  //   // Find the search input
  //   const searchInput = getByPlaceholderText("Search by name");

  //   // Type into the search input
  //   fireEvent.change(searchInput, { target: { value: "R2" } });

  //   // Ensure suggestions are displayed
  //   expect(screen.getByText("R2.01VVS2 Search A")).toBeInTheDocument();
  //   expect(screen.getByText("R2.01VVS2 Searchb")).toBeInTheDocument();
  // });

  it("toggles 'Select All' checkbox correctly", () => {
    // Find the 'Select All' checkbox
    const selectAllCheckbox = screen.getByTestId('Select All Checkbox');

    // Click the 'Select All' checkbox
    fireEvent.click(selectAllCheckbox);

    // Find all checkboxes
    const checkboxes = screen.getAllByRole('checkbox');

    // Check if all checkboxes are checked
    waitFor(() => {
      checkboxes.forEach((checkbox) => {
        expect(checkbox.ariaChecked).toBe(true);
      });
    });
    // Click the 'Select All' checkbox again
    fireEvent.click(selectAllCheckbox);

    // Check if all checkboxes are unchecked
    waitFor(() => {
      checkboxes.forEach((checkbox) => {
        expect(checkbox.ariaChecked).toBe(false);
      });
    });
  });

  test('displays card details when a card is clicked', async () => {
    // Find the card using its dynamic ID
    const cardId = 'saved_search_01H95GDK1N1Q1RBWF5VF5JPD7K';
    const card = await screen.findByTestId(`card-${cardId}`);

    // Click the card to expand its details
    fireEvent.click(card);

    // Wait for the detailed information to appear
    await screen.findByText('Basic Details');

    // Now, you can make your assertions
    const basicDetailsElement = screen.queryAllByText('Basic Details');
    expect(basicDetailsElement).toHaveLength(1);
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
});
