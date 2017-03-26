import React from 'react';
import styled from 'styled-components';
import TextArea from './TextArea';

const Item = styled.div`
  background: ${(props) => props.color}
  transition: all 300ms ease-in-out;
  padding: .5rem;
  > textarea {
    transition: all 300ms ease-in-out;
    transition-delay: 500ms;
    opacity: ${props => props.autoHide ? 0 : 1};
  }
  &:hover {
    outline: 1px dashed lightgray;
    >textarea {
      height: 100%;
      width: 100%;
      transition-delay: 0s;
      opacity: 1;
    }
  }
  ${props => props.defaultItemStyle}
  ${props => props.itemStyle}
`;

class GridItem extends React.Component {
  state = {
    itemStyle: ``,
  }
  updateItemStyle = (value) => this.setState({ itemStyle: value})
  render() {
    return (
      <Item
        itemStyle={this.state.itemStyle}
        color={this.props.gridItemColor}
        autoHide={this.props.autoHide}
        defaultItemStyle={this.props.defaultItemStyle}>
        <TextArea
          value={this.state.itemStyle}
          onChange={this.updateItemStyle}/>
      </Item>
    );
  }

}

export default GridItem;
