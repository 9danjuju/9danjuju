import { getPlayerNames } from '@/utils/client-action';
import { useQuery } from '@tanstack/react-query';

export const useGetPlayersNameQuery = () => {
  return useQuery({
    queryKey: ['playerName'],
    queryFn: getPlayerNames,
    staleTime: 1000 * 60 * 60 * 24 * 7
  });
};
