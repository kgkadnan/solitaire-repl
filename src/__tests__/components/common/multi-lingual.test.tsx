import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import LanguageSelector from '@/components/common/multi-lingual';

// Create a mock Redux store
const mockStore = configureMockStore();
const store = mockStore({});

test('LanguageSelector component dispatches SET_LANGUAGE action', () => {
  const { getByText } = render(
    <Provider store={store}>
      <LanguageSelector />
    </Provider>
  );

  // Click the "English" button
  fireEvent.click(getByText('English'));

  // Expect that the SET_LANGUAGE action was dispatched with 'en' payload
  const actions = store.getActions();
  expect(actions).toEqual([{ type: 'SET_LANGUAGE', payload: 'en' }]);

  // Click the "French" button
  fireEvent.click(getByText('French'));

  // Expect that the SET_LANGUAGE action was dispatched with 'fr' payload
  const updatedActions = store.getActions();
  expect(updatedActions).toEqual([
    { type: 'SET_LANGUAGE', payload: 'en' },
    { type: 'SET_LANGUAGE', payload: 'fr' },
  ]);
});
