import React from 'react';
import { render } from '@testing-library/react';
import { CustomFooter, IfooterButtonData } from '@components/common/footer';

describe('CustomFooter component', () => {
  const footerButtonData: IfooterButtonData[] = [
    { id: 1, displayButtonLabel: 'Button 1' },
    { id: 2, displayButtonLabel: 'Button 2' },
  ];

  it('renders correctly with provided data', () => {
    const { getByText } = render(
      <CustomFooter footerButtonData={footerButtonData} />
    );

    footerButtonData.forEach((item) => {
      const buttonLabel = getByText(item.displayButtonLabel);
      expect(buttonLabel).toBeInTheDocument();
    });
  });
});
