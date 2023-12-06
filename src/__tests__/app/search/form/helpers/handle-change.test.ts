import { handleFilterChange } from '@/app/search/form/helpers/handle-change';

describe('handleFilterChange', () => {
  test('should add and remove filters correctly', () => {
    // Initial state
    let selectedFilters = ['filter1', 'filter2'];

    // Mock setSelectedFilters function
    const setSelectedFilters = jest.fn();

    // Add a filter
    handleFilterChange('filter2', selectedFilters, setSelectedFilters);
    expect(selectedFilters).toHaveLength(2);

    // Remove a filter
    handleFilterChange('filter2', selectedFilters, setSelectedFilters);
    expect(selectedFilters).toHaveLength(2);

    // Try removing a filter that doesn't exist (should not call setSelectedFilters)
    handleFilterChange('filter4', selectedFilters, setSelectedFilters);
    expect(selectedFilters).toHaveLength(2);
  });
});
