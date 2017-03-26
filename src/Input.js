import React from 'react';
import styled from 'styled-components';

const InputField = styled.input`
  border: 1px solid lightgray;
  text-align: center;
  align-items: center;
  width: 30px;
  margin-left: 30px;
`;

class Input extends React.Component {
  defaultProps = {
    type: 'text',
  }
  handleChange = (e) => this.props.onChange(e.target.value)
  render() {
    return (
      <InputField
        value={this.props.value}
        type={this.props.type}
        onChange={this.handleChange}
      />
    );
  }

}

export default Input;
