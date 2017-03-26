import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 25px;
  background: white;
  border: 0;
  text-align: center;
  cursor: pointer;
  &:nth-child(3) {
    margin: 0 0 0 5px;
  }
  &:last-child {
    margin: 0 5px 0 10px;
  }
`;
class ItemController extends React.Component {
  render() {
    return (
      <div>
        <Button onClick={this.props.onIncrease}>👆</Button>
        <Button onClick={this.props.onDecrease}>👇</Button>
        <Button onClick={this.props.onReset}>👋</Button>
        <Button onClick={this.props.onHideStyle}>👀</Button>
      </div>
    );
  }

}

export default ItemController;
