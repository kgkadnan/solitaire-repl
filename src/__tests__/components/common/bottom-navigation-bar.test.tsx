import { BottomNavigationBar } from '@/components/common/bottom-navigation-bar';
import { fireEvent, render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'));
describe('bottom-Navigation-Bar Component', () => {
  beforeEach(() => {
    render(<BottomNavigationBar />);
  });

  test('renders BottomNavigationBar component correctly', () => {
    // Assert the presence of key UI elements
    const labels = [
      'About Us',
      'Contact Us',
      'Privacy Policy',
      'Terms & Conditions'
    ];

    labels.forEach(label => {
      expect(screen.getByText(new RegExp(label))).toBeInTheDocument();
    });

    // Assert the presence of the copyright label
    const copyrightLabel = 'Copyright © 2022 KGK Live. All rights reserved.';
    expect(screen.getByText(new RegExp(copyrightLabel))).toBeInTheDocument();
  });

  test('handles button clicks and navigation', () => {
    const buttons = screen.getAllByRole('button', {
      name: /about us|contact us|privacy policy|terms & conditions/i
    });

    // Simulate button clicks and verify navigation
    buttons.forEach(button => {
      fireEvent.click(button);
      expect(mockRouter).toMatchObject({
        asPath: /about us|contact us|privacy policy|terms & conditions/i
      });
    });
  });
});
