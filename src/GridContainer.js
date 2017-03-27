import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  ${props => props.gridContainerStyle}
`;

const GridContainer = props => (
  <Container gridContainerStyle={props.gridContainerStyle}>
    {props.children}
  </Container>
);

GridContainer.propTypes = {
  gridContainerStyle: React.PropTypes.string,
  children: React.PropTypes.node,
};

GridContainer.defaultProps = {
  gridContainerStyle: '',
  children: null,
};

export default GridContainer;
