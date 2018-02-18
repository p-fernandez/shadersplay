import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
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
