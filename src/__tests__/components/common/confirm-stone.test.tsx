// ConfirmStone.test.js

import React from 'react';
import { render, fireEvent, logDOM } from '@testing-library/react';
import ConfirmStone from '@/components/common/confirm-stone';
import userEvent from '@testing-library/user-event';
import { boolean } from 'zod';

// Mock the translation function
jest.mock('@/utils/translate', () => ({
  ManageLocales: (key: any) => key // Replace with your actual translation logic
}));

describe('ConfirmStone Component', () => {
  it('renders without crashing', () => {
    const props = {
      confirmStoneData: [], // Add your props here
      listingColumns: [], // Add your props here
      commentValue: '',
      handleComment: jest.fn(),
      setInputError: jest.fn(),
      setInputErrorContent: jest.fn(),
      setSelectedDaysInputValue: jest.fn(),
      onOpenChange: jest.fn(),
      confirmRadioButtons: [
        {
          name: 'test',
          onChange: jest.fn(),
          id: '1',
          value: 'Test',
          label: 'Test Label',
          checked: true
        }
      ],
      inputError: false,
      selectedDaysInputValue: '',
      selectedRadioDaysValue: ''
    };

    const { container } = render(<ConfirmStone {...props} />);
    expect(container).toBeInTheDocument();
  });

  it('handles comment change', () => {
    const handleCommentMock = jest.fn();
    const props = {
      confirmStoneData: [], // Add your props here
      listingColumns: [], // Add your props here
      commentValue: 'Test comment',
      handleComment: handleCommentMock,
      setInputError: jest.fn(),
      setInputErrorContent: jest.fn(),
      setSelectedDaysInputValue: jest.fn(),
      onOpenChange: jest.fn(),
      confirmRadioButtons: [
        {
          name: 'test',
          onChange: jest.fn(),
          id: '1',
          value: 'Test',
          label: 'Test Label',
          checked: true
        }
      ],
      inputError: false,
      selectedDaysInputValue: '',
      selectedRadioDaysValue: ''
    };

    const { getByTestId } = render(<ConfirmStone {...props} />);

    expect(getByTestId('addComment')).toHaveValue('Test comment');
  });

  // Add more tests as needed
});
