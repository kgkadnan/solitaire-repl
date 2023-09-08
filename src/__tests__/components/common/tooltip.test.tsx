import Tooltip from '@/components/common/tooltip';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Tooltip Component', () => {
  const tooltipElement = <button>Hover me</button>;
  const content = <div>Tooltip Content</div>;
  const handleEvent = jest.fn();

  // Define the tooltipStyles prop
  const tooltipStyles = {
    tooltipContainerStyles: 'custom-container-style',
  };

  // Common test setup
  beforeEach(() => {
    render(
      <Tooltip
        tooltipElement={tooltipElement}
        content={content}
        tooltipStyles={tooltipStyles}
        handleEvent={handleEvent}
      />
    );
  });

  test('renders Tooltip component correctly', () => {
    // Trigger the tooltip by hovering over the tooltipElement
    fireEvent.mouseEnter(screen.getByText('Hover me'));

    // Tooltip content should be visible after mouse enter
    expect(screen.getByText('Tooltip Content')).toBeInTheDocument();

    // Close the tooltip by moving the mouse out of the tooltipElement
    fireEvent.mouseLeave(screen.getByText('Hover me'));
  });

  test('calls handleEvent when tooltip is triggered', () => {
    // Trigger the tooltip by clicking the tooltipElement
    fireEvent.click(screen.getByText('Hover me'));

    // handleEvent function should be called
    expect(handleEvent).toHaveBeenCalled();
  });

  test('applies custom tooltip styles', () => {
    const tooltipElement = <button>Hover me</button>;
    const content = 'Tooltip Content';
    const tooltipStyles = {
      tooltipContainerStyles: 'custom-container-style',
    };

    const { container } = render(
      <Tooltip
        tooltipElement={tooltipElement}
        content={content}
        tooltipStyles={tooltipStyles}
      />
    );

    // Check if custom styles are applied
    expect(container.firstChild).toHaveClass('custom-container-style');
  });
});
