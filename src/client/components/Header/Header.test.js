import React from 'react';
import { create } from 'react-test-renderer';
import { Header } from './Header';

test('test snapshot', () => {
  const mockCreate = jest.fn();
  const c = create(<Header create={mockCreate} />);
  expect(c.toJSON()).toMatchSnapshot();
});