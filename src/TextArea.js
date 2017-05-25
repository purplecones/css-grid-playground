import React from 'react';
import styled from 'styled-components';

const TextAreaField = styled.textarea`
  border: 0px solid black;
  padding: .5em;
  outline: none;
  background: #efefef;
  border-radius: 0;
  resize: none;
  height: 100%;
  width: 100%;
  font-family: Monaco, monospace;
  box-sizing: border-box;
  transition: all 200ms ease-in-out;
  @media (max-width: 800px) {
    font-size: .75rem;
  }
  ${props => props.styling}
`;

class TextArea extends React.Component {
  static propTypes = {
    styling: React.PropTypes.string,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
  };
  static defaultProps = {
    styling: '',
    value: '',
    onChange: null,
  }
  handleChange = e => this.props.onChange(e.target.value)
  render() {
    return (
      <TextAreaField
        styling={this.props.styling}
        value={this.props.value}
        onChange={this.handleChange}
      />
    );
  }
}

export default TextArea;
