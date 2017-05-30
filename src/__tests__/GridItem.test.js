import React from 'react';
import renderer from 'react-test-renderer';
import GridItem from '../GridItem';

it('renders correctly as item 1', () => {
  const Component = (
    <GridItem
      key={1}
      itemNumber={0}
      itemStyle={'background: red;'}
      autoHide
      globalItemStyle={'height: 100px;'}
      updateItemStyle={() => {}}
    />
  );
  const tree = renderer.create(Component).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly as item 2', () => {
  const Component = (
    <GridItem
      key={1}
      itemNumber={1}
      itemStyle={'background: red;'}
      autoHide
      globalItemStyle={'height: 100px;'}
      updateItemStyle={() => {}}
    />
  );
  const tree = renderer.create(Component).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders grid item with auto hide', () => {
  const Component = <GridItem key={1} itemNumber={1} autoHide />;
  const tree = renderer.create(Component).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders grid item without auto hide', () => {
  const Component = <GridItem key={1} itemNumber={1} />;
  const tree = renderer.create(Component).toJSON();
  expect(tree).toMatchSnapshot();
});

// it('grid item style update', () => {
//   const component = shallow(
//     <GridItem
//       key={1}
//       itemNumber={1}
//       updateItemStyle={() => 'foo'}
//     />,
//   );
//   component.find('textarea').simulate('click').simulate('keydown', { which: 'a' });
//   expect(component.find('textarea').text()).toEqual('a');
//   // const result = Component.props.updateItemStyle();
//   // expect(result).toBe('foo');
// });
