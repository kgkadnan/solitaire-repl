import React, { ClassAttributes, ImgHTMLAttributes } from 'react';
import PreviousSearch from '@app/previous-search/page';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '@/mockHandlers/test-utils';
import { setupPreviousSearchHandlers } from '@/mockHandlers/previous-search';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (
    props: React.JSX.IntrinsicAttributes &
      ClassAttributes<HTMLImageElement> &
      ImgHTMLAttributes<HTMLImageElement>
  ) => <img {...props} />,
}));

describe('PreviousSearch Component', () => {
  // Common test setup
  beforeEach(() => {
    setupPreviousSearchHandlers();
    renderWithProviders(<PreviousSearch />);
  });

  test('renders PreviousSearch component correctly', async () => {
    // Assert the presence of key UI elements
    expect(screen.getByText(/previous search/i)).toBeInTheDocument();
    expect(screen.getByText(/select all/i)).toBeInTheDocument();
    // Use `findByText` with `await` to wait for the text to appear
    const sample4Text = await screen.findByText(/Sample4/i);
    expect(sample4Text).toBeInTheDocument();
  });

  test("toggles 'Select All' checkbox correctly", () => {
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
    const cardId = 'previous_search_01H95GDK1N1Q1RBWF5VF5JPD7K';
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
    const cardId = 'previous_search_01H95GDK1N1Q1RBWF5VF5JPD7K';
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
