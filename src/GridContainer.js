import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  ${props => props.gridContainerStyle}
`;

class GridContainer extends React.Component {
  render() {
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       autoHide: this.props.autoHideItemStyle,
       gridItemColor: this.props.gridItemColor
     })
    );
    return (
      <Container
        gridContainerStyle={this.props.gridContainerStyle}>
        {childrenWithProps}
      </Container>
    );
  }

}

export default GridContainer;
