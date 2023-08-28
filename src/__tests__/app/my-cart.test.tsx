import MyCart from '@app/my-cart/page';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('My-cart component', () => {
  // Common test setup
  beforeEach(() => {
    render(<MyCart />);
  });

  test('renders MyCart component correctly', () => {
    // Assert the presence of key UI elements
    expect(screen.getByText(/mycart/i)).toBeInTheDocument();
    expect(screen.getByText(/select all/i)).toBeInTheDocument();
  });

  test("toggles 'Select All' checkbox correctly", () => {
    // Find the 'Select All' checkbox
    const selectAllCheckbox = screen.getByTestId('Select All Checkbox');

    // Click the 'Select All' checkboxpp
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

  test('displays card details when a card is clicked', () => {
    // Find a card
    const card = screen.getByTestId('card-1');

    // Click the card to expand its details
    fireEvent.click(card);

    // Check if detailed information is displayed
    const basicDetailsElement = screen.queryAllByText('Basic Details');
    expect(basicDetailsElement).toHaveLength(2);
  });
});
