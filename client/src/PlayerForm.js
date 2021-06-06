import { useEffect, useState } from 'react';
import styled from 'styled-components';
import TagCreator from './TagCreator';
import validatePlayer from './lib/validation';

export default function PlayerForm({
  onAddPlayer,
  onUpdateAndSavePlayer,
  playerToEdit,
}) {
  const initialPlayer = {
    name: '',
    price: '',
    isFree: false,
    club: '',
    position: '',
    email: '',
    skills: [],
  };

  const [player, setPlayer] = useState(initialPlayer);
  const [clubs, setClubs] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/clubs')
      .then((result) => result.json())
      .then((clubsFromApi) => setClubs(clubsFromApi))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (playerToEdit) {
      setPlayer(playerToEdit);
    }
  }, [playerToEdit]);

  function updatePlayer(event) {
    const fieldName = event.target.name;
    let fieldValue = event.target.value;

    if (event.target.type === 'checkbox') {
      fieldValue = event.target.checked;
    }
    setPlayer({ ...player, [fieldName]: fieldValue });
  }

  function updateSkills(newSkill) {
    setPlayer({ ...player, skills: [...player.skills, newSkill] });
  }

  function removeSkill(remainingSkills) {
    setPlayer({ ...player, skills: remainingSkills });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (validatePlayer(player)) {
      playerToEdit ? onUpdateAndSavePlayer(player) : onAddPlayer(player);
      setPlayer(initialPlayer);
      setIsError(false);
    } else {
      setIsError(true);
    }
  }

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        {isError && <ErrorBox>There is an error with your data</ErrorBox>}
        <h2>{playerToEdit ? 'Update' : 'Add new'} player</h2>
        <label htmlFor="name">Player Name</label>
        <InputNamePriceMail
          type="text"
          name="name"
          onChange={updatePlayer}
          value={player.name}
        />
        <label htmlFor="price">Player Fee (€)</label>
        <InputNamePriceMail
          type="number"
          name="price"
          onChange={updatePlayer}
          value={player.price}
          disabled={player.isFree}
        />
        <label>
          <InputCheck
            type="checkbox"
            name="isFree"
            onChange={updatePlayer}
            value={player.isFree}
            disabled={player.price !== ''}
            checked={player.isFree}
          />
          Player is free of charge
        </label>
        <label htmlFor="club">Club</label>
        <select
          name="club"
          id="club"
          onChange={updatePlayer}
          value={player.club}
        >
          <option value="">---Select current club---</option>
          {clubs.length > 0 &&
            clubs.map((club) => (
              <option key={club._id} value={club.name}>
                {club.name}
              </option>
            ))}
        </select>
        <fieldset>
          <legend>Position</legend>
          <label>
            <InputCheck
              type="radio"
              name="position"
              value="attack"
              onChange={updatePlayer}
              checked={player.position === 'attack'}
            />
            Attack
          </label>
          <label>
            <InputCheck
              type="radio"
              name="position"
              value="midfield"
              onChange={updatePlayer}
              checked={player.position === 'midfield'}
            />
            Midfield
          </label>
          <label>
            <InputCheck
              type="radio"
              name="position"
              value="defense"
              onChange={updatePlayer}
              checked={player.position === 'defense'}
            />
            Defense
          </label>
          <label>
            <InputCheck
              type="radio"
              name="position"
              value="goalkeeper"
              onChange={updatePlayer}
              checked={player.position === 'goalkeeper'}
            />
            Goalkeeper
          </label>
        </fieldset>
        <TagCreator
          tagType="Skills"
          tags={player.skills}
          onUpdateTags={updateSkills}
          onRemoveTag={removeSkill}
        />
        <label htmlFor="email">Manager's email</label>
        <InputNamePriceMail
          type="email"
          name="email"
          onChange={updatePlayer}
          value={player.email}
        />
        <Button isPrimary>{playerToEdit ? 'Update' : 'Add new'} player</Button>
        <Button onClick={() => setPlayer(initialPlayer)} type="reset">
          Cancel
        </Button>
      </Form>
    </>
  );
}

const Form = styled.form`
  display: grid;
  gap: 1rem;
  width: 450px;
  max-width: 450px;
  max-height: 720px;
  flex-wrap: nowrap;

  input:disabled {
    background: lightgrey;
  }

  label[for],
  legend {
    font-weight: bold;
  }

  fieldset {
    border: none;
    padding-left: 0;
    display: flex;
    justify-content: space-between;
  }

  fieldset > label {
    padding-right: 0.5rem;
  }
  select {
    font-size: 1.25rem;
  }
`;

const Button = styled.button`
  font-size: 1.7rem;
  background: ${(props) =>
    props.isPrimary ? 'hsl(160, 60%, 50%)' : 'hsl(160, 96%, 96%)'};
  border: none;
  border-radius: 5px;
  padding: 1rem;
`;

const InputNamePriceMail = styled.input`
  height: 40px;
  font-size: 1.25rem;
  border: 1px solid lightblue;
  border-radius: 5px;
`;

const InputCheck = styled.input`
  transform: scale(1.5);
  margin-right: 0.5rem;
`;

const ErrorBox = styled.div`
  background-color: red;
  border-radius: 10px;
  padding: 1rem;
  color: white;
`;
