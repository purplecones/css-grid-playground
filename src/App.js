import React from 'react';
import styled from 'styled-components';
import GridContainer from './GridContainer';
import GridItem from './GridItem';
import TextArea from './TextArea';
import ItemController from './ItemController';
import { isValidCss, checkCompatibility, isSafari, getAgent } from './utils';

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 2fr;
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
    ${isSafari() ? 'height: 25rem;' : null}
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
  ${isSafari() ? 'margin-bottom: 4rem;' : null}
`;

const defaultContainerStyle =
`display: grid;
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
  'grid-area: footer;'
];

const defaultGlobalItemStyle =
`background: lightsalmon;
border: 2px solid black;
`;

class App extends React.Component {
  static propTypes = {
    isCompatible: React.PropTypes.bool,
  };
  static defaultProps = {
    isCompatible: checkCompatibility(),
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
    numberOfGridItems: 5,
    autoHideItemStyle: false,
  }
  componentDidMount() {
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
    const agent = getAgent();
    const disclaimer = !this.props.isCompatible ?
      (
        <div style={{ margin: '10px' }}>
          <p>You are running on: {`${agent.family} ${agent.major}.${agent.minor} / ${agent.os.family} ${agent.os.major}.${agent.os.minor}`}</p>
          <p>CSS Grid Layout is still fairly new so your browser might not support it yet. For now, come back on the latest versions of Chrome, Firefox, Safari, and Opera. ☕️</p>
          <p>More support info at: <a href="http://caniuse.com/#feat=css-grid">http://caniuse.com/#feat=css-grid</a></p>
        </div>
      ) : /* eslint max-len: "off" */
      null;
    return (
      <Layout>
        <Controls>
          <ControlSection>
            <PanelHeading>
              <Header>Grid Container</Header>
            </PanelHeading>
            <TextArea
              value={this.state.gridContainerStyleText}
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
              value={this.state.globalItemStyleText}
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
        {disclaimer}
      </Layout>
    );
  }
}

export default App;
