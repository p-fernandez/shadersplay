import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { color, textShadow } from './Styled';

const MenuWrapper = styled.div`
  box-sizing: border-box;
  background-color: gold;
  height: 2rem;
  position: fixed;
  bottom: 0;
  width: 100vw; 
  z-index: 1001;
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
  <MenuWrapper>
    <L to="/1">1</L>
  </MenuWrapper>
);

export default Menu;
