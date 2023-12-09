import CompareStone from '@/app/compare-stone/page';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../mock-handlers/test-utils';
import { RightSideContent } from '@/app/compare-stone/components/right-side-content';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

describe('Compare stone component', () => {
  // Common test setup
  beforeEach(() => {
    renderWithProviders(<CompareStone />);
  });

  test('renders CompareStone component', () => {
    expect(screen.getByText(/Compare Stone/i)).toBeInTheDocument();
    expect(screen.getByText(/show only differences/i)).toBeInTheDocument();
    expect(screen.getByTestId('Select All Checkbox')).toBeInTheDocument();
  });

  test('handles "Add to Cart" button click correctly', async () => {
    // Trigger the "Add to Cart" button click
    fireEvent.click(screen.getByText('Add to Cart'));

    // Check if the error message is displayed when no stones are selected
    await waitFor(() => {
      expect(
        screen.getByText("You haven't picked any stones.")
      ).toBeInTheDocument();
    });

    // Trigger the "Add to Cart" button click again
    fireEvent.click(screen.getByText('Add to Cart'));

    // Add assertions based on your expected behavior after the button click
    await waitFor(() => {
      // Check if the success indicator is present
      const successIndicator = screen.queryByTestId('success-indicator');

      if (successIndicator) {
        // Success scenario: Product successfully added to cart
        expect(successIndicator).toBeInTheDocument();
      } else {
        // Error scenario: Product is already in the cart
        const errorIndicator = screen.getByTestId('error-indicator');
        expect(errorIndicator).toBeInTheDocument();
      }
    });

    // Add more assertions as needed
  });
});

describe('Compare stone component', () => {
  const sampleCompareStoneData: any = [
    {
      shape: 'PS',
      color: 'F',
      clarity: 'VVS2',
      // ... other properties ...
      id: 'prod_01HE36VNBSREAPB5TTESTACYXQ' // Replace with the actual ID
    },
    {
      shape: 'EM',
      color: 'J',
      clarity: 'VVS1',
      // ... other properties ...
      id: 'prod_01HE36WSR146YDPEJQPP3TKB3R' // Replace with the actual ID
    }
    // ... add more stones as needed
  ];
  const handleCloseMock = jest.fn();
  const setIsErrorMock = jest.fn();
  const setErrorTextMock = jest.fn();

  // Common test setup
  beforeEach(() => {
    renderWithProviders(
      <RightSideContent
        compareStoneData={sampleCompareStoneData}
        showDifferences={false}
        keyLabelMapping={{}}
        compareValues={{}}
        handleClick={() => {}}
        handleClose={handleCloseMock}
        setIsError={setIsErrorMock}
        setErrorText={setErrorTextMock}
      />
    );
  });

  test('removes stones correctly on close button click', async () => {
    // Trigger the close button click for each stone
    for (const stone of sampleCompareStoneData) {
      const removeStoneButtons = screen.getAllByTestId('Remove Stone');

      // Assuming you want to click the first remove stone button
      fireEvent.click(removeStoneButtons[0]);

      // Use an `await` statement to wait for the card to be removed from the DOM
      await waitFor(() => {
        expect(screen.queryByTestId(`stone.id}`)).not.toBeInTheDocument();
      });
    }

    // You might also want to check if the stones are removed from the state.
    await waitFor(() => {
      // Check if the stones are removed from the state
      expect(screen.queryByText('Diamond Image')).toBeNull(); // Adjust based on your actual implementation
    });
  });
});
