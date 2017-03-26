import React from 'react';
import styled from 'styled-components';
import TextArea from './TextArea';

const Item = styled.div`
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
  ${props => props.globalItemStyle}
  ${props => props.itemStyle}
`;

class GridItem extends React.Component {
  updateItemStyle = (value) => this.props.updateItemStyle(this.props.index, value)
  render() {
    return (
      <Item
        color={this.props.gridItemColor}
        autoHide={this.props.autoHide}
        itemStyle={this.props.itemStyle}
        globalItemStyle={this.props.globalItemStyle}>
        <TextArea
          value={this.props.itemStyle}
          onChange={this.updateItemStyle}/>
      </Item>
    );
  }

}

export default GridItem;
