import React from 'react';
import asyncComponent from './AsyncComponent';

const ShadersFactory = ({ match }) => {
  const { shaderId } = match.params;
  const Shader = asyncComponent(() => import(`../shaders/${shaderId}`));
  return (
    <Shader />
  );
};

export default ShadersFactory;
