import {useQuery} from 'react-query';
import {type SortBy, type Game} from '../interfaces/Game';

const getGames = async (sortBy: SortBy): Promise<Game[]> => {
  return await fetch(
    `https://www.freetogame.com/api/games?sort-by=${sortBy}`,
  ).then(response => response.json());
};

export default function useGames(sortBy: SortBy) {
  return useQuery(['games', sortBy], () => getGames(sortBy));
}
