import React from 'react';
import randomColor from 'randomcolor';
import styled from 'styled-components';
import Input from './Input';
import GridContainer from './GridContainer';
import GridItem from './GridItem';
import TextArea from './TextArea';
import ItemController from './ItemController';

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const PanelHeading = styled.h3`
  display: flex;
  align-items: baseline;
`;
const Header = styled.h3`
  text-align: center;
  font-size: .80rem
  @media (max-width: 600px) {
    font-size: .70rem;
  }
  margin: 0;
`;

const Controls = styled.div`
  height: 15rem;
  background: white;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: .5rem;
  @media (max-width: 600px) {
    height: 20rem;
  }
  > div {
    margin: .5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  textarea {
    width: 100%;
    height: 100%;
    padding: .5rem;
    background: #efefef;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .5rem;
  > .menu-item {
    &:nth-child(1) {
      margin-right: auto;
    }
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;

class Interactive extends React.Component {
  getRandomColor = () => randomColor()
  state = {
    gridContainerStyle: `display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-gap: 1rem;`,
    defaultGridItemStyles: '',
    numberOfGridItems: 9,
    autoHideItemStyle: true,
    gridItemColor: '#f2598c', //this.getRandomColor(),
  }
  updateAutoItemHide = () => this.setState({ autoHideItemStyle: !this.state.autoHideItemStyle })
  updateColor = () => this.setState({ gridItemColor: this.getRandomColor() })
  updateGridContainerStyle = value => this.setState({ gridContainerStyle: value})
  updateDefaultItemStyle = value => this.setState({ defaultGridItemStyle: value})
  incrementGridItems = value => this.setState({ numberOfGridItems: this.state.numberOfGridItems + value})
  renderGridItems = () => [...Array(this.state.numberOfGridItems)].map((i, key) => <GridItem defaultItemStyle={this.state.defaultGridItemStyle} key={key} />)
  render() {
    return (
      <MainContainer>
        <nav>
          <Menu>
            <div className="menu-item"><Title>CSS Grid Playground</Title></div>
            <div className="menu-item">
              <a className="github-button" href="https://github.com/purplecones/css-grid-playground" data-icon="octicon-star" data-style="mega" data-count-href="/purplecones/css-grid-playground/stargazers" data-count-api="/repos/purplecones/css-grid-playground#stargazers_count" data-count-aria-label="# stargazers on GitHub" aria-label="Star purplecones/css-grid-playground on GitHub">Star</a>
            </div>
          </Menu>
        </nav>
        <Controls>
          <div>
            <PanelHeading>
              <Header>Grid Container</Header>
            </PanelHeading>
            <TextArea
              value={this.state.gridContainerStyle}
              onChange={this.updateGridContainerStyle}/>
          </div>
          <div>
            <PanelHeading>
              <Header>Grid Items</Header>
              <ItemController
                onHideStyle={this.updateAutoItemHide}
                onDecrease={this.incrementGridItems.bind(this, -1)}
                onIncrease={this.incrementGridItems.bind(this, 1)}/>
            </PanelHeading>
            <TextArea
              value={this.state.defaultGridItemStyle}
              onChange={this.updateDefaultItemStyle}/>
          </div>
        </Controls>
        <GridContainer
          autoHideItemStyle={this.state.autoHideItemStyle}
          gridItemColor={this.state.gridItemColor}
          gridContainerStyle={this.state.gridContainerStyle}>
            {this.renderGridItems()}
        </GridContainer>
      </MainContainer>
    );
  }

}

const times = x => f => {
  if (x > 0) {
    f()
    times (x - 1) (f)
  }
}

export default Interactive;
