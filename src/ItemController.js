import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 25px;
  background: white;
  border: 0;
  text-align: center;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:nth-child(3) {
    margin: 0 0 0 5px;
  }
  &:last-child {
    margin: 0 5px 0 10px;
  }
`;

const ItemController = props => (
  <div>
    <Button onClick={props.onIncrease}>👆</Button>
    <Button onClick={props.onDecrease}>👇</Button>
    <Button onClick={props.onReset}>👋</Button>
    <Button onClick={props.onHideStyle}>👀</Button>
  </div>
);

ItemController.propTypes = {
  onIncrease: React.PropTypes.func,
  onDecrease: React.PropTypes.func,
  onReset: React.PropTypes.func,
  onHideStyle: React.PropTypes.func,
};

ItemController.defaultProps = {
  onIncrease: null,
  onDecrease: null,
  onReset: null,
  onHideStyle: null,
};

export default ItemController;
