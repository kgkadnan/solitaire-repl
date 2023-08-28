import { render, fireEvent } from '@testing-library/react';
import SideBar from '@components/common/sidebar';
import mockRouter from 'next-router-mock';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));

describe('Check SideBar component', () => {
  it('mocks the useRouter hook', () => {
    // Render the component:
    render(<SideBar />);
  });

  it('navigates to homepage when KGK logo is clicked', () => {
    const { getByAltText } = render(<SideBar />);
    const kgkLogo = getByAltText('KGKlogo');

    fireEvent.click(kgkLogo);

    // Ensure the router was updated:
    expect(mockRouter).toMatchObject({
      asPath: '/',
      pathname: '/',
    });
  });
});
