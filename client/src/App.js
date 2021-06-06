import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PlayerCard from './PlayerCard';
import PlayerForm from './PlayerForm';

import { saveToLocal, loadFromLocal } from './lib/localStorage';
import Header from './Header';
import { Route, Switch } from 'react-router-dom';
import ShoppingCart from './ShoppingCart';

function App() {
  const [players, setPlayers] = useState(loadFromLocal('players') ?? []);
  const [playerToEdit, setPlayerToEdit] = useState(null);
  const [shoppingCart, setShoppingCart] = useState(
    loadFromLocal('shoppingCart') ?? []
  );
  function addPlayer(player) {
    fetch('http://localhost:4000/players', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(player),
    })
      .then((result) => result.json())
      .then((savedPlayer) => setPlayers([...players, savedPlayer]))
      .catch((error) => console.error(error));
  }

  function addToShoppingCart(playerToAdd) {
    setShoppingCart([...shoppingCart, playerToAdd]);
  }

  console.log(shoppingCart);

  useEffect(() => {
    fetch('http://localhost:4000/players')
      .then((result) => result.json())
      .then((playerApi) => setPlayers(playerApi))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    saveToLocal('players', players);
  }, [players]);

  useEffect(() => {
    saveToLocal('shoppingCart', shoppingCart);
  }, [shoppingCart]);

  function editPlayer(player) {
    setPlayerToEdit(player);
  }

  function updateAndSavePlayer(playerToUpdate) {
    const upToDatePlayers = players.filter(
      (player) => player._id !== playerToUpdate._id
    );
    fetch('http://localhost:4000/players/' + playerToUpdate._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerToUpdate),
    })
      .then((result) => result.json())
      .then((updatedPlayer) => {
        setPlayers([...upToDatePlayers, updatedPlayer]);
        setPlayerToEdit(null);
      })
      .catch((error) => console.error(error));
  }

  function deletePlayer(player) {
    fetch('http://localhost:4000/players/' + player._id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/JSON' },
    })
      .then((result) => result.json())
      .then((response) => {
        if (response.data && response.data._id) {
          const playersToKeep = players.filter(
            (player) => player._id !== response.data._id
          );
          setPlayers(playersToKeep);
        } else {
          console.log('Player could not be deleted');
        }
      });
  }

  return (
    <div>
      <Header numberOfItems={shoppingCart.length} />
      <Switch>
        <Route exact path="/">
          <Grid>
            <PlayerForm
              onAddPlayer={addPlayer}
              playerToEdit={playerToEdit}
              onUpdateAndSavePlayer={updateAndSavePlayer}
            />
            <Players>
              {players.map((player, index) => {
                return (
                  <PlayerCard
                    player={player}
                    key={index}
                    onAddToCart={addToShoppingCart}
                    shoppingCartContent={shoppingCart}
                    onEditPlayer={editPlayer}
                    onDeletePlayer={deletePlayer}
                  />
                );
              })}
            </Players>
          </Grid>
        </Route>
        <Route path="/players">
          <Grid>
            <Players>
              {players.map((player, index) => {
                return (
                  <PlayerCard
                    player={player}
                    key={index}
                    onAddToCart={addToShoppingCart}
                    shoppingCartContent={shoppingCart}
                  />
                );
              })}
            </Players>
          </Grid>
        </Route>

        <Route path="/shoppingcart">
          <Grid>
            <ShoppingCart shoppingCart={shoppingCart} />
          </Grid>
        </Route>
      </Switch>
    </div>
  );
}

export default App;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 576px) {
    grid-template-columns: 1fr 2fr;
  }
`;

const Players = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
