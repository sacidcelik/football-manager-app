const validateName = (name) => name.length >= 2 && name.includes(' ');
const validateEmail = (email) => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
const validatePrice = (price, isFree) =>
  (Number(price) > 0 && !isFree) || isFree;
const validatePosition = (position) => position !== '';
const validateClub = (club) => club !== '';
const validateSkills = (skills) => skills.length > 0;

export default function validatePlayer(player) {
  return (
    validateName(player.name) &&
    validateEmail(player.email) &&
    validatePrice(player.price, player.isFree) &&
    validatePosition(player.position) &&
    validateClub(player.club) &&
    validateSkills(player.skills)
  );
}

/* const validatePlayer = (player) =>
  validateName(player.name) &&
  validateEmail(player.email) &&
  validatePrice(player.price, player.isFree); */
