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
  ${props => props.styling}
`;

class TextArea extends React.Component {
  static propTypes = {
    styling: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    onChange: React.PropTypes.func,
  };
  static defaultProps = {
    styling: '',
    defaultValue: '',
    onChange: null,
  }
  handleChange = e => this.props.onChange(e.target.value)
  render() {
    return (
      <TextAreaField
        styling={this.props.styling}
        defaultValue={this.props.defaultValue}
        onChange={this.handleChange}
      />
    );
  }
}

export default TextArea;
