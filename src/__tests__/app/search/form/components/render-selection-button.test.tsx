import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import renderSelectionButtons from '@/app/search/form/components/render-selection-button';

describe('renderSelectionButtons', () => {
  test('renders selection buttons correctly', () => {
    // Define mock data and functions
    const data = ['Option1', 'Option2', 'Option3'];
    const handleChange = jest.fn();

    // Render the component
    const { getByText } = render(
      <div>
        {renderSelectionButtons(data, 'testClassName', 'activeStyle', 'Option2', handleChange, true)}
      </div>
    );

    // Assertions
    data.forEach((option) => {
      const optionButton = getByText(option);
      expect(optionButton).toBeInTheDocument();

      // Simulate a click event on each button and check if the handleChange function is called
      fireEvent.click(optionButton);
      expect(handleChange).toHaveBeenCalledWith(option);
    });
  });
});
