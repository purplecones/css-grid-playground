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
  font-weight: 300;
  margin: 0;
  @media (max-width: 550px) {
    font-size: 1rem;
    font-weight: 400;
  };
`;
const PanelHeading = styled.div`
  display: flex;
  align-items: baseline;
  height: 30px;
`;
const Header = styled.h3`
  text-align: center;
  font-size: .80rem;
  margin: 0;
  @media (max-width: 550px) {
    font-size: 1rem;
    font-weight: 300;
  };
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ControlSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: .5rem;
  height: 200px;
  flex: 1;
  min-width: 300px;
  > textarea {
    border: 1px solid #999999;
    &:focus {
      border-color: #6e6e6e;
      box-shadow: 0 0 20px 0px #e6e6e6;
    }
  }
`;

const Top = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
`;

const SocialButtons = styled.div`
  display: flex;
  > * {
    margin: 0 5px;
  }
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
  updateGridContainerStyle = value =>
    this.setState({
      gridContainerStyle: value,
    });
  updateGlobalItemStyles = value =>
    this.setState({
      globalItemStyle: value,
    });
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
  incrementGridItems = () => {
    const newItemStyles = [...this.state.itemStyles];
    newItemStyles.push('');
    this.setState({
      numberOfGridItems: this.state.numberOfGridItems + 1,
      itemStyles: newItemStyles,
    });
  }
  decrementGridItems = () => {
    const newItemStyles = [...this.state.itemStyles];
    newItemStyles.pop();
    this.setState({
      numberOfGridItems: this.state.numberOfGridItems > 0 ? this.state.numberOfGridItems - 1 : 0,
      itemStyles: newItemStyles,
    });
  }
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
        <Top>
          <Title>CSS Grid Playground</Title>
          <SocialButtons>
            <a
              className="twitter-share-button"
              href="https://twitter.com/intent/tweet"
            >
              Tweet
            </a>
            <a
              className="github-button"
              href="https://github.com/purplecones/css-grid-playground"
              data-show-count="true"
              aria-label="Star purplecones/css-grid-playground on GitHub"
            >
              Star
            </a>
          </SocialButtons>
        </Top>
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
        <GridContainer gridContainerStyle={this.state.gridContainerStyle}>
          {this.renderGridItems()}
        </GridContainer>
      </Layout>
    );
  }
}

export default App;
