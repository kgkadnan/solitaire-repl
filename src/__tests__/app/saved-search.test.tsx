import React, { ClassAttributes, ImgHTMLAttributes } from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../mock_server/test-utils';
import { server } from '../../mock_server';
import { rest } from 'msw';
import SavedSearch from '@/app/saved-search/page';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (
    props: React.JSX.IntrinsicAttributes &
      ClassAttributes<HTMLImageElement> &
      ImgHTMLAttributes<HTMLImageElement>
  ) => <img {...props} />,
}));

describe('SavedSearch Component - Render Card Data', () => {
  // Common test setup
  beforeEach(() => {
    // Mock the data to be returned by your API request
    const mockApiResponse = {
      data: {
        previousSearch: [
          {
            diamond_count: 256,
            name: 'sample4',
            customer_id: 'cus_01H90HVS4396XG4A6D1PFMCXKX',
            is_deleted: false,
            meta_data: {
              cut: ['EX', 'IDEAL', 'VG'],
              lab: ['GIA', 'HRD', 'IGI'],
              color: ['D', 'F', 'E', 'G'],
              clarity: ['VVS2', 'VVS1', 'VS2'],
            },
            id: 'saved_search_01H95GDK1N1Q1RBWF5VF5JPD7K',
            created_at: '2023-08-31T09:57:31.317Z',
            updated_at: '2023-09-01T11:17:11.266Z',
          },
        ],
        totalPages: 5,
      },
    };

    // Configure MSW to return the mock data
    server.use(
      rest.get('/previous-search', (req, res, ctx) => {
        return res(ctx.json(mockApiResponse));
      })
    );
    renderWithProviders(<SavedSearch />);
  });

  test('renders Saved Search component correctly', () => {
    // Assert the presence of key UI elements
    expect(screen.getByText(/saved search/i)).toBeInTheDocument();
    expect(screen.getByText(/select all/i)).toBeInTheDocument();
  });

  // it("renders search input and suggestions correctly", () => {
  //   const { getByPlaceholderText, screen.getByText } = render(<SavedSearch />);

  //   // Find the search input
  //   const searchInput = getByPlaceholderText("Search by name");

  //   // Type into the search input
  //   fireEvent.change(searchInput, { target: { value: "R2" } });

  //   // Ensure suggestions are displayed
  //   expect(screen.getByText("R2.01VVS2 Search A")).toBeInTheDocument();
  //   expect(screen.getByText("R2.01VVS2 Searchb")).toBeInTheDocument();
  // });

  it("toggles 'Select All' checkbox correctly", () => {
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
    const cardId = 'saved_search_01H95GDK1N1Q1RBWF5VF5JPD7K';
    const card = await screen.findByTestId(`card-${cardId}`);

    // Click the card to expand its details
    fireEvent.click(card);

    // Wait for the detailed information to appear
    await screen.findByText('Basic Details');

    // Now, you can make your assertions
    const basicDetailsElement = screen.queryAllByText('Basic Details');
    expect(basicDetailsElement).toHaveLength(1);
  });
});
