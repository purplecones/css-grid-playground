import React from 'react';
import styled from 'styled-components';
import GridContainer from './GridContainer';
import GridItem from './GridItem';
import TextArea from './TextArea';
import ItemController from './ItemController';
import { isValidCss, checkCompatibility } from './utils';

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
    margin: 0 5px 10px 5px;
    color: #fe8757;
    h1 {
      font-family: 'Gloria Hallelujah', cursive;
    }
    &:nth-child(1) {
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

const defaultContainerStyle =
`display: grid;
grid-template-columns: 2fr 5fr 2fr;
grid-gap: 1rem;`;

const defaultItemStyles = [
  'grid-row: span 8;',
  'grid-column: 2 / 4;',
  'grid-row: span 9;',
  'grid-row: span 9;',
  'height: 100px;',
  '',
];

const defaultGlobalItemStyle =
'background: lightsalmon;';

class App extends React.Component {
  static propTypes = {
    isCompatible: React.PropTypes.bool,
  };
  static defaultProps = {
    isCompatible: false,
  }
  state = {
    // for textarea
    gridContainerStyleText: defaultContainerStyle, // might have invalid CSS
    globalItemStyleText: defaultGlobalItemStyle, // might have invalid CSS
    itemStylesText: defaultItemStyles, // might have invalid CSS
    // for valid styles
    gridContainerStyle: defaultContainerStyle, // should have valid CSS
    globalItemStyle: defaultGlobalItemStyle, // should have valid CSS
    itemStyles: defaultItemStyles, // should have valid CSS
    numberOfGridItems: 6,
    autoHideItemStyle: false,
  }
  componentDidMount() {
    if (this.props.isCompatible || checkCompatibility()) {
      this.setState({ isCompatible: true }); /* eslint react/no-did-mount-set-state: "off" */
    }
    setTimeout(() => {
      this.setState({ autoHideItemStyle: true });
    }, 2000);
  }
  updateGridContainerStyle = (value) => {
    if (isValidCss(value)) {
      this.setState({ gridContainerStyle: value, gridContainerStyleText: value });
    } else {
      this.setState({
        gridContainerStyleText: value,
      });
    }
  }
  updateGlobalItemStyles = (value) => {
    if (isValidCss(value)) {
      this.setState({ globalItemStyle: value, globalItemStyleText: value });
    } else {
      this.setState({ globalItemStyleText: value });
    }
  }
  updateItemStyle = (itemIndex, value) => {
    const itemStylesText = [...this.state.itemStylesText];
    const itemStyles = [...this.state.itemStyles];
    itemStylesText[itemIndex] = value;
    itemStyles[itemIndex] = isValidCss(value) ? value : itemStyles[itemIndex];
    this.setState({
      itemStylesText,
      itemStyles,
    });
  }
  resetStyles = () => this.setState({ itemStylesText: [], itemStyles: [] })
  updateAutoItemHide = () => this.setState({ autoHideItemStyle: !this.state.autoHideItemStyle })
  incrementGridItems = () => this.setState({
    numberOfGridItems: this.state.numberOfGridItems + 1,
  })
  decrementGridItems = () => this.setState({
    numberOfGridItems: this.state.numberOfGridItems - 1,
  })
  renderGridItems = () => [...Array(this.state.numberOfGridItems)].map((_, i) => {
    const itemStyleText = this.state.itemStylesText[i] ? this.state.itemStylesText[i] : '';
    const itemStyle = this.state.itemStyles[i] ? this.state.itemStyles[i] : '';
    return (
      <GridItem
        key={i}  /* eslint react/no-array-index-key: "off" */
        itemNumber={i}
        itemStyleText={itemStyleText}
        itemStyle={itemStyle}
        autoHide={this.state.autoHideItemStyle}
        globalItemStyle={this.state.globalItemStyle}
        updateItemStyle={this.updateItemStyle}
      />
    );
  })

  render() {
    if (!this.state.isCompatible) {
      return (
        <div style={{ margin: '10px' }}>
          <p>CSS Grid Layout is still fairly new so it is not supported by your browser yet. For now, come back on the latest versions of Chrome, Firefox, Safari, and Opera. ☕️</p>
          <p>More support info at: <a href="http://caniuse.com/#feat=css-grid">http://caniuse.com/#feat=css-grid</a></p>
          <p>Meanwhile, here is a gif...</p>
          <img
            style={{ width: '100vw' }}
            src={'/mobile-demo.gif'}
            alt="Demo GIF"
          />
        </div>
      ); /* eslint max-len: "off" */
    }
    return (
      <MainContainer>
        <nav>
          <Menu>
            <div className="menu-item">
              <Title>CSS Grid Playground</Title>
            </div>
            <div className="menu-item">
              <a className="github-button" href="https://github.com/purplecones/css-grid-playground" data-style="mega" aria-label="Star purplecones/css-grid-playground on GitHub">Star</a>
            </div>
          </Menu>
        </nav>
        <Controls>
          <div>
            <PanelHeading>
              <Header>Grid Container</Header>
            </PanelHeading>
            <TextArea
              value={this.state.gridContainerStyleText}
              onChange={this.updateGridContainerStyle}
            />
          </div>
          <div>
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
              value={this.state.globalItemStyleText}
              onChange={this.updateGlobalItemStyles}
            />
          </div>
        </Controls>
        <GridContainer
          autoHideItemStyle={this.state.autoHideItemStyle}
          gridItemColor={this.state.gridItemColor}
          gridContainerStyle={this.state.gridContainerStyle}
        >
          {this.renderGridItems()}
        </GridContainer>
      </MainContainer>
    );
  }
}

export default App;
