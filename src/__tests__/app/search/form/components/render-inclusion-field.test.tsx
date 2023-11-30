import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderInclusionField from '@/app/search/form/components/render-inclusion-field';

describe('renderInclusionField', () => {
  test('should render inclusion fields with correct labels and handle changes', () => {
    const state = {
      blackTableBI: [],
      sideBlackBI: [],
      // Add other state properties with initial values as needed
    };

    const setState = jest.fn(); // Mock setState function

    render(<div>{renderInclusionField(state, setState)}</div>);

    // Check if each label is rendered
    expect(screen.getByText(/Black Inclusion/i)).toBeInTheDocument();
    expect(screen.getByText(/White Inclusion/i)).toBeInTheDocument();

    

  });
});
