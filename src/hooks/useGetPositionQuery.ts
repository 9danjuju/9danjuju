import { getPlayerPosition } from '@/utils/client-action';
import { useQuery } from '@tanstack/react-query';

export const useGetPositionQuery = () => {
  return useQuery({
    queryKey: ['position'],
    queryFn: getPlayerPosition,
    staleTime: 1000 * 60 * 60 * 24 * 7
  });
};
