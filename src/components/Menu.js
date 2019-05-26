import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { color, textShadow } from './Styled';

const CommonWrapper = styled.div`
  box-sizing: border-box;
  height: 2rem;
  position: fixed;
  width: 100vw; 
  z-index: 1001;
`;

const HookWrapper = styled(CommonWrapper)`
  background-color: gold;
  bottom: 2rem;
`;

const MenuWrapper = styled(CommonWrapper)`
  background-color: gold;
  bottom: 0;
  opacity: 0.75;
`;

const L = styled(Link)`
  color: white;
  font-size: 1.6rem;
  font-weight: bold;
  height: 100%;
  margin: auto 0;
  padding: 0.3rem;
  text-decoration: none;
  transition: color 0.6s linear;
  user-select: none;
  &:hover {
    color: ${color};
    ${textShadow}
    transition: color 0.6s linear,
      text-shadow 1s ease-in;
  }
`;

const Menu = () => (
  <>
    <HookWrapper>
      <L to="/3">3</L>
    </HookWrapper>
    <MenuWrapper>
      <L to="/1">1</L>
      <L to="/2">2</L>
    </MenuWrapper>
  </>
);

export default Menu;
