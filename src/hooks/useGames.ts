import {useQuery} from 'react-query';
import {type Game} from '../interfaces/Game';

const getGames = async (): Promise<Game[]> => {
  return await fetch('https://www.freetogame.com/api/games').then(response =>
    response.json(),
  );
};

export default function useGames() {
  return useQuery('games', getGames);
}
