import React from 'react';
import withRouter from 'react-router/withRouter';
import styled from 'styled-components';
import asyncComponent from './components/AsyncComponent';

const AsyncMenu = asyncComponent(() => import('./components/Menu'));

const AppContainer = styled.div`
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
`;

class App extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <AppContainer className='appContainer'>
        { children }
        <AsyncMenu />
      </AppContainer>
    );
  }
}

export default withRouter(App);
