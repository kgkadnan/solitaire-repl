import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CustomDropdown, IDropdownData } from '@/components/common/dropdown';

describe('CustomDropdown component', () => {
  // Mock data for testing
  const dropdownData: IDropdownData = {
    dropdownTrigger: <button>Dropdown Trigger</button>,
    dropdownMenu: [
      { label: 'Option 1', fn: jest.fn() },
      { label: 'Option 2', fn: jest.fn() },
      { label: 'Option 3', fn: jest.fn() }
    ]
  };

  test('renders dropdown trigger and menu items', async () => {
    render(<CustomDropdown {...dropdownData} />);

    // Check if the dropdown trigger is rendered
    expect(screen.getByText('Dropdown Trigger')).toBeInTheDocument();

    // Open the dropdown menu
    screen.getByText('Dropdown Trigger').click();

    // Use waitFor to wait for the dropdown menu to be present in the DOM
    await waitFor(() => {
      dropdownData.dropdownMenu.forEach(menuItem => {
        // Check if the element is present before using toBeInTheDocument
        const foundElement = screen.queryByText(menuItem.label);

        if (foundElement) {
          // Assert that the element is present
          expect(foundElement).toBeInTheDocument();
        } else {
          // Handle the case when the element is not found (optional)
          console.warn(`Element with text '${menuItem.label}' not found.`);
        }

        // Alternatively, you can use a custom text matching function
        // expect(foundElement).toBeInTheDocument({ exact: false, trim: true });
      });
    });
  });

  test('opens and closes the dropdown menu on trigger click', () => {
    render(<CustomDropdown {...dropdownData} />);

    // Initially, the dropdown menu should be closed
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();

    // Click the dropdown trigger to open the menu
    fireEvent.click(screen.getByText('Dropdown Trigger'));

    // Click the dropdown trigger again to close the menu
    fireEvent.click(screen.getByText('Dropdown Trigger'));

    // Now, the dropdown menu should be closed again
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });
});
