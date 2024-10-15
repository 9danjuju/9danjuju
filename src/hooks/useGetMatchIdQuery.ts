import { getMatchId } from '@/utils/client-action';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetMatchIdQueryInfiniteQuery = (nickname: string, matchType: number) => {
  return useInfiniteQuery({
    queryKey: ['matchid', nickname, matchType],
    queryFn: ({ pageParam = 0 }) => getMatchId(nickname as string, matchType, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 2) {
        return allPages.length * 2;
      } else {
        return undefined;
      }
    }
  });
};
