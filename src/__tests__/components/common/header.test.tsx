import React, { ClassAttributes, ImgHTMLAttributes } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CustomHeader from '@components/common/header';
import Image from 'next/image';

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
    }) => <Image src={src} alt={alt} width={width} height={height} {...rest} />,
  };
});

describe('CustomHeader component', () => {
  const headerData = {
    headerHeading: 'Test Heading',
    searchCount: 5,
    handleSearch: jest.fn(),
    searchValue: 'Test Value',
    handleSuggestionClick: jest.fn(),
    suggestions: ['Suggestion 1', 'Suggestion 2'],
  };

  test('renders correctly with provided data', () => {
    const { getByText, getByPlaceholderText } = render(
      <CustomHeader data={headerData} />
    );

    // Check if heading and search count are rendered correctly
    expect(getByText('Test Heading (5)')).toBeInTheDocument();

    // Check if search input and button are rendered
    expect(getByPlaceholderText('Search by name')).toBeInTheDocument();
  });

  test('calls handleSearch when input value changes', () => {
    const { getByPlaceholderText } = render(<CustomHeader data={headerData} />);

    const inputElement = getByPlaceholderText('Search by name');

    fireEvent.change(inputElement, { target: { value: 'New Value' } });

    expect(headerData.handleSearch).toHaveBeenCalledWith(
      expect.any(Object) // Match any object (event)
    );
  });

  test('calls handleSuggestionClick when suggestion is clicked', () => {
    const { getByPlaceholderText, getByText } = render(
      <CustomHeader data={headerData} />
    );

    const inputElement = getByPlaceholderText('Search by name');
    fireEvent.focus(inputElement);

    const suggestionElement = getByText('Suggestion 1');
    fireEvent.click(suggestionElement);

    expect(headerData.handleSuggestionClick).toHaveBeenCalledWith(
      'Suggestion 1'
    );
  });

  test('updates visibility state on scroll', async () => {
    const { container, rerender } = render(<CustomHeader data={{}} />);
    const headerElement = container.querySelector('.mainDiv');

    // Initial state should be mainDiv
    expect(headerElement).toHaveClass('mainDiv');

    // Simulate scrolling down
    Object.defineProperty(window, 'scrollY', { value: 200 });
    fireEvent.scroll(window);

    // Wait for the scroll event to be processed
    await waitFor(() => {
      rerender(<CustomHeader data={{}} />);
      // State should be updated to visible
      expect(headerElement).toHaveClass('visible');
    });

    // Simulate scrolling back up
    Object.defineProperty(window, 'scrollY', { value: 50 });
    fireEvent.scroll(window);

    // Wait for the scroll event to be processed
    await waitFor(() => {
      rerender(<CustomHeader data={{}} />);
      // State should be updated to visible again
      expect(headerElement).toHaveClass('visible');
    });
  });
});
