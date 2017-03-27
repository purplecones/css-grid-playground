import React from 'react';
import renderer from 'react-test-renderer';
import ItemController from '../ItemController';

it('renders correctly', () => {
  const tree = renderer.create(<ItemController />).toJSON();
  expect(tree).toMatchSnapshot();
});
