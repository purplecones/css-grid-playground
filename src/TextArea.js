import React from 'react';
import styled from 'styled-components';

const TextAreaField = styled.textarea`
  border: 0px solid black;
  padding: 0;
  outline: none;
  background: none;
  resize: none;
  height: 100%;
  width: 100%;
  font-family: Monaco, monospace;
  @media (max-width: 600px) {
    font-size: .75rem;
  }
  ${(props) => props.styling}
`;

class TextArea extends React.Component {
  defaultProps = {
    type: 'text',
  }
  handleChange = (e) => this.props.onChange(e.target.value)
  render() {
    return (
      <TextAreaField
        styling={this.props.styling}
        value={this.props.value}
        type={this.props.type}
        onChange={this.handleChange}
      />
    );
  }

}

export default TextArea;
