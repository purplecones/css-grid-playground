import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  ${props => props.gridContainerStyle}
`;

class GridContainer extends React.Component {
  render() {
    return (
      <Container
        gridContainerStyle={this.props.gridContainerStyle}>
        {this.props.children}
      </Container>
    );
  }

}

export default GridContainer;
