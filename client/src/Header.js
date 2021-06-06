import styled from 'styled-components/macro';
import AddtoCartIcon from './images/add.png';
import AddtoCartIconChecked from './images/shopping-bag.png';
import { NavLink } from 'react-router-dom';

export default function Header({ numberOfItems }) {
  return (
    <HeaderWrapper>
      <NavLinkStyled exact to="/">
        <h1>German Football Transfer Market</h1>
      </NavLinkStyled>
      <Nav>
        <NavLinkPlayers to="/players">
          <NavHeader>Playerbase</NavHeader>
        </NavLinkPlayers>
        <NavLinkCart to="/shoppingcart">
          <ShoppingCartIcon
            isFull={numberOfItems > 0}
            role="img"
            aria-label="Shopping Cart"
          >
            Items in Cart: ({numberOfItems})
          </ShoppingCartIcon>
        </NavLinkCart>
      </Nav>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  h1 {
    text-align: center;
  }
`;

const ShoppingCartIcon = styled.div`
  justify-self: flex-end;
  width: 150px;
  height: 150px;
  background-image: ${(props) =>
    props.isFull ? `url(${AddtoCartIconChecked})` : `url(${AddtoCartIcon})`};
  background-repeat: no-repeat;
  background-size: contain;
  display: inline-block;
  grid-row: 1;
`;

const Nav = styled.nav`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
`;

const NavHeader = styled.h2`
  justify-self: right;
  grid-row: 1;
  display: inline;
`;

const NavLinkStyled = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;

const NavLinkPlayers = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  justify-self: left;
`;

const NavLinkCart = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  justify-self: right;
`;
