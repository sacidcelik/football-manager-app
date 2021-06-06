import { Card } from './PlayerCard';
import getClub from './lib/clubs';
import getPosition from './lib/positions';

export default function ShoppingCart({ shoppingCart }) {
  return shoppingCart.map((player) => {
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
      </Card>
    );
  });
}
