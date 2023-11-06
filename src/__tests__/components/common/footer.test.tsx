import React from 'react';
import { render } from '@testing-library/react';
import { CustomFooter } from '@components/common/footer';

describe('CustomFooter component', () => {
  const footerButtonData: any = [
    { id: 1, displayButtonLabel: 'Button 1' },
    { id: 2, displayButtonLabel: 'Button 2' },
  ];

  test('renders correctly with provided data', () => {
    const { getByText } = render(
      <CustomFooter footerButtonData={footerButtonData} />
    );

    footerButtonData.forEach((item: any) => {
      const buttonLabel = getByText(item?.displayButtonLabel);
      expect(buttonLabel).toBeInTheDocument();
    });
  });
});
