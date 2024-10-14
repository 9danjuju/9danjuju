import { getMatchId } from '@/utils/client-action';
import { useQuery } from '@tanstack/react-query';

export const useGetMatchIdQuery = (nickname: string, matchType: number) => {
  return useQuery({
    queryKey: ['matchid', nickname],
    queryFn: () => getMatchId(nickname, matchType)
  });
};
