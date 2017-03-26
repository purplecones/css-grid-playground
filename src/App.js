import React from 'react';
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

const PanelHeading = styled.div`
  display: flex;
  align-items: baseline;
  height: 30px;
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
    margin: 0 5px 0 5px;
    color: #fe8757;
    h1 {
      font-family: 'Gloria Hallelujah', cursive;
    }
    &:nth-child(2) {
      margin-right: auto;
    }
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const gridContainerStyle =
`display: grid;
grid-template-columns: 2fr 5fr 2fr;
grid-gap: 1rem;`;

const defaultItemStyles = [
`grid-row: span 8;`,
`grid-column: 2 / 4;`,
`grid-row: span 9;`,
`grid-row: span 9;`,
'height: 100px;',
'',
`grid-column: span 3;
width: 300px;
height: 100px;
justify-self: center;`
];

const Logo = styled.a`
  > img {
    height: 40px;
  }
  @media (max-width: 600px) {
    > img {
      height: 25px;
    }
  }
`;

const globalItemStyle =
`background: lightsalmon;`;

class Interactive extends React.Component {
  state = {
    globalItemStyle,
    gridContainerStyle,
    itemStyles: defaultItemStyles,
    numberOfGridItems: 7,
    autoHideItemStyle: true,
  }
  updateAutoItemHide = () => this.setState({ autoHideItemStyle: !this.state.autoHideItemStyle })
  updateGridContainerStyle = value => this.setState({ gridContainerStyle: value })
  updateGlobalItemStyles = value => this.setState({ globalItemStyle: value })
  updateItemStyle = (itemIndex, value) => {
    const itemStyles = [...this.state.itemStyles];
    itemStyles[itemIndex] = value;
    this.setState({
      itemStyles,
    });
  }
  resetStyles = () => this.setState({ itemStyles: [] })
  incrementGridItems = value => this.setState({ numberOfGridItems: this.state.numberOfGridItems + value })
  renderGridItems = () => [...Array(this.state.numberOfGridItems)].map((_, key) => {
    const itemStyle = this.state.itemStyles[key] ? this.state.itemStyles[key] : '';
    return <GridItem
      key={key}
      index={key}
      itemStyle={itemStyle}
      autoHide= {this.state.autoHideItemStyle}
      globalItemStyle={this.state.globalItemStyle}
      updateItemStyle={this.updateItemStyle} />;
  })
  render() {
    return (
      <MainContainer>
        <nav>
          <Menu>
            <div className="menu-item">
              <Logo href="https://www.cssgridplayground.com">
                <img src={process.env.PUBLIC_URL+'/swing.svg'}
                alt="CSS Grid Playground Logo"/>
              </Logo>
            </div>
            <div className="menu-item">
              <Title>CSS Grid Playground</Title>
            </div>
            <div className="menu-item">
              <a target="_blank" href="https://github.com/purplecones/css-grid-playground">
                <img src={process.env.PUBLIC_URL+'/github.png'} alt="Github Logo"/>
              </a>
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
                onReset={this.resetStyles}
                onDecrease={this.incrementGridItems.bind(this, -1)}
                onIncrease={this.incrementGridItems.bind(this, 1)}/>
            </PanelHeading>
            <TextArea
              value={this.state.globalItemStyle}
              onChange={this.updateGlobalItemStyles}/>
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
