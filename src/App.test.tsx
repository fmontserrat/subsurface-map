import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Dummy test', () => {
  render(<App />);
  expect(true).toBeTruthy()
});
