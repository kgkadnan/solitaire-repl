import React from 'react';

import userEvent from '@testing-library/user-event';
import { cleanup, render } from '@testing-library/react';
import { CustomSelect } from '@components/common/select';

describe('CustomSelect Component', () => {
  const mockData = [
    { id: 1, value: 'Option 1' },
    { id: 2, value: 'Option 2' },
    { id: 3, value: 'Option 3' }
  ];

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('should render placeholder', () => {
    const { getByText } = render(
      <CustomSelect placeholder="Select an option" data={mockData} />
    );
    // This should match your placeholder default if you dont pass one in
    expect(getByText('Select an option')).toBeInTheDocument();
  });

  test('should render options', async () => {
    const mockData = [
      { id: 1, value: 'Option 1' },
      { id: 2, value: 'Option 2' }
      // ... more mock data
    ];

    const { getByRole, queryByText } = render(
      <CustomSelect placeholder="Select an option" data={mockData} />
    );

    // Target the combo box trigger element by its role 'button'
    // Target the combo box trigger element by its role 'button'
    const optionTrigger = getByRole('combobox')?.querySelector(
      'span'
    ) as HTMLElement;

    // Simulate clicking the combo box trigger to open the dropdown
    userEvent.click(optionTrigger);

    // Wait for the options to be rendered
    // await waitFor(async () => {
    //   for (const item of mockData) {
    //     const optionElement = await queryByText(item.value);
    //     console.log('optionElement', optionElement);
    //     expect(optionElement).toBeInTheDocument();
    //   }
    // });

    // expect(getByRole('option', { name: 'option-1' })).toBeInTheDocument();
    // expect(getByRole('option', { name: 'option-2' })).toBeInTheDocument();
    // Add in however many options you have
  });
});

// test('renders placeholder and options correctly', () => {
//   const { getByText, getByRole, queryByText } = render(
//     <CustomSelect data={mockData} placeholder='Select an option' />
//   );

//   const placeholderElement = getByText('Select an option');
//   console.log('placeholderElement', placeholderElement);
//   expect(placeholderElement).toBeInTheDocument();

//   userEvent.click(placeholderElement);

//   mockData.forEach((item) => {
//     const optionElement = queryByText(item.value);
//     console.log('option', optionElement);
//     // expect(optionElement).toBeInTheDocument();
//   });
// });
