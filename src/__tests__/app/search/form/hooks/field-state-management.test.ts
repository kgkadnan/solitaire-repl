// useFieldStateManagement.test.js
import useFieldStateManagement from '@/app/search/form/hooks/field-state-management';
import { renderHook, act } from '@testing-library/react-hooks';

describe('useFieldStateManagement', () => {
  test('should initialize state with default values', () => {
    const { result } = renderHook(() => useFieldStateManagement());

    const { state } = result.current;

    // Add assertions for the initial state values
    expect(state.selectedShape).toEqual([]);
    expect(state.selectedColor).toBe('');
    // Add more assertions for other state properties
  });

  test('should update state using setState functions', () => {
    const { result } = renderHook(() => useFieldStateManagement());

    act(() => {
      result.current.setState.setSelectedShape(['Round']);
      result.current.setState.setSelectedColor('Blue');
      // Add more state updates
    });

    const { state } = result.current;

    // Add assertions for the updated state values
    expect(state.selectedShape).toEqual(['Round']);
    expect(state.selectedColor).toBe('Blue');
    // Add more assertions for other state properties
  });

  test('should update caratRangeData using setCaratRangeData', () => {
    const { result } = renderHook(() => useFieldStateManagement());

    act(() => {
      result.current.carat.setCaratRangeData(['1.0-2.0']);
    });

    const { carat } = result.current;

    // Add assertions for the updated caratRangeData
    expect(carat.caratRangeData).toEqual(['1.0-2.0']);
  });
});
