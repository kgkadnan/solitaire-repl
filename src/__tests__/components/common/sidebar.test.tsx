import { render, fireEvent, getByAltText } from '@testing-library/react';
import SideBar from '@components/common/sidebar';
import mockRouter from 'next-router-mock';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

describe('Check SideBar component', () => {
  test('mocks the useRouter hook', () => {
    // Render the component:
    render(<SideBar />);
  });

  test('navigates to homepage when KGK logo is clicked', () => {
    const { getByAltText } = render(<SideBar />);
    const kgkLogo = getByAltText('KGKlogo');

    fireEvent.click(kgkLogo);

    // Ensure the router was updated:
    expect(mockRouter).toMatchObject({
      asPath: '/',
      pathname: '/',
    });
  });
  test('handles image tile click', () => {
    // Mock the useRouter object
    const mockPush = jest.fn();
    mockRouter.push = mockPush;

    // Render the SideBar component
    const { getByAltText } = render(<SideBar />);

    // Click on an image tile
    const tileElement = getByAltText('new-arrival');

    fireEvent.click(tileElement);

    // Check if router.push was called with the expected URL
    expect(mockPush).toHaveBeenCalledWith('/new-arrival?lang=en');
  });
});
