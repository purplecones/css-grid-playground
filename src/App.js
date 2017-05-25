import React from 'react';
import styled from 'styled-components';
import GridContainer from './GridContainer';
import GridItem from './GridItem';
import TextArea from './TextArea';
import ItemController from './ItemController';

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  text-align: center;
  font-weight: 300;
  margin: 1em;
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: .5rem;
  @media (max-width: 600px) {
    height: 20rem;
    ${/* ${isSafari() ? 'height: 25rem;' : null} */ ''}
  }
  textarea {
    width: 100%;
    height: 100%;
    padding: .5rem;
    background: #efefef;
  }
`;

const ControlSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: .5rem;
  ${/* ${isSafari() ? 'margin-bottom: 4rem;' : null} */ ''}
`;

const defaultContainerStyle = `display: grid;
grid-gap: 1rem;
grid-template-columns: 1fr 5fr 2.5fr;
grid-template-rows: 1fr 5fr 1fr;
grid-template-areas:
"header header header"
"sidebar main aside"
"sidebar footer footer";`;

const defaultItemStyles = [
  'grid-area: header;',
  'grid-area: sidebar;',
  'grid-area: main;',
  'grid-area: aside;',
  'grid-area: footer;',
];

const defaultGlobalItemStyle = `background: lightsalmon;
border: 2px solid black;
`;
const GithubLogo = styled.div`
  display: flex;
  justify-content: center;
  padding: 1em;
`;

class App extends React.Component {
  state = {
    gridContainerStyle: defaultContainerStyle,
    globalItemStyle: defaultGlobalItemStyle,
    itemStyles: defaultItemStyles,
    numberOfGridItems: 5,
    autoHideItemStyle: false,
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ autoHideItemStyle: true });
    }, 2000);
  }
  updateGridContainerStyle = value => {
    this.setState({
      gridContainerStyle: value,
    });
  };
  updateGlobalItemStyles = value => {
    this.setState({
      globalItemStyle: value,
    });
  };
  updateItemStyle = (itemIndex, value) => {
    const itemStyles = [...this.state.itemStyles];
    itemStyles[itemIndex] = value;
    this.setState({
      itemStyles,
    });
  };
  resetStyles = () => this.setState({ itemStyles: [] });
  updateAutoItemHide = () =>
    this.setState({ autoHideItemStyle: !this.state.autoHideItemStyle });
  incrementGridItems = () =>
    this.setState({
      numberOfGridItems: this.state.numberOfGridItems + 1,
    });
  decrementGridItems = () =>
    this.setState({
      numberOfGridItems: this.state.numberOfGridItems - 1,
    });
  renderGridItems = () =>
    [...Array(this.state.numberOfGridItems)].map((_, i) => {
      const itemStyle = this.state.itemStyles[i]
        ? this.state.itemStyles[i]
        : '';
      return (
        <GridItem
          key={i} /* eslint react/no-array-index-key: "off" */
          itemNumber={i}
          itemStyle={itemStyle}
          autoHide={this.state.autoHideItemStyle}
          globalItemStyle={this.state.globalItemStyle}
          updateItemStyle={this.updateItemStyle}
        />
      );
    });

  render() {
    return (
      <Layout>
        <Title>CSS Grid Playground</Title>
        <Controls>
          <ControlSection>
            <PanelHeading>
              <Header>Grid Container</Header>
            </PanelHeading>
            <TextArea
              value={this.state.gridContainerStyle}
              onChange={this.updateGridContainerStyle}
            />
          </ControlSection>
          <ControlSection>
            <PanelHeading>
              <Header>Grid Items</Header>
              <ItemController
                onHideStyle={this.updateAutoItemHide}
                onReset={this.resetStyles}
                onDecrease={this.incrementGridItems}
                onIncrease={this.decrementGridItems}
              />
            </PanelHeading>
            <TextArea
              value={this.state.globalItemStyle}
              onChange={this.updateGlobalItemStyles}
            />
          </ControlSection>
        </Controls>
        <GridContainer
          autoHideItemStyle={this.state.autoHideItemStyle}
          gridItemColor={this.state.gridItemColor}
          gridContainerStyle={this.state.gridContainerStyle}
        >
          {this.renderGridItems()}
        </GridContainer>
        <GithubLogo>
          <a href="https://github.com/purplecones/css-grid-playground">
            <img
              src={`${process.env.PUBLIC_URL}/github.png`}
              alt="Github Logo"
            />
          </a>
        </GithubLogo>
      </Layout>
    );
  }
}

export default App;
