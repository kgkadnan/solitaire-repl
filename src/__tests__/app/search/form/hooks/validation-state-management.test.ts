import useValidationStateManagement, {
  Errors
} from '@/app/search/form/hooks/validation-state-management';
import { renderHook, act } from '@testing-library/react-hooks';

describe('useValidationStateManagement', () => {
  test('should initialize state correctly', () => {
    const { result } = renderHook(() => useValidationStateManagement());

    // Assert initial state values
    expect(result.current.validationError).toBe('');
    expect(result.current.isInputDialogOpen).toBe(false);
    expect(result.current.searchCount).toBe(-1);
    // Add more assertions for other initial state values
  });

  test('should update state values correctly', () => {
    const { result } = renderHook(() => useValidationStateManagement());

    // Act and update state values
    act(() => {
      result.current.setValidationError('New error');
      result.current.setIsInputDialogOpen(true);
      result.current.setSearchCount(2);
      // Add more state updates as needed
    });

    // Assert updated state values
    expect(result.current.validationError).toBe('New error');
    expect(result.current.isInputDialogOpen).toBe(true);
    expect(result.current.searchCount).toBe(2);
    // Add more assertions for other state values
  });

  test('should update errors state correctly', () => {
    const { result } = renderHook(() => useValidationStateManagement());

    // Define a mock error object
    const mockErrors: Errors = {
      discount: { from: 'Invalid from', to: 'Invalid to' },
      price_range: { from: null, to: 'Invalid to' },
      price_per_carat: { from: 'Invalid from', to: null }
    };

    // Act and update errors state
    act(() => {
      result.current.setErrors(mockErrors);
    });

    // Assert updated errors state
    expect(result.current.errors).toEqual(mockErrors);
  });
});
