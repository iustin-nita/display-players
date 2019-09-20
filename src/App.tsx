import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import { Dimmer, Loader, Header, Item, Container } from 'semantic-ui-react';
import Player from './Player';
import CardExampleCard from './Card';
import './App.css';
import { State, Actions, PlayerType } from './types';
import { setFlag, sanitizeWeight, sanitizeLastGames } from './helpers';

export const API =
  'https://eurosportdigital.github.io/eurosport-web-developer-recruitment/headtohead.json';

export const dataFetchReducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'FETCH_INIT':
      console.log('FETCH_INIT', {
        ...state,
        isLoading: true,
        isError: false,
      });
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const initialData: State = {
  data: [],
  isError: false,
  isLoading: false,
};

export const App: React.FC = () => {
  const [{ data, isError, isLoading }, dispatch] = useReducer(
    dataFetchReducer,
    initialData
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      console.log('fetchinit');
      try {
        const result = await axios(API);
        console.log('result', result.data.players);
        setTimeout(() => {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data.players });
        }, 2000);
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR' });
      }
    };

    fetchData();
  }, []);

  const style = {
    h1: {
      margin: '3em 0',
    },
  };

  return (
    <div>
      <Header as="h1" content="Eurosport" style={style.h1} textAlign="center" />

      <Container>
        {isError && (
          <h1>Something went wrong ... Try to disable your ADBlock</h1>
        )}
        {isLoading ? (
          <Dimmer active>
            <Loader />
          </Dimmer>
        ) : (
          <Item.Group divided>
            {data.map((player: PlayerType) => {
              const lastGames = sanitizeLastGames(player.data.last);
              return <Player player={player} lastGames={lastGames} />;
            })}
          </Item.Group>
        )}
        <CardExampleCard />
      </Container>
    </div>
  );
};

export default App;
