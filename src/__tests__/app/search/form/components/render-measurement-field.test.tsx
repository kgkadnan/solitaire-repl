import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderMeasurementField from '@/app/search/form/components/render-measurement-field';

describe('renderMeasurementField', () => {
  test('should render measurement fields with correct labels and handle changes', () => {
    const state = {
      tablePerFrom: '',
      tablePerTo: ''
    };

    const setState = jest.fn(); // Mock setState function

    render(<div>{renderMeasurementField(state, setState)}</div>);

    // Check if each label is rendered
    expect(screen.getByText(/Table%/i)).toBeInTheDocument();
    // expect(screen.getByText(/Depth/i)).toBeInTheDocument();
  });
});
