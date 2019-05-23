import React from 'react';
import {Route, Switch} from 'react-router-dom';
import asyncComponent from './components/AsyncComponent';

const AsyncHome = asyncComponent(() => import('./components/Home'));
const AsyncNotFound = asyncComponent(() => import('./components/NotFound'));
const AsyncShader = asyncComponent(() => import('./components/ShadersFactory'));

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={AsyncHome} />
      <Route path="/:shaderId" exact component={AsyncShader} />
      { /* Finally, catch all unmatched routes */ }
      <Route component={AsyncNotFound} />
    </Switch>
  );
};

export default Routes;
