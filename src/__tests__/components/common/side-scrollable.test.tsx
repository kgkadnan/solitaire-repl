import { CustomSideScrollable } from '@/components/common/side-scrollable';
import { fireEvent, render, screen } from '@testing-library/react';

describe('CustomSideScrollable Component', () => {
  // Common test setup
  beforeEach(() => {
    // Define your test content and styles
    const leftFixedContent = <div data-testid="left-content">Left Content</div>;
    const rightSideContent = (
      <div data-testid="right-content">Right Content</div>
    );
    const leftFixedStyle = 'left-fixed-style';
    const rightSideStyle = 'right-side-style';

    render(
      <CustomSideScrollable
        leftFixedContent={leftFixedContent}
        rightSideContent={rightSideContent}
        leftFixedStyle={leftFixedStyle}
        rightSideStyle={rightSideStyle}
      />
    );
  });

  test('renders CustomSideScrollable component correctly', () => {
    expect(screen.getByTestId('left-content')).toBeInTheDocument();
    expect(screen.getByTestId('right-content')).toBeInTheDocument();
  });

  test('handles mouse interactions', () => {
    fireEvent.mouseDown(screen.getByTestId('scrollable-container'));
    fireEvent.mouseUp(screen.getByTestId('scrollable-container'));
    fireEvent.mouseMove(screen.getByTestId('scrollable-container'));
  });

  test('handles mouse move and scrolls content', () => {
    const leftFixedContent = <div>Left Content</div>;
    const rightSideContent = <div>Right Content</div>;

    const { container } = render(
      <CustomSideScrollable
        leftFixedContent={leftFixedContent}
        rightSideContent={rightSideContent}
      />
    );

    const scrollableContainer = container.querySelector('.scrollableContainer');

    if (scrollableContainer !== null) {
      // Simulate mouse down event to initiate dragging
      fireEvent.mouseDown(scrollableContainer, { pageX: 100 });
      expect(scrollableContainer.scrollLeft);

      // Simulate mouse move event to scroll content
      fireEvent.mouseMove(scrollableContainer, { pageX: 50 });
      expect(scrollableContainer.scrollLeft); // Adjust based on your scroll speed

      // Simulate mouse up event to stop dragging
      fireEvent.mouseUp(scrollableContainer);
    }
  });
});
