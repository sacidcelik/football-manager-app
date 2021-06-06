import styled from 'styled-components/macro';
import AddtoCartIcon from './images/add.png';
import AddtoCartIconChecked from './images/shopping-bag.png';

import getClub from './lib/clubs';
import getPosition from './lib/positions';

export default function PlayerCard({
  player,
  onAddToCart,
  shoppingCartContent,
  onDeletePlayer,
  onEditPlayer,
}) {
  return (
    <Card>
      <h3>{player.name}</h3>
      <p>Fee: {Number(player.price).toLocaleString()} €</p>
      <p>Club: {getClub(player.club)}</p>
      <p>Position: {getPosition(player.position)}</p>
      <p>
        Skills:
        {player.skills.map((skill, index) => {
          if (index < player.skills.length - 1) {
            return <span> {skill}, </span>;
          }
          return <span> {skill} </span>;
        })}
      </p>
      <p>
        <a href={`mailto:${player.email}`}>{player.email}</a>
      </p>
      <button onClick={() => onEditPlayer(player)}>Edit player</button>
      <button onClick={() => onDeletePlayer(player)}>Delete Player</button>

      <AddToCart
        role="img"
        aria-label="Add to Cart"
        onClick={() => onAddToCart(player)}
        isAdded={shoppingCartContent.some((item) => item.name === player.name)}
      ></AddToCart>
    </Card>
  );
}

export const Card = styled.article`
  background: hsl(160, 60%, 50%);
  border-radius: 0.4rem;
  color: hsl(160, 96%, 96%);
  padding: 1.2rem 1rem;
  height: 12rem;
  min-width: calc((100% - 2rem) / 3);
  position: relative;

  h3 {
    margin-top: 0;
  }

  p {
    margin: 0.3rem 0;
  }

  a {
    color: hsl(160, 10%, 20%);
  }
`;

const AddToCart = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  right: 5%;
  top: 5%;
  background-image: ${(props) =>
    props.isAdded ? `url(${AddtoCartIconChecked})` : `url(${AddtoCartIcon})`};
  background-size: contain;
  background-repeat: no-repeat;

  :hover {
    background-image: url(${AddtoCartIconChecked});
  }
`;
