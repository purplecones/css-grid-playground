import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

it('renders correctly on compatible device', () => {
  const tree = renderer.create(<App isCompatible />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly on incompatible device', () => {
  const tree = renderer.create(<App isCompatible={false} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly on test runner as incompatible', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
