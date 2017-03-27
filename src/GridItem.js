import React from 'react';
import styled from 'styled-components';
import TextArea from './TextArea';

const Item = styled.div`
  position: relative;
  transition: all 300ms ease-in-out;
  padding: .5rem;
  > textarea {
    transition: all 300ms ease-in-out;
    transition-delay: 500ms;
    opacity: ${props => props.autoHide ? 0 : 1};
  }
  &:hover {
    outline: 1px dashed lightgray;
    > textarea {
      height: 100%;
      width: 100%;
      transition-delay: 0s;
      opacity: 1;
    }
  }
  &:hover > div {
    opacity: 1;
    transition-delay: 0s;
  }
  ${props => props.globalItemStyle}
  ${props => props.itemStyle}
`;

const ItemNumberContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
  transition: all 300ms ease-in-out;
  transition-delay: 500ms;
  opacity: ${props => props.autoHide ? 0 : 1};
`;

const ItemNumber = styled.div`
  font-size: 2em;
  color: white;
  opacity: .5;
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
        <ItemNumberContainer autoHide={this.props.autoHide}>
          <ItemNumber>{this.props.index + 1}</ItemNumber>
        </ItemNumberContainer>
      </Item>
    );
  }
}

export default GridItem;
