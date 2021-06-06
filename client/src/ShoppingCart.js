import styled from 'styled-components';

export default function ShoppingCart({ shoppingCart }) {
  function getSum() {
    return shoppingCart.reduce((total, { price = 0 }) => +total + +price, 0);
  }

  return (
    <div>
      <CartWrapper>
        <NameWrapper>
          <h3>Player</h3>
          {shoppingCart.map((player) => (
            <p>{player.name}</p>
          ))}
          <h4>Sum</h4>
        </NameWrapper>
        <PriceWrapper>
          <h3>Price</h3>
          {shoppingCart.map((player) => (
            <p>{player.price} €</p>
          ))}
          <h4>{getSum()} €</h4>
        </PriceWrapper>
      </CartWrapper>
    </div>
  );
}

const CartWrapper = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 5rem;
  padding: 0.4rem;
  border-radius: 10px;
  background: hsl(160, 96%, 96%);
`;

const NameWrapper = styled.section``;

const PriceWrapper = styled.section`
  text-align: right;
`;
