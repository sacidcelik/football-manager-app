export default function getPosition(position) {
  const positionNames = {
    attack: 'Attacker',
    midfield: 'Midfielder',
    defense: 'Defender',
    goalkeeper: 'Goalkeeper',
  };

  return positionNames[position];
}
