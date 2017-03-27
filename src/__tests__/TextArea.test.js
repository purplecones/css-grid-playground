import React from 'react';
import renderer from 'react-test-renderer';
import TextArea from '../TextArea';

it('renders correctly', () => {
  const value = `background: red;
width: 100px;`;

  const Component = (
    <TextArea
      value={value}
      onChange={() => {}}
    />
  );
  const tree = renderer.create(Component).toJSON();
  expect(tree).toMatchSnapshot();
});
