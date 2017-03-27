import React from 'react';
import renderer from 'react-test-renderer';
import GridContainer from '../GridContainer';

it('renders two grid items correctly', () => {
  const Component = (
    <GridContainer gridContainerStyle="display: grid; grid-template-columns: 1fr 1fr;">
      <div>1</div>
      <div>2</div>
    </GridContainer>
  );
  const tree = renderer.create(Component).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders four grid items correctly', () => {
  const Component = (
    <GridContainer gridContainerStyle="display: grid; grid-template-columns: 1fr 1fr;">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </GridContainer>
  );
  const tree = renderer.create(Component).toJSON();
  expect(tree).toMatchSnapshot();
});
