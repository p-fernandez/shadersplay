import React from 'react';
import styled from 'styled-components';
import { color, textShadow } from './Styled';

const Hero = styled.div`
  background: gold;
  color: ${color};
  font-size: 5rem;
  letter-spacing: -1rem;
  text-align: center;
  ${textShadow}
  user-select: none;
`;

const Home = () => (
  <Hero>SHADERS</Hero>
);

export default Home;
