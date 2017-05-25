import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  ${props => props.gridContainerStyle}
`;

const GridContainer = props => (
  <Wrapper>
    <Container gridContainerStyle={props.gridContainerStyle}>
      {props.children}
    </Container>
  </Wrapper>
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
