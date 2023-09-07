import { TopNavigationBar } from '@components/common/top-navigation-bar';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import mockRouter from 'next-router-mock';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));
describe('Top-Navigation-Bar Component', () => {
  beforeEach(() => {
    render(<TopNavigationBar />);
  });

  test('renders TopNavigationBar component correctly', () => {
    // Assert the presence of key UI elements
    const labels = [
      'For You',
      'Advance Search',
      'Previous Search',
      'Wishlist',
      'My Cart',
    ];

    labels.forEach((label) => {
      expect(screen.getByText(new RegExp(label))).toBeInTheDocument();
    });
  });

  test('handles button clicks and navigation', () => {
    const buttons = screen.getAllByRole('button', {
      name: /for you|advance search|previous search|wishlist|my cart/i,
    });

    // Simulate button clicks and verify navigation
    buttons.forEach((button) => {
      fireEvent.click(button);
      expect(mockRouter).toMatchObject({
        asPath: /for you|advance search|previous search|wishlist|my cart/i,
      });
    });
  });

  test('updates visibility state when scrolling', async () => {
    const { container } = render(<TopNavigationBar />);

    // Mock the addEventListener and removeEventListener methods
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();

    // Simulate scrolling down
    act(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 100 } });
    });

    // Check if addEventListener was called with the correct arguments
    expect(window.addEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );

    // Check if the visibility state was updated
    // You may need to access the state through container or by querying the DOM
    const visibilityElement = container.querySelector(
      '.your-visibility-element'
    );

    // Simulate scrolling up
    act(() => {
      fireEvent.scroll(window, { target: { pageYOffset: 50 } });
    });

    // Check if removeEventListener was called with the correct arguments
    expect(window.removeEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
  });
});
